import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "./ForgotPassword.css";
import { useForgotPassword } from "../../../../customHooks/authhooks/auth.password";



const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const { loading, sendResetLink } = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await sendResetLink(email);

        if (success) {
            setEmail("");
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
                    Enter your email address and we'll send you a password reset link.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;