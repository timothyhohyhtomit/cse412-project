import express from "express";

import { users } from "../../users.js";

const paymentRouter = express.Router();

paymentRouter.use(express.json());

// API endpoints

// pay requests
paymentRouter.post("/pay", async (req, res) => {
    // extract payer id, payee id and amount
    const { payerId, payeeId, amount } = req.body;
    // check if payer and payee exist
    if (!users[payerId]) {
        return res.status(404).json({ message: "Payer not found" });
    }
    if (!users[payeeId]) {
        return res.status(404).json({ message: "Payee not found" });
    }
    // payment amount must be positive
    if (amount <= 0) {
        return res.status(400).json({ message: "Payment amount must be positive" });
    }
    // try to initiate payment
    const paymentSuccess = users[payerId].changeBalance(-amount);
    // check if payment was successful
    if (!paymentSuccess) {
        return res.status(400).json({ message: "Insufficient funds" });
    }
    // payment was successful, update payee balance
    users[payeeId].changeBalance(amount);
    // send success message
    return res.status(200).json({ message: "Payment successful" });
});
