import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginCom = ({
    handleSubmit,
    apiError,
    user,
    handleChange,
    error,
    loading,
    showPassword,
    setShowPassword
}) => {
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Login</h2>

            {apiError && <span className="error">{apiError}</span>}

            <div className="form-group">
                <input
                    className="input"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
                <span className="error">{error.email}</span>
            </div>

            <div className="form-group">
                <div className="password-box">
                    <input
                        className="input"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <span className="error">{error.password}</span>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
                <Link to="/auth/forgot-password">
                    Forgot Password?
                </Link>
            </div>

            <button className="btn" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>

            <p>
                Don't have an account?{" "}
                <Link to="/auth/register">
                    Register
                </Link>
            </p>
        </form>
    )
}