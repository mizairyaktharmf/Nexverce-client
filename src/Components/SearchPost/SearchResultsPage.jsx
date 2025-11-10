import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchResultsPage.css";
import API_BASE from "../../Config/Api"; // ✅ use centralized API config

function SearchResultsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Get query from URL
  const query =
    new URLSearchParams(useLocation().search).get("q")?.toLowerCase() || "";

  // ✅ Fetch all published products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const published = data.filter((p) => p.status === "published");
        setProducts(published);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter posts that match the search query (case-insensitive)
  const filteredPosts = products.filter((post) => {
    const text =
      `${post.title} ${post.description} ${post.category} ${post.tag} ${post.content}`.toLowerCase();
    return text.includes(query);
  });

  // ✅ Group filtered posts by category
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const category = post.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(post);
    return acc;
  }, {});

  // ✅ Define category display order
  const categoryOrder = [
    "Education & E-Learning",
    "Technology & Gadgets",
    "Finance & Investment",
    "Marketing & Business",
    "Health & Fitness",
    "Entertainment & Gaming",
  ];

  const sortedCategories = Object.keys(groupedPosts).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  // ✅ Render UI
  return (
    <section className="searchResultsPage">
      <h2>Search Results for: “{query}”</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found for “{query}”.</p>
      ) : (
        sortedCategories.map((category) => (
          <div key={category} className="categoryGroup">
            <h3 className="categoryTitle">{category}</h3>
            <div className="categoryGrid">
              {groupedPosts[category].map((post) => (
                <div key={post._id} className="categoryPostCard">
                  <Link to={`/post/${post._id}`} className="postLink">
                    <img
                      src={
                        post.image || "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={post.title}
                      className="postImg"
                      loading="lazy"
                    />
                    {post.tag && <span className="postTag">{post.tag}</span>}
                    <h4>{post.title}</h4>
                    <p>{post.description || "No description available."}</p>
                    <button className="readBtn">Read More</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default SearchResultsPage;
