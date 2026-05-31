import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../api/axios";
import endpoints from "../../api/endpoints";



export const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const sendResetLink = async (email) => {
        if (!email.trim()) {
            toast.error("Email is required");
            return false;
        }

        try {
            setLoading(true);

            const payload = {
                email,
            };

            const res = await axiosInstance.post(
                endpoints.auth.forget_password,
                payload
            );

            toast.success(
                res.data.message || "Reset link sent successfully"
            );

            return true;
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to send reset link"
            );

            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        sendResetLink,
    };
};