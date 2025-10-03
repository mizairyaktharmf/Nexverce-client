import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";
import education from '../../../src/assets/education.png'
import finance from '../../../src/assets/finance.png'
import fitness from '../../../src/assets/fitness.png'
import gaming from '../../../src/assets/gaming.png'
import marketing from '../../../src/assets/marketing.png'
import technology from '../../../src/assets/technology.png'

const categoriesData = [
  { 
    title: "Education & E-Learning",
    description: "Find top courses, learning platforms, and tools to boost knowledge.",
    image: education,
    slug: "education"
  },
  {
    title: "Finance & Investment",
    description: "Discover apps, tools, and platforms to manage money and invest wisely.",
    image: finance,
    slug: "finance"
  },
  {
    title: "Technology & Gadgets",
    description: "Explore the latest tech products and software for personal & professional use.",
    image: technology,
    slug: "technology"
  },
  {
    title: "Health & Fitness",
    description: "Get access to wellness apps, fitness tools, and health resources.",
    image: fitness,
    slug: "health"
  },
  {
    title: "Marketing & Business Tools",
    description: "Find digital marketing tools, SaaS, and productivity software to grow business.",
    image: marketing,
    slug: "marketing"
  },
  {
    title: "Entertainment & Gaming",
    description: "Discover streaming services, gaming platforms, and fun tools.",
    image: gaming,
    slug: "entertainment"
  }
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="categories">
      <div className="categoriesContent">
        <h2 className="categoriesTitle">Explore Our Categories</h2>
        <p className="categoriesDesc">Browse the main categories of tools and resources available at Nexverce.</p>
      </div>

      <div className="categoriesGrid">
        {categoriesData.map((category, index) => (
          <div 
            key={index} 
            className="categoryCard"
            onClick={() => handleCategoryClick(category.slug)}
            style={{ cursor: "pointer" }}
          >
            <img className="categoryCardImg" src={category.image} alt={category.title} />
            <h3 className="categoryCardTitle">{category.title}</h3>
            <p className="categoryCardDesc">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
