import React from "react";


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
      const pros = block.data?.pros?.split("\n").filter(p => p.trim()) || [];
      const cons = block.data?.cons?.split("\n").filter(c => c.trim()) || [];

      return (
        <div className="br-procons">
          {pros.length > 0 && (
            <div className="br-pros">
              <h3>✅ Benefits</h3>
              <ul>
                {pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {cons.length > 0 && (
            <div className="br-cons">
              <h3>❌ Cons</h3>
              <ul>
                {cons.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    // CTA BUTTON
    case "cta":
      return (
        <a
          href={block.data?.link || "#"}
          className="br-cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {block.data?.label || "Click Here"}
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

    // DEFAULT - Unknown block type
    default:
      console.warn(`Unknown block type: ${block.type}`, block);
      return null;
  }
}