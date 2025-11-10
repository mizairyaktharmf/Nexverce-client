import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.css";
import API_BASE from "../../Config/Api";

function CategoryPage() {
  const { slug } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Map slugs to how they’re stored in MongoDB (admin category values)
  const slugToCategoryMap = {
    education: "Education",
    finance: "Finance",
    technology: "Technology",
    health: "Health",
    marketing: "Marketing",
    lifestyle: "Lifestyle",
  };

  const categoryName = slugToCategoryMap[slug] || slug;

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();

        // ✅ Filter: only published and correct category
        const filtered = data.filter(
          (post) =>
            post.status === "published" &&
            post.category &&
            post.category.trim().toLowerCase() ===
              categoryName.trim().toLowerCase()
        );

        setCategoryPosts(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [categoryName]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h3>Loading posts...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        <h3>Error: {error}</h3>
      </div>
    );
  }

  if (categoryPosts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>No posts found in “{categoryName}”</h2>
      </div>
    );
  }

  return (
    <section className="categoryPage">
      <h2>{categoryName}</h2>
      <div className="categoryGrid">
        {categoryPosts.map((post) => (
          <div key={post._id} className="categoryPostCard">
            <Link to={`/post/${post._id}`} className="postLink">
              {post.image && (
                <img src={post.image} alt={post.title} className="postImg" />
              )}
              {post.tag && <span className="postTag">{post.tag}</span>}
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              {post.price && (
                <p>
                  <strong>Price:</strong> {post.price}
                </p>
              )}
              <button className="readBtn">Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
