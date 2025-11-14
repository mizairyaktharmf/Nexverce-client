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

  // Fetch Single Post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/${id}`);

        if (!response.ok) throw new Error("Failed to fetch post");

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

  // Loading
  if (loading) {
    return (
      <div className="post-loading">
        <h2>Loading post...</h2>
      </div>
    );
  }

  // Error
  if (error || !post) {
    return (
      <div className="post-loading">
        <h2>{error ? `Error: ${error}` : "Post not found"}</h2>
        <Link to="/" className="backBtn">← Back to Home</Link>
      </div>
    );
  }

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
            <div className="noImageBox">No Image Available</div>
          )}

          {post.tag && <span className="postPageTag">{post.tag}</span>}
        </div>

        {/* TEXT CONTENT */}
        <div className="postTextContent">
          <h1 className="postTitle">{post.title}</h1>

          {/* CONTENT WITHOUT BOX */}
          <div
            className="postContent"
            dangerouslySetInnerHTML={{
              __html: post.content || "<p>No content available.</p>",
            }}
          ></div>

          {/* PRICE */}
          {post.price && (
            <p className="postPrice">
              <strong>Price:</strong> {symbol}{post.price}
            </p>
          )}

          {/* BUTTONS */}
          <div className="postButtons">

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
              <button className="linkBtn" disabled>No Link Available</button>
            )}

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
