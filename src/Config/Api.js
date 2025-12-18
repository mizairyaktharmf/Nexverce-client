// ✅ UNIVERSAL API ENDPOINT - Works for ALL post types (blogs, products, landing pages)
// This endpoint auto-detects the post type and returns the correct data

// Automatically use local backend in development, production URL in production
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/posts"
    : "https://nexverce-backend.onrender.com/api/posts";

export default API_BASE;
