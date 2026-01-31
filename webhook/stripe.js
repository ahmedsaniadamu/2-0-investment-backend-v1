import bodyParser from 'body-parser';
import stripe from '../config/stripe.js';
import { db } from "../models/index.js";
import { sendMail } from "../services/authService.js";
import {
    transactionPendingEmailTemplate,
    transactionFailedEmailTemplate,
    transactionCanceledEmailTemplate
} from "../templates/transaction-status-template.js";

const { Investment, Transaction, Investors, Profile, sequelize } = db;

export const stripeWebhook = (app) => {
    app.post(
        '/api/v1/stripe/webhook',
        bodyParser.raw({ type: 'application/json' }),
        async (req, res) => {
            const sig = req.headers['stripe-signature'];
            let event;

            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    process.env.STRIPE_WEBHOOK_SECRET
                );
            } catch (err) {
                console.error('Webhook signature verification failed:', err.message);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }

            try {
                const stripeObject = event.data.object;
                const metadata = stripeObject.metadata || {};
                const {
                    investorId,
                    planId,
                    paymentMethod,
                    startDate,
                    investmentGoal,
                    agreement,
                    amount
                } = metadata;
                const transactionId = stripeObject.id;

                switch (event.type) {
                    case 'payment_intent.succeeded': {
                        await sequelize.transaction(async (t) => {
                            const existingTransaction = await Transaction.findOne({
                                where: { transactionId },
                                transaction: t,
                                lock: t.LOCK.UPDATE
                            });



                            if (existingTransaction) {
                                console.log(`🔁 Duplicate webhook ignored: ${transactionId}`);
                                return;
                            }

                            const investor = await Investors.findByPk(investorId, { transaction: t });
                            if (!investor) {
                                console.error('Investor not found:', investorId);
                                throw new Error('Investor not found');
                            }

                            const investment = await Investment.create({
                                investorId,
                                planId,
                                amount,
                                paymentMethod,
                                startDate,
                                investmentGoal,
                                agreement,
                                status: 'pending'
                            }, { transaction: t });

                            await Transaction.create({
                                transactionId,
                                type: 'deposit',
                                status: 'pending',
                                transactionStatus: 'succeeded',
                                amount,
                                investorId,
                                investmentId: investment.id,
                                planId,
                                paymentMethod,
                                startDate,
                                investmentGoal
                            }, { transaction: t });
                            // Send success email
                            await sendMail({
                                fields: {
                                    name: investor.name || '',
                                    transactionId: transactionId,
                                    email: investor.email
                                },
                                subject: "Transaction Successful (2ZeroInvestment)",
                                template: transactionPendingEmailTemplate
                            });
                        });
                        break;
                    }
                    case 'payment_intent.payment_failed': {
                        const investor = await Investors.findByPk(investorId);
                        const reason = stripeObject.last_payment_error?.message || 'Payment failed';
                        if (investor) {
                            await sendMail({
                                fields: {
                                    name: investor.name || '',
                                    transactionId: transactionId,
                                    email: investor.email,
                                    reason
                                },
                                subject: "Transaction Failed (2ZeroInvestment)",
                                template: transactionFailedEmailTemplate
                            });
                        }
                        break;
                    }
                    case 'payment_intent.canceled': {
                        const investor = await Investors.findByPk(investorId);
                        if (investor) {
                            await sendMail({
                                fields: {
                                    name: investor.name || '',
                                    transactionId: transactionId,
                                    email: investor.email
                                },
                                subject: "Transaction Canceled (2ZeroInvestment)",
                                template: transactionCanceledEmailTemplate
                            });
                        }
                        break;
                    }
                    default:
                        console.log(`Unhandled event type: ${event.type}`);
                }

                return res.json({ received: true });

            } catch (error) {
                console.error('Webhook processing error:', error);
                if (error.message === 'Investor not found') {
                    return res.status(404).send(error.message);
                }
                return res.status(500).send('Webhook handler failed');
            }
        }
    );
};

