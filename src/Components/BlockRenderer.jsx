import React from "react";
import "./BlockRenderer.css";

export default function BlockRenderer({ block }) {
  if (!block) return null;

  switch (block.type) {

    // TEXT BLOCK
    case "text":
      return (
        <div className="br-text-block">
          <p>{block.data?.text}</p>
        </div>
      );

    // PROS & CONS
    case "procons":
      return (
        <div className="br-procons">
          <div className="br-pros">
            <h3>✅ Pros</h3>
            <ul>
              {block.data?.pros?.split("\n").map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="br-cons">
            <h3>❌ Cons</h3>
            <ul>
              {block.data?.cons?.split("\n").map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    // CTA BUTTON
    case "cta":
      return (
        <a
          href={block.data?.link}
          className="br-cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {block.data?.label}
        </a>
      );

    // FAQ BLOCK
    case "faq":
      return (
        <div className="br-faq">
          <h3>❓ {block.data?.question}</h3>
          <p>{block.data?.answer}</p>
        </div>
      );

    // DEFAULT
    default:
      return null;
  }
}