export default function BlockRenderer({ block }) {
  if (!block) return null;

  switch (block.type) {
    case "text":
      return <p className="text-block">{block.data?.text}</p>;

    case "procons":
      return (
        <div className="pros-cons-block">
          <h3>Pros</h3>
          <ul>
            {block.data?.pros?.split("\n").map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <h3>Cons</h3>
          <ul>
            {block.data?.cons?.split("\n").map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      );

    case "faq":
      return (
        <div className="faq-block">
          <strong>Q: {block.data?.question}</strong>
          <p>A: {block.data?.answer}</p>
        </div>
      );

    case "cta":
      return (
        <a
          href={block.data?.link}
          className="cta-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {block.data?.label}
        </a>
      );

    default:
      return null;
  }
}