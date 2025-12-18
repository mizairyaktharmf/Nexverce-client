import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlockRenderer from "../BlockRenderer";

// Use local backend in development, production in production
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/landing-pages"
    : "https://nexverce-backend.onrender.com/api/landing-pages";

export default function LandingPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // LEAD FORM STATE
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // FETCH LANDING PAGE DATA
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_BASE}/slug/${slug}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to load page");

        setPage(data.data);
        setLoading(false);

        // Track page view
        if (data.data._id) {
          fetch(`${API_BASE}/${data.data._id}/conversion`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "view" }),
          }).catch(() => {}); // Silent fail
        }

        // Apply custom design
        applyDesign(data.data.design);

        // Inject tracking codes
        injectTrackingCodes(data.data.tracking);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (slug) fetchPage();
  }, [slug]);

  // APPLY DESIGN SETTINGS
  const applyDesign = (design) => {
    if (!design) return;

    document.documentElement.style.setProperty("--lp-primary", design.primaryColor || "#4f46e5");
    document.documentElement.style.setProperty("--lp-secondary", design.secondaryColor || "#ffffff");
    document.documentElement.style.setProperty("--lp-text", design.textColor || "#111827");
    document.documentElement.style.setProperty("--lp-bg", design.backgroundColor || "#ffffff");
    document.body.style.fontFamily = design.fontFamily || "Inter";
  };

  // INJECT TRACKING CODES
  const injectTrackingCodes = (tracking) => {
    if (!tracking) return;

    // Meta Pixel
    if (tracking.metaPixelId) {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${tracking.metaPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }

    // Google Analytics
    if (tracking.googleAnalyticsId) {
      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${tracking.googleAnalyticsId}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaConfig = document.createElement("script");
      gaConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${tracking.googleAnalyticsId}');
      `;
      document.head.appendChild(gaConfig);
    }

    // Google Tag Manager
    if (tracking.googleTagManagerId) {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${tracking.googleTagManagerId}');
      `;
      document.head.appendChild(gtmScript);
    }

    // Custom tracking code
    if (tracking.customTrackingCode) {
      const customScript = document.createElement("script");
      customScript.innerHTML = tracking.customTrackingCode;
      document.head.appendChild(customScript);
    }
  };

  // HANDLE FORM INPUT CHANGE
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LEAD FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${API_BASE}/${page._id}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed");

      setSubmitSuccess(true);
      setFormData({});

      // Track conversion
      if (window.fbq) {
        window.fbq("track", "Lead");
      }
      if (window.gtag) {
        window.gtag("event", "generate_lead");
      }

      // Redirect if specified
      if (page.leadCapture?.redirectUrl) {
        setTimeout(() => {
          window.location.href = page.leadCapture.redirectUrl;
        }, 2000);
      }
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="lp-loading">
        <div className="lp-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="lp-error">
        <h2>Page Not Found</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  // NOT ACTIVE
  if (page?.status !== "active") {
    return (
      <div className="lp-error">
        <h2>Page Unavailable</h2>
        <p>This landing page is not currently active.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="landing-page" data-hide-header={page.design?.hideHeader} data-hide-footer={page.design?.hideFooter}>
      {/* META TAGS */}
      <Helmet>
        <title>{page.metaTitle || page.title}</title>
        <meta name="description" content={page.metaDescription || ""} />
        <meta property="og:title" content={page.metaTitle || page.title} />
        <meta property="og:description" content={page.metaDescription || ""} />
        <meta property="og:image" content={page.metaImage || page.image} />
        <meta name="keywords" content={page.metaKeywords?.join(", ") || ""} />
      </Helmet>

      {/* HERO IMAGE */}
      {page.image && (
        <div className="lp-hero-image">
          <img src={page.image} alt={page.title} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="lp-content">
        <h1 className="lp-title">{page.title}</h1>

        {page.metaDescription && (
          <p className="lp-description">{page.metaDescription}</p>
        )}

        {/* CONTENT BLOCKS */}
        <div className="lp-blocks">
          {page.contentBlocks?.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>

        {/* LEAD CAPTURE FORM */}
        {page.leadCapture?.enabled && !submitSuccess && (
          <div className="lp-lead-form">
            <h2>{page.leadCapture.formTitle}</h2>
            {page.leadCapture.formDescription && (
              <p>{page.leadCapture.formDescription}</p>
            )}

            <form onSubmit={handleSubmit}>
              {page.leadCapture.fields?.map((field) => (
                <div key={field} className="lp-form-field">
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {" *"}
                  </label>
                  {field === "message" ? (
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      required
                      rows={4}
                    />
                  ) : (
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      required
                    />
                  )}
                </div>
              ))}

              {submitError && <p className="lp-form-error">{submitError}</p>}

              <button type="submit" className="lp-submit-btn" disabled={submitting}>
                {submitting ? "Submitting..." : page.leadCapture.buttonText || "Submit"}
              </button>
            </form>
          </div>
        )}

        {/* SUCCESS MESSAGE */}
        {submitSuccess && (
          <div className="lp-success-message">
            <h2>Thank You!</h2>
            <p>{page.leadCapture?.successMessage || "We'll be in touch soon."}</p>
          </div>
        )}
      </div>

      {/* FOOTER (if not hidden) */}
      {!page.design?.hideFooter && (
        <div className="lp-footer">
          <p>&copy; {new Date().getFullYear()} {page.title}. All rights reserved.</p>
        </div>
      )}
    </div>
  );
}

// Simple Helmet component for meta tags
function Helmet({ children }) {
  useEffect(() => {
    const metaTags = [];
    React.Children.forEach(children, (child) => {
      if (child.type === "title") {
        document.title = child.props.children;
      } else if (child.type === "meta") {
        const meta = document.createElement("meta");
        Object.keys(child.props).forEach((key) => {
          meta.setAttribute(key, child.props[key]);
        });
        document.head.appendChild(meta);
        metaTags.push(meta);
      }
    });

    return () => {
      metaTags.forEach((meta) => meta.remove());
    };
  }, [children]);

  return null;
}