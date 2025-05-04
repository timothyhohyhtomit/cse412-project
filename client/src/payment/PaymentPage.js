import React, { useState } from "react";
import { SERVER_URL } from "../config";

function PaymentPage() {
    // states
    const [payeeEmail, setPayeeEmail] = useState("");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    // handlers
    const handlePayment = (e) => {
        e.preventDefault();
        alert("payeeEmail: " + payeeEmail + "\namount: " + amount);
        // clear message
        setMessage("");
        // check if amount is positive
        if (amount <= 0) {
            setMessage("Payment amount must be positive.");
            return;
        }
        // send payment request
        fetch(SERVER_URL + "/payment/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("user_id")
            },
            body: JSON.stringify({
                payerId: localStorage.getItem("user_id"),
                payeeEmail: payeeEmail,
                amount: amount
            })
        }).then((response) => response.json())
        .then((jsonData) => {
            if (jsonData.error) {
                setMessage(jsonData.error);
            } else if (jsonData.payerBalance) {
                setMessage("Payment successful! Your new balance is: " + jsonData.payerBalance);
                // update user balance in local storage
                localStorage.setItem("user_balance", jsonData.payerBalance);
            }
        });
    };
    return (
        <div>
            <h2>Payment</h2>
            <div className="payment-form">
                <form id="payment-form" className="payment-form" onSubmit={handlePayment}>
                    {/* Payee Email */}
                    <label htmlFor="payment-email">Payee Email: </label>
                    <br />
                    <input id="payment-email" type="email" maxLength="50" required value={payeeEmail} onChange={(e) => setPayeeEmail(e.currentTarget.value)} />
                    <br />
                    {/* Amount */}
                    <label htmlFor="payment-amount">Amount: </label>
                    <br />
                    <input id="payment-amount" type="number" min="0" required value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
                    <br />
                    {/* Submit Button */}
                    <input id="payment-submit" type="submit" value="Pay" />
                    <br />
                    {/* Back to Home Page Button */}
                    <button id="payment-back" onClick={() => window.location.href = "/"}>Back to Home</button>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PaymentPage;
