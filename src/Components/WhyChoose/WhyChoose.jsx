import React from "react";
import "./WhyChoose.css";
import { FaCheckCircle, FaBalanceScale, FaTags } from "react-icons/fa";

function WhyChoose() {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Verified Affiliate Partners",
      desc: "Every link you click is from trusted, verified sources — so you always get genuine offers.",
    },
    {
      icon: <FaBalanceScale />,
      title: "Smart Comparison",
      desc: "Compare tools, courses, and deals across top platforms — all in one place.",
    },
    {
      icon: <FaTags />,
      title: "Best Deals Guaranteed",
      desc: "Get exclusive discounts, rewards, and limited-time affiliate offers daily.",
    },
  ];

  return (
    <section className="whyChoose">
      <div className="whyChooseContainer">
        <h2>Why Choose Nexverce?</h2>
        <p className="whySubtitle">
          Discover smarter, verified deals — trusted by thousands of users worldwide.
        </p>

        <div className="whyCards">
          {features.map((item, index) => (
            <div key={index} className="whyCard">
              <div className="whyIcon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
