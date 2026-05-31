import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../api/axios";
import endpoints from "../../api/endpoints.js";




export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);

    const resetPassword = async (
        id,
        token,
        password,
        confirm_password
    ) => {
        if (!password || !confirm_password) {
            toast.error("All fields are required");
            return false;
        }

        if (password !== confirm_password) {
            toast.error("Passwords do not match");
            return false;
        }

        console.log("resetPassword called");

        try {
            setLoading(true);

            const payload = {
                password,
                confirm_password,
            };

            const res = await axiosInstance.post(
                endpoints.auth.reset_password(id, token),
                payload
            );

            toast.success(
                res.data.message ||
                "Password reset successful"
            );

            return true;
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to reset password"
            );

            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        resetPassword,
    };
};