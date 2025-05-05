import express from "express";

import { sendQuery } from "../../db/conn.js";

const authRouter = express.Router();

authRouter.use(express.json());

// API endpoints

// sign in
authRouter.post("/signin", async (req, res) => {
    // extract email and password
    const { email, password } = req.body;
    // postgres query
    const query = `
        SELECT id, name, balance
        FROM users
        WHERE email = '${email}' AND password = '${password}'
    `;
    // get user data
    const userData = await sendQuery(query);
    // check if user exists
    if (userData.length === 0 || userData[0].id === null) {
        // user not found, send error message
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // return user id
    return res.status(200).json(userData[0]);
});

export default authRouter;
