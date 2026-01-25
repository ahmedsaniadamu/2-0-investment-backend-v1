import bodyParser from 'body-parser';
import stripe from '../config/stripe.js';
import { db } from "../models/index.js";
import { sendMail } from "../services/authService.js";
import { transactionPendingEmailTemplate, transactionFailedEmailTemplate, transactionCanceledEmailTemplate } from "../templates/transaction-status-template.js";
import { parseError } from "../helpers/parseError.js";

const { Investment, Transaction, Investors } = db;

export const stripeWebhook = (app) => {
    app.post(
        '/api/v1/stripe/webhook',
        bodyParser.raw({ type: 'application/json' }),
        async (req, res, next) => {
            const sig = req.headers['stripe-signature'];
            let event;
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    process.env.STRIPE_WEBHOOK_SECRET
                );
            } catch (err) {
                console.error('Webhook verification failed:', err.message, { err: process.env.STRIPE_WEBHOOK_SECRET });
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }
            try {
                switch (event.type) {
                    case 'payment_intent.succeeded': {
                        const paymentIntent = event.data.object;
                        const { investorId, type, planId, paymentMethod, startDate, investmentGoal, agreement, amount } = paymentIntent.metadata;
                        console.log({ transactionId: paymentIntent.id, investorId, type, planId, paymentMethod, startDate, investmentGoal, agreement, message: 'payment_intent.succeeded' });
                        try {
                            const newInvestment = await Investment.create({
                                planId,
                                investorId,
                                amount,
                                paymentMethod,
                                startDate,
                                investmentGoal,
                                agreement,
                            });
                            const investor = await Investors.findOne({ where: { id: investorId } });
                            if (!investor) return parseError(404, 'Investor not found', next);
                            const transaction = await Transaction.create({
                                type: 'deposit',
                                investmentGoal,
                                amount,
                                paymentMethod,
                                startDate,
                                status: 'pending',
                                transactionStatus: 'succeeded',
                                transactionId: paymentIntent.id,
                                investmentId: newInvestment?.id,
                                investorId,
                                planId,
                            });
                            await sendMail({
                                fields: {
                                    name: investor?.dataValues?.name || '',
                                    transactionId: paymentIntent.id, email: investor.email
                                },
                                subject: "Transaction Review Status  (2ZeroInvestment)",
                                template: transactionPendingEmailTemplate
                            });

                        } catch (error) {
                            return next(error);
                        }
                        break;
                    }
                    case 'payment_intent.payment_failed': {
                        const paymentIntent = event.data.object;
                        const { investorId, planId, paymentMethod, startDate, investmentGoal, agreement, amount } = paymentIntent.metadata;
                        const reason = paymentIntent.last_payment_error?.message || 'The payment was declined.';

                        try {
                            const newInvestment = await Investment.create({
                                planId,
                                investorId,
                                amount,
                                paymentMethod,
                                startDate,
                                investmentGoal,
                                agreement,
                                status: 'cancelled'
                            });

                            const investor = await Investors.findOne({ where: { id: investorId } });
                            if (investor) {
                                const transaction = await Transaction.create({
                                    type: 'deposit',
                                    investmentGoal,
                                    amount,
                                    paymentMethod,
                                    startDate,
                                    status: 'rejected',
                                    transactionStatus: 'failed',
                                    transactionId: paymentIntent.id,
                                    investmentId: newInvestment?.id,
                                    investorId,
                                    planId,
                                    reason: reason
                                });

                                await sendMail({
                                    fields: {
                                        name: investor?.dataValues?.name || '',
                                        transactionId: paymentIntent.id,
                                        email: investor.email,
                                        reason: reason,
                                        amount: amount,
                                        paymentMethod: paymentMethod,
                                        date: new Date().toLocaleDateString(),
                                        supportLink: process.env.SUPPORT_LINK || '#'
                                    },
                                    subject: "Transaction Failed (2ZeroInvestment)",
                                    template: transactionFailedEmailTemplate
                                });
                            }
                        } catch (error) {
                            console.error('Error handling failed payment:', error);
                        }
                        break;
                    }
                    case 'payment_intent.canceled': {
                        const paymentIntent = event.data.object;
                        const { investorId, planId, paymentMethod, startDate, investmentGoal, agreement, amount } = paymentIntent.metadata;

                        try {
                            const newInvestment = await Investment.create({
                                planId,
                                investorId,
                                amount,
                                paymentMethod,
                                startDate,
                                investmentGoal,
                                agreement,
                                status: 'cancelled'
                            });

                            const investor = await Investors.findOne({ where: { id: investorId } });
                            if (investor) {
                                await Transaction.create({
                                    type: 'deposit',
                                    investmentGoal,
                                    amount,
                                    paymentMethod,
                                    startDate,
                                    status: 'rejected',
                                    transactionStatus: 'canceled',
                                    transactionId: paymentIntent.id,
                                    investmentId: newInvestment?.id,
                                    investorId,
                                    planId,
                                });

                                await sendMail({
                                    fields: {
                                        name: investor?.dataValues?.name || '',
                                        transactionId: paymentIntent.id,
                                        email: investor.email,
                                        amount: amount,
                                        paymentMethod: paymentMethod,
                                        date: new Date().toLocaleDateString(),
                                        supportLink: process.env.SUPPORT_LINK || '#'
                                    },
                                    subject: "Transaction Canceled (2ZeroInvestment)",
                                    template: transactionCanceledEmailTemplate
                                });
                            }
                        } catch (error) {
                            console.error('Error handling canceled payment:', error);
                        }
                        break;
                    }
                    default:
                        console.log(`Unhandled event type ${event.type}`);
                }

                if (!res.headersSent) {
                    return res.json({ received: true });
                }
            } catch (error) {
                console.error('Webhook processing error:', error);
                if (!res.headersSent) {
                    return res.status(500).send('Webhook handler failed');
                }
            }
        }
    );
}