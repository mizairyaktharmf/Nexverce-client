// Single Block Renderer Component
function SingleBlock({ block }) {
  if (!block) return null;

  switch (block.type) {
    // HEADER/HEADING BLOCK (Editor.js uses "heading")
    case "header":
    case "heading":
      let level = block.data?.level || 2;
      // Handle both "h3" format and "3" format
      if (typeof level === 'string' && level.startsWith('h')) {
        level = parseInt(level.substring(1));
      }
      const HeadingTag = `h${level}`;
      const headingClasses = {
        1: "text-4xl font-extrabold text-gray-900 mb-6 mt-10 leading-tight",
        2: "text-3xl font-bold text-gray-900 mb-5 mt-8 leading-tight",
        3: "text-2xl font-semibold text-gray-800 mb-4 mt-7 leading-snug",
        4: "text-xl font-semibold text-gray-800 mb-3 mt-6 leading-snug",
        5: "text-lg font-semibold text-gray-800 mb-3 mt-5",
        6: "text-base font-semibold text-gray-800 mb-2 mt-4"
      };

      return (
        <HeadingTag className={headingClasses[level] || headingClasses[2]}>
          {block.data?.text || ""}
        </HeadingTag>
      );

    // PARAGRAPH / TEXT BLOCK
    case "paragraph":
    case "text":
      const textContent = block.data?.text || block.data?.content || "";
      return (
        <p className="text-gray-800 mb-6 leading-loose text-lg" dangerouslySetInnerHTML={{ __html: textContent }} />
      );

    // LIST BLOCK
    case "list":
      const ListTag = block.data?.style === "ordered" ? "ol" : "ul";
      const items = block.data?.items || [];

      return (
        <ListTag className={`mb-6 ml-8 space-y-3 ${block.data?.style === "ordered" ? "list-decimal" : "list-disc"}`}>
          {items.map((item, i) => {
            // Handle both string items and object items with 'content' property
            const itemText = typeof item === 'string' ? item : (item?.content || item?.text || '');
            return (
              <li key={i} className="text-gray-700 leading-loose text-lg">
                {itemText}
              </li>
            );
          })}
        </ListTag>
      );

    // IMAGE BLOCK
    case "image":
      const imageUrl = block.data?.file?.url || block.data?.url || block.data?.src || block.data?.imageUrl;

      if (!imageUrl) {
        console.warn('Image block has no URL:', block);
        return null;
      }

      return (
        <div className="my-6 flex justify-center">
          <div className="max-w-3xl w-full">
            <img
              src={imageUrl}
              alt={block.data?.caption || block.data?.alt || ""}
              className="w-full h-auto rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
              loading="lazy"
            />
            {block.data?.caption && (
              <p className="text-center text-sm text-gray-600 mt-3 italic font-medium">
                {block.data.caption}
              </p>
            )}
          </div>
        </div>
      );

    // QUOTE BLOCK
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-purple-50 rounded-r-lg">
          <p className="text-lg text-gray-800 italic mb-2">{block.data?.text}</p>
          {block.data?.caption && (
            <cite className="text-sm text-gray-600">— {block.data.caption}</cite>
          )}
        </blockquote>
      );

    // CODE BLOCK
    case "code":
      return (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-6">
          <code>{block.data?.code}</code>
        </pre>
      );

    // EMBED BLOCK (YouTube, etc)
    case "embed":
      return (
        <div className="my-6">
          <div
            className="aspect-video"
            dangerouslySetInnerHTML={{ __html: block.data?.embed || "" }}
          />
          {block.data?.caption && (
            <p className="text-center text-sm text-gray-600 mt-2">
              {block.data.caption}
            </p>
          )}
        </div>
      );

    // TABLE BLOCK
    case "table":
      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {block.data?.content?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // PROS & CONS
    case "procons":
      const pros = block.data?.pros?.split("\n").filter((p) => p.trim()) || [];
      const cons = block.data?.cons?.split("\n").filter((c) => c.trim()) || [];

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {pros.length > 0 && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span> Pros
              </h3>
              <ul className="space-y-2">
                {pros.map((p, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cons.length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span> Cons
              </h3>
              <ul className="space-y-2">
                {cons.map((c, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    // CTA BUTTON
    case "cta":
      return (
        <div className="my-6 text-center">
          <a
            href={block.data?.link || "#"}
            className="inline-block bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.data?.label || "Click Here"}
          </a>
        </div>
      );

    // FAQ BLOCK
    case "faq":
      return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-primary/20 rounded-lg p-6 my-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-primary">❓</span>
            {block.data?.question}
          </h3>
          <p className="text-gray-700 leading-relaxed">{block.data?.answer}</p>
        </div>
      );

    // WARNING/ALERT BLOCK
    case "warning":
    case "alert":
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              {block.data?.title && (
                <h4 className="font-bold text-yellow-800 mb-1">
                  {block.data.title}
                </h4>
              )}
              <p className="text-yellow-700">{block.data?.message || block.data?.text}</p>
            </div>
          </div>
        </div>
      );

    // DELIMITER
    case "delimiter":
      return <hr className="my-8 border-t-2 border-gray-200" />;

    // RAW HTML
    case "raw":
      return (
        <div
          className="my-6"
          dangerouslySetInnerHTML={{ __html: block.data?.html || "" }}
        />
      );

    // INFOBOX BLOCK
    case "infobox":
      const infoType = block.data?.type || "info";
      const infoTypes = {
        info: { icon: "ℹ️", bg: "#e0f2fe", border: "#0891b2", color: "#06b6d4" },
        tip: { icon: "💡", bg: "#d1fae5", border: "#059669", color: "#10b981" },
        warning: { icon: "⚠️", bg: "#fef3c7", border: "#d97706", color: "#f59e0b" },
        danger: { icon: "🚫", bg: "#fee2e2", border: "#dc2626", color: "#ef4444" },
        note: { icon: "📝", bg: "#f3e8ff", border: "#7c3aed", color: "#8b5cf6" },
        question: { icon: "❓", bg: "#fce7f3", border: "#db2777", color: "#ec4899" },
      };
      const infoConfig = infoTypes[infoType] || infoTypes.info;

      return (
        <div
          className="my-6 p-5 rounded-lg border-l-4 flex items-start gap-3"
          style={{
            backgroundColor: infoConfig.bg,
            borderColor: infoConfig.border
          }}
        >
          <div className="text-2xl" style={{ color: infoConfig.color }}>
            {block.data?.icon || infoConfig.icon}
          </div>
          <div className="flex-1">
            {block.data?.title && (
              <h4 className="font-bold text-lg mb-2" style={{ color: infoConfig.color }}>
                {block.data.title}
              </h4>
            )}
            {block.data?.content && (
              <p className="text-gray-700 leading-relaxed">{block.data.content}</p>
            )}
          </div>
        </div>
      );

    // PRICING BOX BLOCK
    case "pricing":
      return (
        <div className="my-6 p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-primary rounded-xl shadow-lg">
          {block.data?.badge && (
            <span className="inline-block bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              {block.data.badge}
            </span>
          )}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {block.data?.productName || "Product"}
          </h3>
          <p className="text-gray-600 mb-6">{block.data?.description || ""}</p>

          <div className="mb-6">
            {block.data?.originalPrice && (
              <span className="text-lg line-through text-gray-400 mr-3">
                ${block.data.originalPrice}
              </span>
            )}
            <span className="text-5xl font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              ${block.data?.price || "0"}
            </span>
          </div>

          {block.data?.features && block.data.features.length > 0 && (
            <ul className="space-y-3 mb-6">
              {block.data.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {block.data?.buttonText && (
            <button className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              {block.data.buttonText}
            </button>
          )}
        </div>
      );

    // TABLE BLOCK
    case "tableblock":
      const headers = block.data?.headers || [];
      const cells = block.data?.cells || [];

      return (
        <div className="my-6 overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-md">
            {headers.length > 0 && (
              <thead className="bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-3 text-white font-bold text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {cells.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {Array.isArray(row) && row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-300 px-4 py-3 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    // SPACER BLOCK
    case "spacer":
      const spacerHeight = block.data?.height || 40;
      return <div style={{ height: `${spacerHeight}px` }} className="my-4" />;

    // PROS & CONS (already exists but let me check it handles the data correctly)
    // FAQ (already exists)
    // TEXT (already exists as paragraph/text)

    // DEFAULT - Unknown block type
    default:
      console.warn(`Unknown block type: ${block.type}`, block);
      return null;
  }
}

// Main Block Renderer - handles both single block and array of blocks
export default function BlockRenderer({ blocks, block }) {
  // Handle single block
  if (block) {
    return <SingleBlock block={block} index={0} />;
  }

  // Handle array of blocks
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {blocks.map((blk, index) => (
        <SingleBlock key={index} block={blk} index={index} />
      ))}
    </div>
  );
}