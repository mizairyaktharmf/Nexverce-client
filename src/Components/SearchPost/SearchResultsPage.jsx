import React from "react";
import { useLocation, Link } from "react-router-dom";
import productsData from "../../Data/productsData.json";
import "./SearchResultsPage.css";

function SearchResultsPage() {
  const query = new URLSearchParams(useLocation().search).get("q")?.toLowerCase() || "";

  const filteredPosts = productsData.filter((post) => {
    const contentString = `${post.title} ${post.description} ${post.category} ${post.content}`.toLowerCase();
    return contentString.includes(query);
  });

  return (
    <section className="searchResultsPage">
      <h2>Search Results for: "{query}"</h2>
      {filteredPosts.length === 0 ? (
        <p>No posts found for "{query}".</p>
      ) : (
        <div className="categoryGrid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="categoryPostCard">
              <Link to={`/post/${post.id}`} className="postLink">
                <img src={post.image} alt={post.title} className="postImg" />
                <span className="postTag">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <button className="readBtn">Read More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchResultsPage;
