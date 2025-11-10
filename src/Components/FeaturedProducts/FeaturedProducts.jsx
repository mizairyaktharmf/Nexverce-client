import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import { useNavigate } from "react-router-dom";
import API_BASE from "../../Config/Api"; // ✅ centralized API path

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch published products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        // ✅ Only include published posts
        const published = data.filter((p) => p.status === "published");
        setProducts(published);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filters
  const topPicks = products.filter(
    (p) => p.type?.toLowerCase() === "toppick" || p.tag?.toLowerCase().includes("top")
  );
  const deals = products.filter((p) => p.type?.toLowerCase() === "deal");
  const marketplace = products.filter(
    (p) => p.type?.toLowerCase() === "marketplace"
  );
  const highlights = ["education", "finance", "technology"];

  // ✅ Countdown Timer for Deals
  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = {};
      deals.forEach((deal) => {
        if (!deal.endTime) return;
        const endTime = new Date(deal.endTime).getTime();
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          newCountdowns[deal._id] = `${days}d ${hours
            .toString()
            .padStart(2, "0")}h:${minutes
            .toString()
            .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`;
        } else {
          newCountdowns[deal._id] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);

  // ✅ Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h3>Loading featured products...</h3>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", padding: "2rem" }}>
        <h3>Error: {error}</h3>
      </div>
    );
  }

  // ✅ Render Sections
  return (
    <section className="featuredProducts">
      <div className="featuredProductsHeader">
        <h2>Featured Products</h2>
        <p>Explore trending picks, deals, and tools curated for you.</p>
      </div>

      {/* 🔥 Top Picks */}
      {topPicks.length > 0 && (
        <div className="sectionBlock">
          <h3>🔥 Top Picks of the Week</h3>
          <div className="slider">
            {topPicks.map((item) => (
              <div key={item._id} className="sliderCard">
                <img
                  src={item.image || "https://via.placeholder.com/250x150"}
                  alt={item.title}
                  className="CardImg"
                />
                {item.tag && <span className="tag">{item.tag}</span>}
                <h4>{item.title}</h4>
                <button
                  className="buyBtn"
                  onClick={() => navigate(`/post/${item._id}`)}
                >
                  Explore Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📌 Highlights */}
      <div className="sectionBlock">
        <h3>📌 Category Highlights</h3>
        <div className="highlightGrid">
          {highlights.map((cat, idx) => {
            const product = products.find(
              (p) => p.category?.toLowerCase() === cat.toLowerCase()
            );
            return (
              <div key={idx} className="highlightCard">
                <img
                  className="CardImg"
                  src={
                    product?.image || "https://via.placeholder.com/250x150"
                  }
                  alt={cat}
                />
                <h4>{cat.charAt(0).toUpperCase() + cat.slice(1)} Pick</h4>
                <p>
                  {product
                    ? product.description
                    : `Top pick in ${cat} category`}
                </p>
                {product && (
                  <button
                    className="buyBtn"
                    onClick={() => navigate(`/post/${product._id}`)}
                  >
                    Explore Now
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ⏳ Deal of the Day */}
      {deals.length > 0 && (
        <>
          <h3 className="dealTitle">⏳ Deal of the Day</h3>
          <div className="dealCardsContainer">
            {deals.map((deal) => (
              <div key={deal._id} className="dealCard">
                <img
                  src={deal.image || "https://via.placeholder.com/250x150"}
                  alt={deal.title}
                  className="CardImg"
                />
                <div className="dealInfo">
                  <h4>{deal.title}</h4>
                  <p>{deal.description}</p>
                  <div className="countdown">
                    {countdowns[deal._id] || "Loading..."}
                  </div>
                  <button
                    className="buyBtn"
                    onClick={() => navigate(`/post/${deal._id}`)}
                  >
                    Grab Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🛒 Mini Marketplace */}
      {marketplace.length > 0 && (
        <div className="sectionBlock">
          <h3>🛒 Mini Marketplace</h3>
          <div className="marketGrid">
            {marketplace.map((item) => (
              <div key={item._id} className="marketCard">
                <img
                  src={item.image || "https://via.placeholder.com/250x150"}
                  alt={item.title}
                  className="CardImg"
                />
                <h4>{item.title}</h4>
                <p>{item.price ? `$${item.price}` : "Price not available"}</p>
                <span>★★★★☆</span>
                <br />
                <button
                  className="buyBtn"
                  onClick={() => navigate(`/post/${item._id}`)}
                >
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;
