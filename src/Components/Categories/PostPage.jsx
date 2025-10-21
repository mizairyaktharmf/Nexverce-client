import React from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../Data/productsData.json";
import "./PostPage.css";

function PostPage() {
  const { id } = useParams();
  const post = productsData.find((p) => p.id.toString() === id);

  if (!post) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h2>Post not found</h2>
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
              <button className="linkBtn" disabled>No Link Available</button>
            )}

            <Link
              to={`/category/${post.category.toLowerCase()}`}
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
