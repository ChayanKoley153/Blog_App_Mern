import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const CheckPrivateRouting = ({ children }) => {
    const token = getCookie("accesstoken");

    useEffect(() => {
        if (!token) {
            toast.error("Please Login First");
        }
    }, [token]);

    if (token) {
        return children;
    }

    return (
        <>
            <Navigate to="/auth/login" />;
        </>
    )
};

export default CheckPrivateRouting;