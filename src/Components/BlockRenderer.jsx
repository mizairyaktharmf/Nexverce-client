// Single Block Renderer Component
import { useState, useEffect } from 'react';

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

    // FAQ BLOCK - Matching Admin Preview Exactly
    case "faq":
      const FAQBlock = () => {
        const [openIndex, setOpenIndex] = useState(null);
        const [searchTerm, setSearchTerm] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("all");

        const faqs = block.data?.faqs || [];
        const title = block.data?.title || "Frequently Asked Questions";
        const subtitle = block.data?.subtitle || "";

        // Advanced styling options
        const layoutStyle = block.data?.layoutStyle || "accordion";
        const colorScheme = block.data?.colorScheme || "blue";
        const iconStyle = block.data?.iconStyle || "plus-minus";
        const borderStyle = block.data?.borderStyle || "solid";
        const questionSize = block.data?.questionSize || "medium";
        const spacing = block.data?.spacing || "normal";

        // Advanced features
        const enableSearch = block.data?.enableSearch || false;
        const enableCategories = block.data?.enableCategories || false;
        const showNumbers = block.data?.showNumbers || false;
        const expandMultiple = block.data?.expandMultiple || false;
        const expandFirstByDefault = block.data?.expandFirstByDefault || false;
        const highlightOnHover = block.data?.highlightOnHover !== false;

        // Custom colors
        const customPrimaryColor = block.data?.customPrimaryColor || "#4a90e2";
        const customTextColor = block.data?.customTextColor || "#1a1a1a";
        const customBackgroundColor = block.data?.customBackgroundColor || "#ffffff";
        const customAccentColor = block.data?.customAccentColor || "#f0f8ff";

        const colorSchemes = {
          blue: { primary: "#4a90e2", text: "#1a1a1a", bg: "#ffffff", accent: "#f0f8ff" },
          green: { primary: "#10b981", text: "#1a1a1a", bg: "#ffffff", accent: "#f0fdf4" },
          purple: { primary: "#9333ea", text: "#1a1a1a", bg: "#ffffff", accent: "#faf5ff" },
          orange: { primary: "#f59e0b", text: "#1a1a1a", bg: "#ffffff", accent: "#fffbeb" },
          dark: { primary: "#1f2937", text: "#ffffff", bg: "#111827", accent: "#374151" },
          custom: {
            primary: customPrimaryColor,
            text: customTextColor,
            bg: customBackgroundColor,
            accent: customAccentColor
          },
        };

        const colors = colorSchemes[colorScheme];

        const toggleFAQ = (index) => {
          if (expandMultiple) {
            const currentOpen = openIndex || [];
            if (currentOpen.includes(index)) {
              setOpenIndex(currentOpen.filter(i => i !== index));
            } else {
              setOpenIndex([...currentOpen, index]);
            }
          } else {
            setOpenIndex(openIndex === index ? null : index);
          }
        };

        const isFAQOpen = (index) => {
          if (expandMultiple) {
            return (openIndex || []).includes(index);
          }
          return openIndex === index;
        };

        const getCategories = () => {
          const cats = new Set(faqs.map(f => f.category).filter(Boolean));
          return ["all", ...Array.from(cats)];
        };

        const filteredFAQs = faqs.filter(faq => {
          const matchesSearch = !searchTerm ||
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
          return matchesSearch && matchesCategory && faq.question.trim();
        });

        const getIconSymbol = (index, isOpen) => {
          switch (iconStyle) {
            case "plus-minus": return isOpen ? "−" : "+";
            case "chevron": return isOpen ? "⌃" : "⌄";
            case "arrow": return isOpen ? "↑" : "→";
            case "number": return `${index + 1}`;
            case "emoji": return faqs[index]?.icon || "❓";
            default: return isOpen ? "−" : "+";
          }
        };

        // Initialize first FAQ as open if enabled
        useEffect(() => {
          if (expandFirstByDefault && openIndex === null && faqs.length > 0) {
            setOpenIndex(0);
          }
        }, [expandFirstByDefault, openIndex, faqs.length]);

        const spacingClasses = {
          compact: "my-8",
          normal: "my-12",
          relaxed: "my-16"
        };

        const questionSizeClasses = {
          small: "text-base",
          medium: "text-lg",
          large: "text-xl"
        };

        const borderClasses = {
          solid: "border-2",
          dashed: "border-2 border-dashed",
          none: "border-0",
          shadow: "border-0 shadow-md"
        };

        return (
          <div
            className={`w-full max-w-4xl mx-auto px-4 ${spacingClasses[spacing]}`}
            style={{
              color: colors.text,
              backgroundColor: colors.bg
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              {title && (
                <h2
                  className="text-3xl font-bold mb-3"
                  style={{ color: colors.primary }}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-gray-600">{subtitle}</p>
              )}
            </div>

            {/* Search Bar */}
            {enableSearch && (
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="🔍 Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
                  style={{
                    borderColor: colors.primary,
                    backgroundColor: colors.accent
                  }}
                />
              </div>
            )}

            {/* Category Filter */}
            {enableCategories && getCategories().length > 1 && (
              <div className="flex gap-2 mb-6 flex-wrap justify-center">
                {getCategories().map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-4 py-2 rounded-lg font-semibold transition-all"
                    style={{
                      backgroundColor: selectedCategory === cat ? colors.primary : colors.accent,
                      color: selectedCategory === cat ? "#ffffff" : colors.text
                    }}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            )}

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => {
                const isOpen = isFAQOpen(index);
                return (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden transition-all ${borderClasses[borderStyle]} ${highlightOnHover ? 'hover:shadow-lg' : ''}`}
                    style={{
                      borderColor: colors.primary,
                      backgroundColor: isOpen ? colors.accent : colors.bg
                    }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full flex items-center justify-between text-left font-semibold transition-all duration-300 ${questionSizeClasses[questionSize]}`}
                      style={{
                        padding: questionSize === 'small' ? '14px 16px' : questionSize === 'large' ? '22px 24px' : '18px 20px',
                        backgroundColor: isOpen ? colors.primary : 'transparent',
                        color: isOpen ? 'white' : colors.text,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (!isOpen) e.currentTarget.style.backgroundColor = colors.accent;
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {showNumbers && (
                          <span className="font-bold text-sm" style={{ color: isOpen ? 'white' : colors.primary }}>
                            {index + 1}.
                          </span>
                        )}
                        {iconStyle === "emoji" && (
                          <span className="text-2xl">{faq.icon}</span>
                        )}
                        <span>{faq.question}</span>
                      </div>
                      <span
                        className="text-2xl font-bold ml-4 flex-shrink-0 transition-transform duration-300 inline-block"
                        style={{
                          color: isOpen ? 'white' : colors.primary,
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                      >
                        {getIconSymbol(index, isOpen)}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        className="px-6 py-5 text-base border-t-2"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.text,
                          borderColor: '#e0e0e0',
                          lineHeight: '1.7'
                        }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No FAQs found matching your criteria
              </div>
            )}
          </div>
        );
      };

      return <FAQBlock />;

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

    // PRICING BOX BLOCK - Matching Admin Preview Exactly
    case "pricing":
      // Basic Properties
      const currency = block.data?.currency || "$";
      const price = block.data?.price || "99";
      const originalPrice = block.data?.originalPrice || "";
      const period = block.data?.period || "/month";
      const productName = block.data?.productName || "Premium Plan";
      const description = block.data?.description || "Perfect for growing businesses";
      const features = block.data?.features || [];
      const buttonText = block.data?.buttonText || "Get Started";
      const badge = block.data?.badge || "";
      const affiliateLink = block.data?.affiliateLink || block.data?.buttonUrl || "#";

      // Advanced Properties
      const primaryColor = block.data?.primaryColor || "#4a90e2";
      const secondaryColor = block.data?.secondaryColor || "#764ba2";
      const buttonStyle = block.data?.buttonStyle || "gradient";

      // Conditional Features
      const showDiscount = block.data?.showDiscount || false;
      const discountPercentage = block.data?.discountPercentage || "30";
      const showTimer = block.data?.showTimer || false;
      const timerText = block.data?.timerText || "Limited Time Offer";
      const showTrustBadge = block.data?.showTrustBadge || false;
      const trustBadgeText = block.data?.trustBadgeText || "Money Back Guarantee";
      const showRating = block.data?.showRating || false;
      const rating = block.data?.rating || "4.8";
      const reviewCount = block.data?.reviewCount || "1,247";
      const showPopularity = block.data?.showPopularity || false;
      const popularityText = block.data?.popularityText || "500+ customers this month";
      const showBonus = block.data?.showBonus || false;
      const bonusText = block.data?.bonusText || "Free Bonus: Premium Support";
      const showSecondaryButton = block.data?.showSecondaryButton || false;
      const secondaryButtonText = block.data?.secondaryButtonText || "Learn More";
      const secondaryButtonUrl = block.data?.secondaryButtonUrl || "";

      // Get button gradient style
      const getButtonGradient = () => {
        if (buttonStyle === "gradient") {
          return `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
        }
        return primaryColor;
      };

      return (
        <div className="relative max-w-md mx-auto my-12 px-8 py-10 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
          {/* Badge */}
          {badge && (
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wide"
              style={{background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`}}
            >
              <span>✨</span>
              {badge}
            </div>
          )}

          {/* Discount Badge */}
          {showDiscount && originalPrice && (
            <div className="absolute -top-3 -right-3 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {discountPercentage}% OFF
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{productName}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>

          {/* Rating */}
          {showRating && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill={i < Math.floor(parseFloat(rating)) ? "#fbbf24" : "none"} stroke="#fbbf24" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">{rating} ({reviewCount} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="py-5 border-t-2 border-b-2 border-gray-100 mb-6">
            {originalPrice && (
              <div className="text-lg text-gray-400 line-through mb-2 font-medium">
                {currency}{originalPrice}
              </div>
            )}
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-gray-900">{currency}</span>
              <span
                className="text-6xl font-extrabold bg-clip-text text-transparent"
                style={{backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`}}
              >
                {price}
              </span>
              <span className="text-lg text-gray-600 font-medium">{period}</span>
            </div>

            {/* Timer */}
            {showTimer && (
              <div className="flex items-center justify-center gap-1 mt-3 text-sm text-amber-600 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {timerText}
              </div>
            )}
          </div>

          {/* Popularity Badge */}
          {showPopularity && (
            <div className="flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-lg">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm text-blue-700 font-medium">{popularityText}</span>
            </div>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <ul className="text-left mb-6 space-y-0">
              {features.filter(f => f && (typeof f === 'string' ? f.trim() : true)).map((feature, i) => {
                const featureText = typeof feature === 'string' ? feature : (feature?.text || feature?.content || '');
                return (
                  <li key={i} className="py-3 border-b border-gray-100 last:border-b-0 flex items-center gap-3 text-gray-700 hover:text-[#667eea] hover:pl-2 transition-all">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    <span className="text-[15px]">{featureText}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Bonus Section */}
          {showBonus && (
            <div className="flex items-center justify-center gap-2 mb-6 px-4 py-3 bg-purple-50 rounded-lg border-2 border-purple-200">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span className="text-sm text-purple-700 font-semibold">{bonusText}</span>
            </div>
          )}

          {/* Button Container */}
          <div className="space-y-3">
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block w-full px-8 py-4 font-bold text-base rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: getButtonGradient(),
                color: '#ffffff'
              }}
            >
              <span className="uppercase tracking-wide" style={{color: '#ffffff'}}>{buttonText}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#ffffff'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Secondary Button */}
            {showSecondaryButton && (
              <a
                href={secondaryButtonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                {secondaryButtonText}
              </a>
            )}
          </div>

          {/* Trust Badge */}
          {showTrustBadge && (
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-600 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{trustBadgeText}</span>
            </div>
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