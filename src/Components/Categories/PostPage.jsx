import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostPage.css";
import API_BASE from "../../Config/Api";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Currency mapping
  const currencySymbol = {
    USD: "$",
    EUR: "€",
    AED: "د.إ",
    LKR: "Rs ",
    JPY: "¥",
    INR: "₹",
  };

  // Fetch single post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Loading UI
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Loading post...</h2>
      </div>
    );
  }

  // Error or missing post
  if (error || !post) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>{error ? `Error: ${error}` : "Post not found"}</h2>
        <Link to="/" className="backBtn">← Back to Home</Link>
      </div>
    );
  }

  // Currency symbol
  const symbol = currencySymbol[post.currency] || "";

  return (
    <section className="postPage">
      <div className="postContainer">

        {/* IMAGE BLOCK */}
        <div className="postImageWrapper">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="postPageImg"
              loading="lazy"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "300px",
                background: "#f3f4f6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#888",
                fontSize: "1rem",
              }}
            >
              No Image Available
            </div>
          )}

          {post.tag && <span className="postPageTag">{post.tag}</span>}
        </div>

        {/* TEXT CONTENT BLOCK */}
        <div className="postTextContent">
          <h1 className="postTitle">{post.title}</h1>

          <div
            className="postContent"
            dangerouslySetInnerHTML={{
              __html: post.content || "<p>No content available.</p>",
            }}
          ></div>

          {/* PRICE BLOCK */}
          {post.price && (
            <p className="postPrice">
              <strong>Price:</strong> {symbol}{post.price}
            </p>
          )}

          {/* BUTTONS */}
          <div className="postButtons">

            {/* Grab Deal */}
            {post.referralLink ? (
              <a
                href={post.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="linkBtn"
              >
                Grab Deal
              </a>
            ) : (
              <button className="linkBtn" disabled>
                No Link Available
              </button>
            )}

            {/* Back to Category */}
            {post.category && (
              <Link
                to={`/category/${post.category.toLowerCase()}`}
                className="backBtn"
              >
                ← Back to {post.category}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostPage;
