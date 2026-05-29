import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUserCircle,
    FaBars,
    FaTimes,
    FaHome,
    FaInfoCircle,
    FaEnvelope,
    FaSignOutAlt,
} from "react-icons/fa";

import "./header.css";
import Cookies from "js-cookie";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();


    const handleLogout = () => {
        Cookies.remove("accesstoken");
        navigate('/auth/login')
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to="/product/list">BlogApp</Link>
            </div>

            <nav className={`nav ${menuOpen ? "active" : ""}`}>
                <Link to="/product/list">
                    <FaHome /> Home
                </Link>

                <Link to="/about">
                    <FaInfoCircle /> About Us
                </Link>

                <Link to="/contact">
                    <FaEnvelope /> Contact
                </Link>
            </nav>

            <div className="right-section">
                <div className="profile-container">
                    <FaUserCircle
                        className="profile-icon"
                        onClick={() => setProfileOpen(!profileOpen)}
                    />

                    {profileOpen && (
                        <div className="profile-dropdown">
                            <Link to="/profile">Profile</Link>
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;