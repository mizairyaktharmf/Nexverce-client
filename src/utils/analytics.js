import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId) {
    ReactGA.initialize(measurementId);
    console.log('Google Analytics initialized with ID:', measurementId);
  } else {
    console.warn('Google Analytics Measurement ID not found');
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track custom events
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('Button Click', buttonName, location);
};

// Track form submissions
export const trackFormSubmit = (formName) => {
  trackEvent('Form', 'Submit', formName);
};

// Track product/post views
export const trackPostView = (postId, postTitle, category) => {
  ReactGA.event({
    category: 'Post',
    action: 'View',
    label: postTitle,
    value: postId,
  });
};

// Track affiliate link clicks
export const trackAffiliateClick = (affiliateLink, postTitle) => {
  ReactGA.event({
    category: 'Affiliate',
    action: 'Click',
    label: postTitle,
    value: affiliateLink,
  });
};

// Track search queries
export const trackSearch = (searchQuery) => {
  ReactGA.event({
    category: 'Search',
    action: 'Query',
    label: searchQuery,
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (email) => {
  ReactGA.event({
    category: 'Newsletter',
    action: 'Signup',
    label: email,
  });
};

// Track career application clicks
export const trackCareerApplication = (jobTitle) => {
  ReactGA.event({
    category: 'Career',
    action: 'Apply',
    label: jobTitle,
  });
};
