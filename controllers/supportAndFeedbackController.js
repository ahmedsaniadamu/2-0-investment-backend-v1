import { paginate } from "../helpers/pagination.js";
import { parseError } from "../helpers/parseError.js";
import { db } from "../models/index.js";
import { sendMail } from "../services/authService.js";
import { contactEmailTemplate } from "../templates/contact-template.js";
const { Feedback, Investors } = db;

export const createFeedback = async (req, res, next) => {
    try {
        const { investorId, rating, comment } = req.body;
        if (!investorId || !rating) {
            return parseError(400, "Investor ID and rating are required.", next);
        }
        // Check if investor exists
        const investor = await Investors.findByPk(investorId);
        if (!investor) {
            return parseError(404, "Investor not found.", next);
        }
        const feedback = await Feedback.create({
            investorId,
            rating,
            comment
        });
        return res.status(201).json({
            message: "Feedback submitted successfully.",
            feedback
        });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return parseError(500, "Internal server error.", next);
    }
};

export const getInvestorFeedbacks = async (req, res, next) => {
    try {
        const { investorId } = req.params;
        const feedbacks = await paginate(Feedback, req, {
            where: { investorId },
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return parseError(500, "Internal server error.", next);
    }
};

export const getAllFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await paginate(Feedback, req, {
            include: [
                {
                    model: Investors,
                    as: 'investor',
                    attributes: ['id', 'name', 'email'],
                    searchable: ['name', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching all feedbacks:", error);
        return parseError(500, "Internal server error.", next);
    }
};

export const getLandingPageFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: Investors,
                    as: 'investor',
                    attributes: ['id', 'name'],
                }
            ],
            order: [['rating', 'DESC']],
            limit: 10
        });
        const uniqueFeedbacks = [];
        const seenInvestors = new Set();
        for (const feedback of feedbacks) {
            if (!seenInvestors.has(feedback.investorId)) {
                uniqueFeedbacks.push(feedback);
                seenInvestors.add(feedback.investorId);
            }
            if (uniqueFeedbacks.length === 10) break;
        }
        return res.status(200).json(uniqueFeedbacks);
    } catch (error) {
        console.error("Error fetching landing page feedbacks:", error);
        return parseError(500, "Internal server error.", next);
    }
};

export const getFeedbackSummary = async (req, res, next) => {
    try {
        const [totalFeedbacks, averageRating] = await Promise.all([
            Feedback.count(),
            Feedback.aggregate('rating', 'AVG', {
                plain: true,
                col: 'rating'
            })
        ]);
        return res.status(200).json({
            totalFeedbacks,
            averageRating,
        });
    } catch (error) {
        console.error("Error fetching feedback summary:", error);
        return parseError(500, "Internal server error.", next);
    }
};

export const deleteFeedback = async (req, res, next) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return parseError(404, "Feedback not found.", next);
        }
        await feedback.destroy();
        return res.status(200).json({
            message: "Feedback deleted successfully.",
            feedback
        });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        return parseError(500, "Internal server error.", next);
    }
};


export const sendContactEmail = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return parseError(400, "All fields (name, email, subject, message) are required.", next);
        }

        await sendMail({
            email: process.env.SUPPORT_EMAIL,
            subject: `Contact Support: ${subject}`,
            template: contactEmailTemplate,
            fields: {
                name,
                email,
                subject,
                message,
                supportEmail: process.env.SUPPORT_EMAIL
            }
        });

        return res.status(200).json({
            message: `Your message has been sent successfully to our support team.
               we will get back to you as soon as possible.
            `
        });
    } catch (error) {
        console.error("Error sending contact email:", error);
        return parseError(500, "Failed to send contact email. Please try again later.", next);
    }
};
