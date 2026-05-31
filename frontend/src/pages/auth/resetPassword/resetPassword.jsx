import React, { useState } from "react";
import {
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../../../../customHooks/authhooks/auth.resetPassword";
import "./style.css";

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({
        password: "",
        confirm_password: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const { loading, resetPassword } =
        useResetPassword();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        let error = "";

        if (name === "password") {
            if (!value.trim()) {
                error = "Password is required";
            } else if (value.length < 6) {
                error =
                    "Password must be at least 6 characters";
            }
        }

        if (name === "confirm_password") {
            if (!value.trim()) {
                error =
                    "Confirm Password is required";
            } else if (
                formData.password &&
                value !== formData.password
            ) {
                error = "Passwords do not match";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.password.trim()) {
            newErrors.password =
                "Password is required";
        } else if (
            formData.password.length < 6
        ) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (
            !formData.confirm_password.trim()
        ) {
            newErrors.confirm_password =
                "Confirm Password is required";
        } else if (
            formData.password !==
            formData.confirm_password
        ) {
            newErrors.confirm_password =
                "Passwords do not match";
        }

        setErrors(newErrors);

        if (
            Object.keys(newErrors).length > 0
        ) {
            return;
        }

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

            navigate("/auth/login");
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
                        <div className="password-wrapper">
                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="New Password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <span
                                className="toggle-password"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>

                        {errors.password && (
                            <span className="error-text">
                                {
                                    errors.password
                                }
                            </span>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="password-wrapper">
                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirm_password"
                                placeholder="Confirm Password"
                                value={
                                    formData.confirm_password
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            <span
                                className="toggle-password"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </span>
                        </div>

                        {errors.confirm_password && (
                            <span className="error-text">
                                {
                                    errors.confirm_password
                                }
                            </span>
                        )}
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