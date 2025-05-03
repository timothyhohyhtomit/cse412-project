import React, { useState } from "react";

function HomePage({ user }) {
    // states
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    return (
        <div>
            <h1 id="home-title">ASU Pay</h1>
            <h2>Welcome, {user ? user.name : "guest"}!</h2>
            <div class="home-buttons">
                { !user || <button class="home-button">Sign In</button> }
                { user || <button class="home-button">Payment</button> }
                { user || <button class="home-button">Sign Out</button> }
            </div>
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
                    <input id="home-signin-password" type="password" maxLength="30" required value={inputPassword} onChange={(e) => setInputPassword(e.currentTarget.value)} />
                    <br />
                    {/* Submit Button */}
                    <input id="home-signin-submit" type="submit" value="Sign In" />
                </form>
            </div>
        </div>
    );
}

export default HomePage;
