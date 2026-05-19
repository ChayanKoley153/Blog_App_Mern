import React from "react";
import "./footer.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className="footer-logo">BlogApp</h2>
                    <p className="footer-text">
                        Your trusted platform for quality products and amazing deals.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/product/list">Blogs</a></li>
                        <li><a href="/about">About User</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: support@myblog.com</p>
                    <p>Phone: +91 8336820450</p>
                    <p>Kolkata, India</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 BlogApp. All Rights Reserved.</p>
            </div>
        </footer>
    );
};