import React from "react";
import "../../styles/views/About.scss";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Lisungui</h1>
      <p>
        Welcome to Lisungui! We are dedicated to connecting talented freelancers with clients who need their expertise. Our platform offers a wide range of services from web development and graphic design to writing and more.
      </p>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a seamless and efficient platform where freelancers can find meaningful work and clients can easily hire the best talent. We aim to foster a community where quality, reliability, and creativity thrive.
        </p>
      </section>
      <section className="values-section">
        <h2>Core Values</h2>
        <ul>
          <li><strong>Quality:</strong> We strive to maintain high standards in all our services and ensure client satisfaction.</li>
          <li><strong>Reliability:</strong> Trust is the cornerstone of our platform. We ensure that all transactions are secure and that freelancers deliver on their promises.</li>
          <li><strong>Creativity:</strong> We celebrate the unique skills and innovative ideas that our freelancers bring to the table.</li>
          <li><strong>Community:</strong> Building a supportive and inclusive community is at the heart of what we do.</li>
        </ul>
      </section>
      <section className="benefits-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Secure and Reliable Transactions</li>
          <li>Access to Top-Tier Freelancers</li>
          <li>Wide Range of Services</li>
          <li>Seamless Communication Tools</li>
          <li>24/7 Support</li>
        </ul>
      </section>
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>
          If you have any questions or need support, feel free to <a href="/contact">contact us</a>. We are here to help you make the most of our platform.
        </p>
      </section>
    </div>
  );
};

export default About;