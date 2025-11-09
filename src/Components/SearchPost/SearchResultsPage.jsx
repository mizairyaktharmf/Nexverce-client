import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./SearchResultsPage.css";

function SearchResultsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get("q")?.toLowerCase() || "";

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://nexverce-backend.onrender.com");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter posts that match the query
  const filteredPosts = products.filter((post) => {
    const contentString = `${post.title} ${post.description} ${post.category} ${post.content}`.toLowerCase();
    return contentString.includes(query);
  });

  // Group filtered posts by category
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {});

  // Define category order
  const categoryOrder = ["Education", "Technology", "Finance", "Marketing", "Health", "Entertainment"];
  const sortedCategories = Object.keys(groupedPosts).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <section className="searchResultsPage">
      <h2>Search Results for: "{query}"</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found for "{query}".</p>
      ) : (
        sortedCategories.map((category) => (
          <div key={category} className="categoryGroup">
            <h3 className="categoryTitle">{category}</h3>
            <div className="categoryGrid">
              {groupedPosts[category].map((post) => (
                <div key={post._id} className="categoryPostCard">
                  <Link to={`/post/${post._id}`} className="postLink">
                    <img src={post.image} alt={post.title} className="postImg" />
                    <span className="postTag">{post.tag}</span>
                    <h4>{post.title}</h4>
                    <p>{post.description}</p>
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
