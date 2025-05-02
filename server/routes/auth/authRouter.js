import express from "express";

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
    // currently, hardcoded user data
    const users = [
        {
            name: "User1",
            email: "user1@gmail.com",
            password: "user1",
            balance: 1000
        },
        {
            name: "User2",
            email: "user2@gmail.com",
            password: "user2",
            balance: 1000
        },
        {
            name: "User3",
            email: "user3@gmail.com",
            password: "user3",
            balance: 1000
        }
    ];
    // find user
    for (const user of users) {
        if (user.email == email && user.password == password) {
            // login success, send name and balance
            return res.status(200).json({
                name: user.name,
                balance: user.balance
            });
        }
    }
    // login failed, send error message
    return res.status(401).json({ message: "Invalid credentials" });
});

export default authRouter;
