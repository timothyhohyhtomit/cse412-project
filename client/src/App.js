import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";

function App() {
    // react router
    const appRouter = createBrowserRouter(createRoutesFromElements(
        <Route path="/">
            <Route index element={
                <HomePage />
            } />
            <Route path="pay" element={
                <PaymentPage />
            } />
        </Route>
    ));
    return (
        <RouterProvider router={appRouter} />
    );
}

export default App;
