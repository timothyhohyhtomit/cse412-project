import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";

function App() {
    // states
    const [user, setUser] = useState(null);
    // react router
    const appRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="/">
            <Route index element={
                <HomePage user={user} />
            } />
            <Route path="pay" element={
                <PaymentPage user={user} />
            } />
        </Route>
    ));
    return (
        <RouterProvider router={appRouter} />
    );
}

export default App;
