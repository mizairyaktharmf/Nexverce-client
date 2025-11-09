import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostPage.css";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://nexverce-backend.onrender.com/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Loading post...</h2>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>{error ? `Error: ${error}` : "Post not found"}</h2>
        <Link to="/" className="backBtn">Go Back</Link>
      </div>
    );
  }

  return (
    <section className="postPage">
      <div className="postContainer">
        <div className="postImageWrapper">
          <img src={post.image} alt={post.title} className="postPageImg" />
          <span className="postPageTag">{post.tag}</span>
        </div>

        <div className="postTextContent">
          <h1 className="postTitle">{post.title}</h1>
          <div
            className="postContent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          {post.price && (
            <p className="postPrice">
              <strong>Price:</strong> {post.price}
            </p>
          )}

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
              <button className="linkBtn" disabled>
                No Link Available
              </button>
            )}

            <Link
              to={`/category/${post.category?.toLowerCase()}`}
              className="backBtn"
            >
              ← Back to {post.category}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostPage;
