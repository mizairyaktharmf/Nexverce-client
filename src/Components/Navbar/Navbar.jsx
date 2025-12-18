import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import homeLogo from "../../assets/nexvercelogo.png";
import MobileMenuIcon from "../../assets/MobileMenu.png";
import { FaRegHeart } from "react-icons/fa";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setShowMenu(false);
    }
  };

  // Main categories
  const categories = [
    { name: "Education", slug: "education" },
    { name: "Finance", slug: "finance" },
    { name: "Technology", slug: "technology" },
    { name: "Business", slug: "business" },
    { name: "Lifestyle", slug: "lifestyle" },
    { name: "Entertainment", slug: "entertainment" },
  ];

  return (
    <nav className="navbar">
      {/* ===== Logo ===== */}
      <img src={homeLogo} alt="nexverce home logo" className="homeLogo" />

      {/* ===== Desktop Menu ===== */}
      <ul className="desktopMenu">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Categories dropdown (main only) */}
        <li
            className={`dropdown ${isDropdownOpen ? "active" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Categories ▾</span>
            <ul className="dropdownMenu">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
        </li>

        <li>
          <Link to="/blogs">Blogs</Link>
        </li>

        <li>
          <Link to="/about-us">About</Link>
        </li>

        <li>
          <Link to="/" className="wishlistLink">
            <FaRegHeart style={{ color: "#3a1a6b", marginRight: "6px" }} />
            Wishlist
          </Link>
        </li>

        {/* Search Box */}
        <div className="searchContent">
          <li className="searchBox">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div className="searchBoxBtn" onClick={handleSearch}>
              Search
            </div>
          </li>
        </div>

        {/* Auth Buttons */}
        <div className="authContent">
          <li className="authButtons">
            <button className="loginBtn">Login</button>
            <button className="signupBtn">Sign Up</button>
          </li>
        </div>
      </ul>

      {/* ===== Mobile Menu Icon ===== */}
      <img
        src={MobileMenuIcon}
        alt="mobile menu"
        className="mobMenue"
        onClick={() => setShowMenu(!showMenu)}
      />

      {/* ===== Mobile Menu ===== */}
      {showMenu && (
        <ul className="mobileMenue">
          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              Home
            </Link>
          </li>

          {/* Categories (Main only) */}
          <li className="dropdown">
            <span>Categories ▾</span>
            <ul className="dropdownMenu">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    onClick={() => setShowMenu(false)}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link to="/blogs" onClick={() => setShowMenu(false)}>
              Blogs
            </Link>
          </li>

          <li>
            <Link to="/about-us" onClick={() => setShowMenu(false)}>
              About
            </Link>
          </li>

          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              <FaRegHeart style={{ color: "#3a1a6b", marginRight: "6px" }} />
              Wishlist
            </Link>
          </li>

          {/* Search */}
          <li className="mobSearchContent">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div className="mobSearchbtn">
              <button onClick={handleSearch}>Search</button>
            </div>
          </li>

          {/* Auth Buttons */}
          <div className="mobAuthContent">
            <button onClick={() => setShowMenu(false)}>Login</button>
            <button onClick={() => setShowMenu(false)}>Sign Up</button>
          </div>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
