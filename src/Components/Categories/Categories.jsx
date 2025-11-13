import React from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

// ✅ Local category images
import education from "../../../src/assets/education.png";
import finance from "../../../src/assets/finance.png";
import fitness from "../../../src/assets/fitness.png";
import gaming from "../../../src/assets/gaming.png";
import marketing from "../../../src/assets/marketing.png";
import technology from "../../../src/assets/technology.png";

// ✅ Category data (matches exactly what’s saved in MongoDB from admin panel)
const categoriesData = [
  {
    title: "Education & E-Learning",
    value: "Education",
    description:
      "Find top courses, learning platforms, and tools to boost your knowledge.",
    image: education,
    slug: "education",
  },
  {
    title: "Finance & Investment",
    value: "Finance",
    description:
      "Discover apps, tools, and platforms to manage money and invest wisely.",
    image: finance,
    slug: "finance",
  },
  {
    title: "Technology & Gadgets",
    value: "Technology",
    description:
      "Explore the latest tech products and software for personal & professional use.",
    image: technology,
    slug: "technology",
  },
  {
    title: "Health & Fitness",
    value: "Health",
    description:
      "Get access to wellness apps, fitness tools, and health resources.",
    image: fitness,
    slug: "health",
  },
  {
    title: "Marketing & Business",
    value: "Marketing",
    description:
      "Find digital marketing tools, SaaS, and productivity software to grow your business.",
    image: marketing,
    slug: "marketing",
  },
  {
    title: "Entertainment & Gaming",
    value: "Lifestyle",
    description:
      "Discover streaming services, gaming platforms, and entertainment tools.",
    image: gaming,
    slug: "lifestyle", 
  },
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
        <p className="categoriesDesc">
          Browse the main categories of tools and resources available at{" "}
          <strong>Nexverce</strong>.
        </p>
      </div>

      <div className="categoriesGrid">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="categoryCard"
            onClick={() => handleCategoryClick(category.slug)}
            style={{ cursor: "pointer" }}
          >
            <img
              className="categoryCardImg"
              src={category.image}
              alt={category.title}
              loading="lazy"
            />
            <h3 className="categoryCardTitle">{category.title}</h3>
            <p className="categoryCardDesc">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
