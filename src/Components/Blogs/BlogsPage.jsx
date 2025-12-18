import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogsPage.css";

const API_BASE = "https://nexverce-backend.onrender.com/api/blogs";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, category filter

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();

        // Only show published blogs
        const published = data.filter((blog) => blog.status === "published");
        setBlogs(published);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs
  const categories = [...new Set(blogs.map((blog) => blog.category))].filter(Boolean);

  // Filter blogs
  const filteredBlogs =
    filter === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === filter);

  if (loading) {
    return (
      <div className="blogs-page-loading">
        <h2>Loading blogs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-page-error">
        <h2>Error: {error}</h2>
        <Link to="/" className="back-home-btn">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="blogs-page">
      {/* HEADER */}
      <div className="blogs-header">
        <h1>Nexverce Blogs</h1>
        <p>Discover insights, guides, and stories from our experts</p>
      </div>

      {/* FILTERS */}
      {categories.length > 0 && (
        <div className="blogs-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* BLOG GRID */}
      {filteredBlogs.length === 0 ? (
        <div className="blogs-empty">
          <h3>No blogs found</h3>
          <p>Check back later for new content!</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <Link
              to={`/post/${blog._id}`}
              key={blog._id}
              className="blog-card"
            >
              {/* IMAGE */}
              {blog.image ? (
                <div className="blog-card-image">
                  <img src={blog.image} alt={blog.title} loading="lazy" />
                </div>
              ) : (
                <div className="blog-card-placeholder">No Image</div>
              )}

              {/* CONTENT */}
              <div className="blog-card-content">
                {/* TAG */}
                {blog.tag && <span className="blog-tag">{blog.tag}</span>}

                {/* TITLE */}
                <h3 className="blog-title">{blog.title}</h3>

                {/* DESCRIPTION */}
                {blog.description && (
                  <p className="blog-description">
                    {blog.description.length > 120
                      ? blog.description.substring(0, 120) + "..."
                      : blog.description}
                  </p>
                )}

                {/* CATEGORY */}
                {blog.category && (
                  <div className="blog-meta">
                    <span className="blog-category">📂 {blog.category}</span>
                  </div>
                )}

                {/* READ MORE */}
                <div className="blog-read-more">
                  Read More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
