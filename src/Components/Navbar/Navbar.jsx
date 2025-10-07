import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";
import homeLogo from "../../assets/nexvercelogo.png";
import MobileMenuIcon from "../../assets/MobileMenu.png";
import { FaRegHeart } from "react-icons/fa";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleDropdownToggle = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setShowMenu(false);
    }
  };

  return (
    <nav className="navbar">
      {/* ===== Logo ===== */}
      <img src={homeLogo} alt="nexverce home logo" className="homeLogo" />

      {/* ===== Desktop Menu ===== */}
      <ul className="desktopMenu">
        <li><Link to="/">Home</Link></li>

        <li className="dropdown">
          <span>Categories ▾</span>
          <ul className="dropdownMenu">
            {/* Education */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Education & E-Learning ▸</span>
              <ul className="subMenu">
                <li>Online Courses & Platforms</li>
                <li>Skill Development</li>
                <li>Learning Tools</li>
              </ul>
            </li>

            {/* Finance */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Finance & Crypto ▸</span>
              <ul className="subMenu">
                <li>Personal Finance & Investment</li>
                <li>Banking & Payment Solutions</li>
                <li>Crypto & Blockchain</li>
              </ul>
            </li>

            {/* Technology */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Technology & Software ▸</span>
              <ul className="subMenu">
                <li>Gadgets & Smart Devices</li>
                <li>Software & Apps</li>
                <li>AI & Emerging Tech</li>
              </ul>
            </li>

            {/* Business */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Business, Marketing & Personal Dev ▸</span>
              <ul className="subMenu">
                <li>Digital Marketing & Tools</li>
                <li>E-commerce & Online Stores</li>
                <li>Affiliate & Blogging Tools</li>
              </ul>
            </li>

            {/* Lifestyle */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Lifestyle & Health ▸</span>
              <ul className="subMenu">
                <li>Travel & Tourism</li>
                <li>Health, Wellness & Sports</li>
                <li>Art & Design</li>
              </ul>
            </li>

            {/* Entertainment */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Entertainment & Gaming ▸</span>
              <ul className="subMenu">
                <li>Online Streaming & Media</li>
                <li>Games & Esports</li>
                <li>AR/VR Experiences</li>
              </ul>
            </li>
          </ul>
        </li>

        <li><Link to="/about">About</Link></li>

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
            <div className="searchBoxBtn" onClick={handleSearch}>Search</div>
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
          <li><Link to="/" onClick={() => setShowMenu(false)}>Home</Link></li>

          {/* Categories */}
          <li className="dropdown">
            <span>Categories ▾</span>
            <ul className="dropdownMenu">
              {[
                { name: "Education", items: ["Online Courses & Platforms", "Skill Development", "Learning Tools"] },
                { name: "Finance", items: ["Personal Finance & Investment", "Banking & Payment Solutions", "Crypto & Blockchain"] },
                { name: "Technology", items: ["Gadgets & Smart Devices", "Software & Apps", "AI & Emerging Tech"] },
                { name: "Business", items: ["Digital Marketing & Tools", "E-commerce & Online Stores", "Affiliate & Blogging Tools"] },
                { name: "Lifestyle", items: ["Travel & Tourism", "Health, Wellness & Sports", "Art & Design"] },
                { name: "Entertainment", items: ["Online Streaming & Media", "Games & Esports", "AR/VR Experiences"] },
              ].map((cat) => (
                <li key={cat.name} className="dropdownItem">
                  <span
                    className="dropdownItemTitle"
                    onClick={() => handleDropdownToggle(cat.name)}
                  >
                    {cat.name} ▸
                  </span>
                  {activeDropdown === cat.name && (
                    <ul className="subMenu">
                      {cat.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>

          <li><Link to="/about" onClick={() => setShowMenu(false)}>About</Link></li>

          <li>
            <Link to="/" onClick={() => setShowMenu(false)}>
              <FaRegHeart style={{ color: "#3a1a6b", marginRight: "6px" }} /> Wishlist
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
              <button  onClick={handleSearch}>Search</button>
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
