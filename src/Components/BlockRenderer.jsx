// Single Block Renderer Component
function SingleBlock({ block, index }) {
  if (!block) return null;

  switch (block.type) {
    // HEADER/HEADING BLOCK (Editor.js uses "heading")
    case "header":
    case "heading":
      const level = block.data?.level || 2;
      const HeadingTag = `h${level}`;
      const headingClasses = {
        1: "text-4xl font-bold text-gray-900 mb-6 mt-8",
        2: "text-3xl font-bold text-gray-900 mb-5 mt-7",
        3: "text-2xl font-bold text-gray-900 mb-4 mt-6",
        4: "text-xl font-bold text-gray-900 mb-3 mt-5",
        5: "text-lg font-bold text-gray-900 mb-3 mt-4",
        6: "text-base font-bold text-gray-900 mb-2 mt-3"
      };

      return (
        <HeadingTag className={headingClasses[level] || headingClasses[2]}>
          {block.data?.text || ""}
        </HeadingTag>
      );

    // PARAGRAPH / TEXT BLOCK
    case "paragraph":
    case "text":
      return (
        <div className="text-gray-700 mb-4 leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: block.data?.text || "" }} />
        </div>
      );

    // LIST BLOCK
    case "list":
      const ListTag = block.data?.style === "ordered" ? "ol" : "ul";
      const items = block.data?.items || [];

      return (
        <ListTag className={`mb-4 ml-6 ${block.data?.style === "ordered" ? "list-decimal" : "list-disc"}`}>
          {items.map((item, i) => {
            // Handle both string items and object items with 'content' property
            const itemText = typeof item === 'string' ? item : (item?.content || item?.text || '');
            return (
              <li key={i} className="text-gray-700 mb-2 leading-relaxed">
                {itemText}
              </li>
            );
          })}
        </ListTag>
      );

    // IMAGE BLOCK
    case "image":
      return (
        <div className="my-6">
          <img
            src={block.data?.file?.url || block.data?.url}
            alt={block.data?.caption || ""}
            className="w-full rounded-lg shadow-lg"
          />
          {block.data?.caption && (
            <p className="text-center text-sm text-gray-600 mt-2 italic">
              {block.data.caption}
            </p>
          )}
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