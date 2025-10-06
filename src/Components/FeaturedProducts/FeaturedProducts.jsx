import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import productsData from "../../Data/productsData.json";
import { useNavigate } from "react-router-dom";


function FeaturedProducts() {
  // Filters
  const topPicks = productsData.filter(p => p.type === "topPick");
  const highlights = ["education", "finance", "technology"];
  const deals = productsData.filter(p => p.type === "deal");
  const marketplace = productsData.filter(p => p.type === "marketplace");

  // set Countdown state for all deals
  const [countdowns, setCountdowns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = {};
      deals.forEach(deal => {
        const endTime = new Date(deal.endTime).getTime(); // endTime in JSON
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          newCountdowns[deal.id] = `${days}d ${hours.toString().padStart(2,"0")}h:${minutes.toString().padStart(2,"0")}m:${seconds.toString().padStart(2,"0")}s`;
        } else {
          newCountdowns[deal.id] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);


  return (
    <section className="featuredProducts">
      <div className="featuredProductsHeader">
        <h2>Featured Products</h2>
        <p>Explore trending picks, deals, and tools curated for you.</p>
      </div>

      {/* 1. Top Picks */}
      <div className="sectionBlock">
        <h3>🔥 Top Picks of the Week</h3>
        <div className="slider">
          {topPicks.map(item => (
            <div key={item.id} className="sliderCard">
              <img src={item.image} alt={item.title} className="CardImg"/>
              <span className="tag">{item.tag}</span>
              <h4>{item.title}</h4>
              <button className="buyBtn" onClick={() => navigate(`/post/${item.id}`)}>Explore Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Highlights */}
      <div className="sectionBlock">
        <h3>📌 Category Highlights</h3>
        <div className="highlightGrid">
          {highlights.map((cat, idx) => {
            const product = productsData.find(p => p.category === cat);
            return (
              <div key={idx} className="highlightCard">
                <img className="CardImg"
                  src={product ? product.image : "https://via.placeholder.com/250x150"}
                  alt={cat}
                />
                <h4>{cat} Pick</h4>
                <p>{product ? product.description : "Top pick in this category"}</p>
                <button className="buyBtn" onClick={() => navigate(`/post/${product.id}`)}>Explore Now</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Deal of the Day */}
      <h3 className="dealTitle">⏳ Deal of the Day</h3>
      <div className="dealCardsContainer">
        
        {deals.map(deal => (
          <div key={deal.id} className="dealCard">
            <img src={deal.image} alt={deal.title} className="CardImg"/>
            <div className="dealInfo">
              <h4>{deal.title}</h4>
              <p>{deal.description}</p>
              <div className="countdown">{countdowns[deal.id] || "Loading..."}</div>
              <button className="buyBtn" onClick={() => navigate(`/post/${deal.id}`)}>Grab Deal</button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Mini Marketplace */}
      <div className="sectionBlock">
        <h3>🛒 Mini Marketplace</h3>
        <div className="marketGrid">
          {marketplace.map(item => (
            <div key={item.id} className="marketCard">
              <img src={item.image} alt={item.title} className="CardImg"/>
              <h4>{item.title}</h4>
              <p>{item.price}</p>
              <span>★★★★☆</span><br/>
              <button className="buyBtn" onClick={() => navigate(`/post/${item.id}`)}>Shop Now</button>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default FeaturedProducts;
