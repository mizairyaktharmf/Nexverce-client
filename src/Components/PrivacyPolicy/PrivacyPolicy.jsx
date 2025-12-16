import React from 'react';
import './PrivacyPolicy.css';
import Footer from '../Footer/Footer';

function PrivacyPolicy() {
  return (
    <>
      <div className="privacy-policy-page">
        <div className="privacy-policy-container">
          <h1 className="privacy-policy-title">Privacy Policy</h1>
          <p className="privacy-policy-updated">Last Updated: December 16, 2025</p>

          <div className="privacy-policy-content">
            <section className="privacy-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Nexverce ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.nexverce.com" target="_blank" rel="noopener noreferrer">www.nexverce.com</a> and use our services.
              </p>
              <p>
                By accessing or using Nexverce, you agree to the terms outlined in this Privacy Policy. If you do not agree with our practices, please do not use our services.
              </p>
            </section>

            <section className="privacy-section">
              <h2>2. Information We Collect</h2>

              <h3>2.1 Personal Information</h3>
              <p>We may collect the following personal information when you:</p>
              <ul>
                <li><strong>Register an account:</strong> Name, email address, username, and password</li>
                <li><strong>Subscribe to newsletters:</strong> Email address</li>
                <li><strong>Contact us:</strong> Name, email address, and message content</li>
                <li><strong>Use social features:</strong> Profile information, preferences, and activity data</li>
              </ul>

              <h3>2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information, including:</p>
              <ul>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referral sources</li>
                <li><strong>Cookies:</strong> Small data files stored on your device to enhance user experience</li>
                <li><strong>Analytics:</strong> Aggregated data about website performance and user behavior</li>
              </ul>

              <h3>2.3 Third-Party Integrations</h3>
              <p>When you connect third-party services (such as LinkedIn), we may collect:</p>
              <ul>
                <li>Profile information from the connected service</li>
                <li>Access tokens required for integration features</li>
                <li>Usage data related to integrated features</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li><strong>Service Delivery:</strong> Provide, operate, and maintain our platform</li>
                <li><strong>User Experience:</strong> Personalize content and improve website functionality</li>
                <li><strong>Communication:</strong> Send updates, newsletters, and respond to inquiries</li>
                <li><strong>Analytics:</strong> Understand usage patterns and improve our services</li>
                <li><strong>Security:</strong> Protect against fraud, abuse, and unauthorized access</li>
                <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
                <li><strong>Marketing:</strong> Send promotional materials (with your consent)</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>4. Third-Party Services</h2>
              <p>We integrate with third-party services to enhance our platform:</p>

              <h3>4.1 LinkedIn Integration</h3>
              <p>
                We use LinkedIn OAuth for authentication and content sharing features. When you connect your LinkedIn account, LinkedIn's Privacy Policy applies to information shared with them.
              </p>

              <h3>4.2 Analytics Services</h3>
              <p>
                We use analytics services (such as Google Analytics) to understand website traffic and user behavior. These services may use cookies and tracking technologies.
              </p>

              <h3>4.3 Payment Processors</h3>
              <p>
                If we process payments, we use secure third-party payment processors. We do not store full credit card information on our servers.
              </p>
            </section>

            <section className="privacy-section">
              <h2>5. Data Sharing and Disclosure</h2>
              <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of Nexverce, our users, or others</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul>
                <li>Encryption of data in transit (HTTPS/SSL)</li>
                <li>Secure authentication and authorization protocols</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and employee training on data protection</li>
                <li>Secure backup and disaster recovery procedures</li>
              </ul>
              <p>
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="privacy-section">
              <h2>7. Your Privacy Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Restriction:</strong> Request restriction of processing under certain circumstances</li>
              </ul>
              <p>
                To exercise these rights, please contact us at <a href="mailto:contact@nexverce.com">contact@nexverce.com</a>
              </p>
            </section>

            <section className="privacy-section">
              <h2>8. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. Types of cookies we use:
              </p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with your consent)</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>9. Children's Privacy</h2>
              <p>
                Nexverce is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="privacy-section">
              <h2>10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.
              </p>
            </section>

            <section className="privacy-section">
              <h2>11. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="privacy-section">
              <h2>12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="privacy-section">
              <h2>13. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> <a href="mailto:contact@nexverce.com">contact@nexverce.com</a></p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/nexverce" target="_blank" rel="noopener noreferrer">linkedin.com/company/nexverce</a></p>
                <p><strong>Instagram:</strong> <a href="https://www.instagram.com/nexverce" target="_blank" rel="noopener noreferrer">@nexverce</a></p>
                <p><strong>Facebook:</strong> <a href="https://www.facebook.com/nexverce" target="_blank" rel="noopener noreferrer">facebook.com/nexverce</a></p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>14. Consent</h2>
              <p>
                By using Nexverce, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
