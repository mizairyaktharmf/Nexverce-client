import React from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../Data/productsData.json";
import "./CategoryPage.css";

function CategoryPage() {
  const { slug } = useParams();

  // Category mapping for slugs
  const slugToCategoryMap = {
    education: "Education",
    finance: "Finance",
    technology: "Technology",
    health: "Health",
    marketing: "Marketing",
    entertainment: "Entertainment",
  };

  const categoryName = slugToCategoryMap[slug] || "";

  // Filter posts that match category
  const categoryPosts = productsData.filter(
    (post) => post.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (categoryPosts.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>No posts found in "{categoryName}"</h2>
      </div>
    );
  }

  return (
    <section className="categoryPage">
      <h2>{categoryName}</h2>
      <div className="categoryGrid">
        {categoryPosts.map((post) => (
          <div key={post.id} className="categoryPostCard">
            <Link to={`/post/${post.id}`} className="postLink">
              <img src={post.image} alt={post.title} className="postImg" />
              <span className="postTag">{post.tag}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              {post.price && (
                <p>
                  <strong>Price: </strong>
                  {post.price}
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
