import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../../../../customHooks/authhooks/auth.resetPassword";
import "./ResetPassword.css";

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });

    const { loading, resetPassword } = useResetPassword();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("ID:", id);
        console.log("TOKEN:", token);

        const success = await resetPassword(
            id,
            token,
            formData.password,
            formData.confirm_password
        );

        if (success) {
            setFormData({
                password: "",
                confirm_password: "",
            });

            setTimeout(() => {
                navigate("/auth/login");
            }, 1500);
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <div className="reset-icon">
                    <FaLock />
                </div>

                <h2>Reset Password</h2>

                <p className="subtitle">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={
                                formData.confirm_password
                            }
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Updating..."
                            : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;