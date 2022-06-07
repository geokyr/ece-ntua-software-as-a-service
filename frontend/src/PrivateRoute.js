import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Firebase/firebaseAuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
    // const history = useNavigate()
    return currentUser ? children : <Navigate to="/" />;
}
