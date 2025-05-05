import express from "express";

import { sendQuery } from "../../db/conn.js";

const paymentRouter = express.Router();

paymentRouter.use(express.json());

// API endpoints

// pay requests
paymentRouter.post("/pay", async (req, res) => {
    // extract payer id, payee email and amount
    const { payerId, payeeEmail, amount } = req.body;
    // convert amount to number
    const amountNum = parseFloat(amount);
    // check if amount is a number
    if (isNaN(amountNum)) {
        return res.status(400).json({ error: "Invalid amount" });
    }
    // payment amount must be positive
    if (amountNum <= 0) {
        return res.status(400).json({ error: "Payment amount must be positive" });
    }
    // try to initiate payment
    const query = `
        SELECT transfer(${payerId}, '${payeeEmail}', amount := ${amountNum}) AS new_balance;
    `;
    const result = await sendQuery(query);
    // check if payment was successful
    if (result.length === 0 || !result[0]?.new_balance) {
        // payment failed, send error message
        return res.status(400).json({ error: "Payment failed" });
    }
    // payment was successful, send success message
    return res.status(200).json({ new_balance: result[0].new_balance });
});

export default paymentRouter;
