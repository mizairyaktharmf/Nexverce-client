import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostPage.css";
import API_BASE from "../../Config/Api";
import BlockRenderer from "../../components/BlockRenderer";

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/${id}`);

        if (!res.ok) throw new Error("Failed to fetch post");

        const data = await res.json();

        let contentBlocksParsed = [];

        try {
          contentBlocksParsed = Array.isArray(data.contentBlocks)
            ? data.contentBlocks
            : JSON.parse(data.contentBlocks || "[]");
        } catch {
          contentBlocksParsed = [];
        }

        setPost({
          ...data,
          contentBlocks: contentBlocksParsed,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="post-loading">
        <h2>Loading your article...</h2>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-loading">
        <h2>{error ? error : "Post not found"}</h2>
        <Link to="/" className="backBtn">← Back to Home</Link>
      </div>
    );
  }

  const symbol = currencySymbol[post.currency] || "";

  return (
    <section className="postPage">
      <div className="postContainer premiumPost">

        {/* HEADER IMAGE */}
        <div className="postHeaderImage">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="mainPostImage"
              loading="lazy"
            />
          ) : (
            <div className="noImageBox">No Image Available</div>
          )}
        </div>

        {/* CONTENT */}
        <div className="postMainContent">

          {/* TITLE */}
          <h1 className="postTitlePremium">{post.title}</h1>

          {/* TAG */}
          {post.tag && (
            <span className="premiumTag">{post.tag}</span>
          )}

          {/* BLOCKS */}
          <div className="premiumBlocksWrapper">
            {post.contentBlocks?.length > 0 ? (
              post.contentBlocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))
            ) : (
              <p>No content available.</p>
            )}
          </div>

          {/* PRICE */}
          {post.price && (
            <p className="premiumPriceTag">
              <span>Price:</span> {symbol}{post.price}
            </p>
          )}

          {/* BUTTONS */}
          <div className="premiumButtons">

            {post.referralLink ? (
              <a
                href={post.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="premiumBtn dealBtn"
              >
                🔥 Grab Deal
              </a>
            ) : (
              <button className="premiumBtn disabledBtn">No Link Available</button>
            )}

            {post.category && (
              <Link
                to={`/category/${post.category.toLowerCase()}`}
                className="premiumBtn backBtnPremium"
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