import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Correct package for solid icons
import "styles/views/Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About</h2>
          <p>Lisungui is a project aimed at bringing the best user experience.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/helpcenter">Help Center</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Info</h2>
          <p>Email: info@lisungui.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="social-icons">
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="mailto:info@lisungui.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
        <div className="footer-section newsletter">
          <h2>Newsletter Signup</h2>
          <p>Subscribe to our newsletter to stay updated with our latest news and offers.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email Address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Lisungui. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

