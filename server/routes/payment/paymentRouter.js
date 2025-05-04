import express from "express";

import { users } from "../../users.js";

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
    // check if payer and payee exist
    if (!users[payerId]) {
        return res.status(404).json({ error: "Payer not found" });
    }
    // find payee by email
    const payeeId = Object.keys(users).find((userId) => users[userId].email === payeeEmail);
    if (payeeId === undefined) {
        return res.status(404).json({ error: "Payee not found" });
    }
    // check if payer and payee are the same
    if (payerId === payeeId) {
        return res.status(400).json({ error: "Payer and payee cannot be the same" });
    }
    // payment amount must be positive
    if (amountNum <= 0) {
        return res.status(400).json({ error: "Payment amount must be positive" });
    }
    // try to initiate payment
    const paymentSuccess = users[payerId].changeBalance(-amountNum);
    // check if payment was successful
    if (!paymentSuccess) {
        return res.status(400).json({ error: "Insufficient funds" });
    }
    // payment was successful, update payee balance
    users[payeeId].changeBalance(amountNum);
    // send success message
    return res.status(200).json({ payerBalance: users[payerId].balance });
});

export default paymentRouter;
