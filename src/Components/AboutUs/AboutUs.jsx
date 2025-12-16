import React from 'react';
import './AboutUs.css';
import Footer from '../Footer/Footer';

function AboutUs() {
  return (
    <>
      <div className="about-us-page">
        <div className="about-us-hero">
          <h1 className="about-us-title">About Nexverce</h1>
          <p className="about-us-tagline">Empowering Businesses with Innovative Digital Solutions</p>
        </div>

        <div className="about-us-container">
          <section className="about-section">
            <h2>Who We Are</h2>
            <p>
              Welcome to <strong>Nexverce</strong> – your trusted partner in digital innovation and e-commerce solutions. We are a forward-thinking platform dedicated to helping businesses and individuals discover, explore, and leverage cutting-edge products, services, and content across various industries.
            </p>
            <p>
              Founded with a vision to bridge the gap between technology and accessibility, Nexverce provides a comprehensive ecosystem where innovation meets practicality. Whether you're looking for the latest tech gadgets, marketing tools, health solutions, or business services, we curate and showcase the best offerings to help you make informed decisions.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to <strong>empower businesses and consumers</strong> by providing a centralized platform that offers:
            </p>
            <ul>
              <li><strong>Curated Content:</strong> High-quality articles, reviews, and insights across diverse categories</li>
              <li><strong>Product Discovery:</strong> Innovative products and services tailored to your needs</li>
              <li><strong>Business Solutions:</strong> Tools and resources to help businesses grow and thrive</li>
              <li><strong>Community Engagement:</strong> A space for learning, sharing, and connecting with like-minded individuals</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>What We Do</h2>
            <p>Nexverce is more than just a marketplace – it's an <strong>innovation hub</strong> where you can:</p>

            <div className="what-we-do-grid">
              <div className="what-we-do-card">
                <div className="card-icon">🛍️</div>
                <h3>Explore Products</h3>
                <p>Discover the latest products across categories like technology, health, beauty, finance, and more.</p>
              </div>

              <div className="what-we-do-card">
                <div className="card-icon">📝</div>
                <h3>Read & Learn</h3>
                <p>Access in-depth articles, blogs, and guides written by industry experts to stay informed and inspired.</p>
              </div>

              <div className="what-we-do-card">
                <div className="card-icon">🚀</div>
                <h3>Grow Your Business</h3>
                <p>Leverage our platform to showcase your offerings, connect with your audience, and expand your reach.</p>
              </div>

              <div className="what-we-do-card">
                <div className="card-icon">🤝</div>
                <h3>Connect & Collaborate</h3>
                <p>Join a vibrant community of entrepreneurs, creators, and innovators shaping the future.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>🌟 Innovation</h3>
                <p>We embrace new ideas and technologies to stay ahead of the curve.</p>
              </div>

              <div className="value-item">
                <h3>🔒 Trust</h3>
                <p>We prioritize transparency, security, and user privacy in everything we do.</p>
              </div>

              <div className="value-item">
                <h3>💡 Excellence</h3>
                <p>We strive for quality in every product, service, and piece of content we deliver.</p>
              </div>

              <div className="value-item">
                <h3>🌍 Community</h3>
                <p>We believe in building meaningful connections and fostering collaboration.</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Why Choose Nexverce?</h2>
            <ul>
              <li><strong>Diverse Categories:</strong> From tech and marketing to health and lifestyle, we cover it all.</li>
              <li><strong>Curated Quality:</strong> Every product and article is carefully selected to ensure relevance and value.</li>
              <li><strong>User-Centric Design:</strong> Our platform is built with you in mind – easy to navigate, visually appealing, and highly functional.</li>
              <li><strong>Seamless Integration:</strong> Connect with social media, automate workflows, and streamline your digital presence.</li>
              <li><strong>Expert Insights:</strong> Learn from industry leaders and stay updated with the latest trends and best practices.</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Nexverce was born out of a passion for <strong>innovation and accessibility</strong>. Recognizing the overwhelming amount of information and choices available online, we set out to create a platform that simplifies decision-making by curating the best products, services, and content in one place.
            </p>
            <p>
              What started as a small idea has grown into a thriving ecosystem that serves businesses, creators, and consumers worldwide. Today, Nexverce is proud to be a trusted destination for those seeking quality, innovation, and inspiration.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Team</h2>
            <p>
              Behind Nexverce is a dedicated team of <strong>developers, designers, marketers, and strategists</strong> who are passionate about creating exceptional digital experiences. We work tirelessly to ensure that Nexverce remains a cutting-edge platform that meets the evolving needs of our users.
            </p>
            <p>
              We are powered by <a href="https://www.nexcodenova.com" target="_blank" rel="noopener noreferrer" className="team-link">NexCodeNova</a>, a leading technology solutions provider committed to building innovative software and platforms.
            </p>
          </section>

          <section className="about-section">
            <h2>Join the Nexverce Community</h2>
            <p>
              Whether you're a business looking to expand your reach, a content creator seeking a platform to showcase your work, or a consumer searching for the best products and services, <strong>Nexverce is here for you</strong>.
            </p>
            <p>
              Join thousands of users who trust Nexverce to deliver quality, innovation, and value. Together, let's shape the future of digital commerce and content.
            </p>
          </section>

          <section className="about-section about-cta">
            <h2>Get in Touch</h2>
            <p>
              Have questions, feedback, or partnership inquiries? We'd love to hear from you!
            </p>
            <div className="contact-info-box">
              <p><strong>Email:</strong> <a href="mailto:contact@nexverce.com">contact@nexverce.com</a></p>
              <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/nexverce" target="_blank" rel="noopener noreferrer">linkedin.com/company/nexverce</a></p>
              <p><strong>Instagram:</strong> <a href="https://www.instagram.com/nexverce" target="_blank" rel="noopener noreferrer">@nexverce</a></p>
              <p><strong>Facebook:</strong> <a href="https://www.facebook.com/nexverce" target="_blank" rel="noopener noreferrer">facebook.com/nexverce</a></p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
