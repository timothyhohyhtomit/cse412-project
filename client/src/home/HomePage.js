import React, { useState } from "react";

import { SERVER_URL } from "../config.js";

function HomePage() {
    // states
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showSignIn, setShowSignIn] = useState(false);
    const [signInMessage, setSignInMessage] = useState("");
    // handlers
    const handleSignIn = (e) => {
        e.preventDefault();
        // clear sign in message
        setSignInMessage("");
        // check if email and password are correct
        if (!inputEmail?.length || !inputEmail.trim()?.length || !inputPassword?.length || !inputPassword.trim()?.length) {
            setSignInMessage("Email and password cannot be empty.");
            return;
        }
        // send sign in request
        fetch(SERVER_URL + "/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: inputEmail,
                password: inputPassword
            })
        }).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Invalid credentials");
            }
        }).catch((error) => {
            setSignInMessage(error.message);
        }).then((data) => {
            if (data) {
                // store user data to local storage
                localStorage.setItem("user_id", data.id);
                localStorage.setItem("user_name", data.name);
                localStorage.setItem("user_balance", data.balance);
                window.location.reload();
            }
        });
    };
    const handleSignOut = (e) => {
        e.preventDefault();
        // clear user data from local storage
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_balance");
        window.location.reload();
    };
    return (
        <div>
            <h2>Welcome, {localStorage.getItem("user_name") || "guest"}!</h2>
            <div class="home-buttons">
                { !localStorage.getItem("user_name") && <button class="home-button" onClick={(e) => setShowSignIn(true)}>Sign In</button> }
                { localStorage.getItem("user_name") && <a href="/pay"><button class="home-button">Payment</button></a> }
                { localStorage.getItem("user_name") && <button class="home-button" onClick={handleSignOut}>Sign Out</button> }
            </div>
            { showSignIn && (
            <div class="home-signin">
                <form id="home-signin-form" className="home-signin-form" onSubmit={handleSignIn}>
                    {/* Email */}
                    <label htmlFor="home-signin-email">Email: </label>
                    <br />
                    <input id="home-signin-email" type="text" maxLength="50" required value={inputEmail} onChange={(e) => setInputEmail(e.currentTarget.value)} />
                    <br />
                    {/* Password */}
                    <label htmlFor="home-signin-password">Password: </label>
                    <br />
                    <input id="home-signin-password" type="text" maxLength="30" required value={inputPassword} onChange={(e) => setInputPassword(e.currentTarget.value)} />
                    <br />
                    {/* Submit Button */}
                    <input id="home-signin-submit" type="submit" value="Sign In" />
                </form>
                <div className="home-signin-message">{signInMessage}</div>
            </div>
            )}
        </div>
    );
}

export default HomePage;
