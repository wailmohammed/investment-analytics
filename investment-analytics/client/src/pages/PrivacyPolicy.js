// src/pages/PrivacyPolicy.js
import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="container" role="main">
      <h1>Privacy Policy</h1>
      <p>Last updated: [Date]</p>
      <p>
        This Privacy Policy describes how Investment Analytics ("we", "us",
        or "our") collects, uses, and shares your personal information when
        you use our website [Your Website URL] (the "Service").
      </p>
      <h2>Information We Collect</h2>
      <p>
        We collect information you provide directly to us, such as when you
        create an account, update your profile, use interactive features, or
        contact us for support. This may include your name, email address, and
        financial information related to your investments.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        We use the information we collect to provide, maintain, and improve our
        services, to develop new features, and to protect us and our users.
      </p>
      <h2>Sharing of Information</h2>
      <p>
        We do not share your personal information with third parties except as
        described in this policy.
      </p>
      <h2>Security</h2>
      <p>
        We take reasonable measures to help protect your personal information
        from loss, theft, misuse, unauthorized access, disclosure, alteration,
        and destruction.
      </p>
      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at [Your Contact Email].
      </p>
    </div>
  );
}

export default PrivacyPolicy;

// src/pages/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <div className="container" role="main">
      <section className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </div>
  );
}

export default Signup;

// src/pages/TermsOfService.js
import React from 'react';

function TermsOfService() {
  return (
    <div className="container" role="main">
      <h1>Terms of Service</h1>
      <p>Last updated: [Date]</p>
      <p>
        Please read these Terms of Service ("Terms", "Terms of Service")
        carefully before using [Your Website URL] (the "Service") operated
        by Investment Analytics ("us", "we", or "our").
      </p>
      <h2>1. Terms</h2>
      <p>
        By accessing the Service, you agree to be bound by these Terms. If you
        disagree with any part of the terms, then you may not access the
        Service.
      </p>
      <h2>2. Use of Service</h2>
      <p>
        Our Service allows you to track and analyze your investments. You are
        responsible for maintaining the confidentiality of your account and
        password and for restricting access to your account.
      </p>
      {/* Add the rest of the terms sections here */}
      <h2>10. Changes</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. By continuing to access or use our Service after
        those revisions become effective, you agree to be bound by the revised
        terms.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at [Your
        Contact Email].
      </p>
    </div>
  );
}

export default TermsOfService;