/**
 * Client-side analytics tracking for Nexverce
 * Tracks page views and affiliate clicks to backend analytics system
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Get device type based on screen width
 */
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};

/**
 * Get browser information
 */
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Firefox") > -1) return "Firefox";
  if (userAgent.indexOf("Chrome") > -1) return "Chrome";
  if (userAgent.indexOf("Safari") > -1) return "Safari";
  if (userAgent.indexOf("Edge") > -1) return "Edge";
  if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) return "IE";

  return "Unknown";
};

/**
 * Get operating system
 */
const getOS = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Win") > -1) return "Windows";
  if (userAgent.indexOf("Mac") > -1) return "MacOS";
  if (userAgent.indexOf("Linux") > -1) return "Linux";
  if (userAgent.indexOf("Android") > -1) return "Android";
  if (userAgent.indexOf("iOS") > -1 || userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) return "iOS";

  return "Unknown";
};

/**
 * Get or create session ID
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("nexverce_session_id");

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("nexverce_session_id", sessionId);
  }

  return sessionId;
};

/**
 * Get location data (basic from timezone, for now)
 * In production, you'd use a geolocation API like ipapi.co or ipinfo.io
 */
const getLocationData = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    country: "Unknown", // Would be filled by IP geolocation service
    countryCode: "XX",
    city: "Unknown",
    region: "Unknown",
    timezone,
  };
};

/**
 * Track post view
 * @param {string} postId - The ID of the post being viewed
 */
export const trackPostView = async (postId) => {
  if (!postId) return;

  try {
    const locationData = getLocationData();

    const trackingData = {
      postId,
      deviceType: getDeviceType(),
      browser: getBrowserInfo(),
      os: getOS(),
      referrer: document.referrer || "Direct",
      sessionId: getSessionId(),
      ...locationData,
    };

    // Send to backend (non-blocking)
    fetch(`${API_BASE_URL}/analytics/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    }).catch((err) => {
      console.error("Analytics tracking error:", err);
    });

    console.log("📊 Post view tracked:", postId);
  } catch (err) {
    console.error("Error tracking post view:", err);
  }
};

/**
 * Track affiliate link click
 * @param {string} postId - The ID of the post with the affiliate link
 * @param {string} affiliateUrl - The affiliate URL being clicked
 */
export const trackAffiliateClickBackend = async (postId, affiliateUrl) => {
  if (!postId) return;

  try {
    const locationData = getLocationData();

    const trackingData = {
      postId,
      affiliateUrl,
      deviceType: getDeviceType(),
      browser: getBrowserInfo(),
      os: getOS(),
      referrer: document.referrer || "Direct",
      sessionId: getSessionId(),
      ...locationData,
    };

    // Send to backend (non-blocking)
    fetch(`${API_BASE_URL}/analytics/click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    }).catch((err) => {
      console.error("Analytics tracking error:", err);
    });

    console.log("🖱️ Affiliate click tracked:", postId);
  } catch (err) {
    console.error("Error tracking affiliate click:", err);
  }
};

/**
 * Debounce function to prevent multiple rapid calls
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Create debounced versions for common use
export const debouncedTrackView = debounce(trackPostView, 2000);
export const debouncedTrackClick = debounce(trackAffiliateClickBackend, 500);
