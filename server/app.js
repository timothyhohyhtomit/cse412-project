import express from "express";
import cors from "cors";
import authRouter from "./routes/auth/authRouter.js";
//import paymentRouter from "./routes/payment/paymentRouter.js";

const app = express();
const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
    next();
});

// global error handling
app.use((err, req, res, next) => {
    res.status(500).send("An unexpected error occurreed: " + err.message);
});

// routers
app.use("/auth", authRouter);
//app.use("/payment", paymentRouter);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
