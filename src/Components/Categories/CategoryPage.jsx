import React from "react";
import { useParams } from "react-router-dom";
import productsData from "../../Data/productsData.json"; 
import "./CategoryPage.css";

function CategoryPage() {
  const { slug } = useParams();

  // Filter posts by slug mapping
  const slugToCategoryMap = {
    education: "Education",
    finance: "Finance",
    technology: "technology",
    health: "Health",
    marketing: "Marketing",
    entertainment: "Entertainment"
  };

  const categoryName = slugToCategoryMap[slug] || "";

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
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>{categoryName}</h2>
      <div className="categoryGrid">
        {categoryPosts.map((post) => (
          <div key={post.id} className="categoryPostCard">
            <img src={post.image} alt={post.title} className="postImg" />
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            {post.price && <p><strong>Price: </strong>{post.price}</p>}
            <span className="postTag">{post.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
