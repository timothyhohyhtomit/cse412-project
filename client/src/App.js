import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Root from "./root/Root.js";
import HomePage from "./home/HomePage.js";
import PaymentPage from "./payment/PaymentPage.js";

function App() {
    // states
    const [user, setUser] = useState(null);
    // react router
    
    const appRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={
                <HomePage user={user} setUser={setUser} />
            } />
            <Route path="pay" element={
                <PaymentPage user={user} />
            } />
        </Route>
    ));
    
    /*
    const appRouter = createBrowserRouter(createRoutesFromElements(
        <Routes path="/">
            <Route index element={
                <HomePage user={user} setUser={setUser} />
            } />
            <Route path="pay" element={
                <PaymentPage user={user} />
            } />
        </Routes>
    ));
    */
    return (
        <RouterProvider router={appRouter} />
    );
}

export default App;
