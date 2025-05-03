import React from "react";
import { Outlet } from "react-router-dom";

function Root() {
    return (
        <div className="root">
            <h1 className="root-title">
                ASUPay Payment System
            </h1>
            <div className="root-outlet">
                <Outlet />
            </div>
        </div>
    );
}

export default Root;