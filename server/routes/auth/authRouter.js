import express from "express";

import { users } from "../../users.js";

//import { sendQuery } from "../../db/conn.js";

const authRouter = express.Router();

authRouter.use(express.json());

// API endpoints

// sign in
authRouter.post("/signin", async (req, res) => {
    // extract email and password
    const { email, password } = req.body;
    /*
    // postgres query
    const query = `
        SELECT * FROM users
        WHERE email = '${email}' AND password = '${password}'
    `;
    // get user data
    const userData = await sendQuery(query);
    // check if user exists
    if (userData.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    */
    // currently, hardcoded user data imported from users.js
    // find user
    for (const userId of Object.keys(users)) {
        if (users[userId].email == email && users[userId].password == password) {
            // login success, send name and balance
            return res.status(200).json({
                id: userId,
                name: users[userId].name,
                balance: users[userId].balance
            });
        }
    }
    // login failed, send error message
    return res.status(401).json({ message: "Invalid credentials" });
});

export default authRouter;
