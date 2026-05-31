import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "./style.css";
import { useForgotPassword } from "../../../../customHooks/authhooks/auth.forget";



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const { loading, sendResetLink } = useForgotPassword();

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value.trim()) {
            return "Email is required";
        }

        if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
        }

        return "";
    };

    const handleChange = (e) => {
        const value = e.target.value;

        setEmail(value);
        setError(validateEmail(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateEmail(email);

        if (validationError) {
            setError(validationError);
            return;
        }

        const success = await sendResetLink(email);

        if (success) {
            setEmail("");
            setError("");
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <div className="icon-box">
                    <FaEnvelope />
                </div>

                <h2>Forgot Password?</h2>

                <p className="subtitle">
                    Enter your email address and we'll send
                    you a password reset link.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                        />

                        {error && (
                            <span className="error-text">
                                {error}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;