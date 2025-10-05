import React, { useState } from 'react';
import "./Navbar.css";
import homeLogo from "../../assets/nexvercelogo.png";
import MobileMenu from "../../assets/MobileMenu.png";

function Navbar() {
  const [showMenue, setShowMenue] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 👈 Added for mobile dropdown toggle

  const handleDropdownToggle = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <nav className="navbar">
      <img 
        src={homeLogo} 
        alt="nexverce home logo" 
        className="homeLogo" 
      />

      {/* ===== Desktop Menu ===== */}
      <ul className="desktopMenu">
        <li>Home</li>

        <li className="dropdown">
          <span>Categories ▾</span>
          <ul className="dropdownMenu">
            {/* 1. Education */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Education & E-Learning ▸</span>
              <ul className="subMenu">
                <li>Online Courses & Platforms</li>
                <li>Skill Development</li>
                <li>Learning Tools</li>
              </ul>
            </li>

            {/* 2. Finance */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Finance & Crypto ▸</span>
              <ul className="subMenu">
                <li>Personal Finance & Investment</li>
                <li>Banking & Payment Solutions</li>
                <li>Crypto & Blockchain</li>
              </ul>
            </li>

            {/* 3. Technology */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Technology & Software ▸</span>
              <ul className="subMenu">
                <li>Gadgets & Smart Devices</li>
                <li>Software & Apps</li>
                <li>AI & Emerging Tech</li>
              </ul>
            </li>

            {/* 4. Business */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Business, Marketing & Personal Dev ▸</span>
              <ul className="subMenu">
                <li>Digital Marketing & Tools</li>
                <li>E-commerce & Online Stores</li>
                <li>Affiliate & Blogging Tools</li>
              </ul>
            </li>

            {/* 5. Lifestyle */}
            <li className="dropdownItem">
              <span className="dropdownItemTitle">Lifestyle & Health ▸</span>
              <ul className="subMenu">
                <li>Travel & Tourism</li>
                <li>Health, Wellness & Sports</li>
                <li>Art & Design</li>
              </ul>
            </li>

            {/* 6. Entertainment */}
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

        <li>About</li>
        <li>Wishlist</li>

        <div className="searchContent">
          <li className="searchBox">
            <input type="text" placeholder="Search..." />
            <div className="searchBoxBtn">Search</div>
          </li>
        </div>

        <div className="authContent">
          <li className="authButtons">
            <button className="loginBtn">Login</button>
            <button className="signupBtn">Sign Up</button>
          </li>
        </div>
      </ul>

      {/* ===== Mobile Menu Icon ===== */}
      <img 
        src={MobileMenu} 
        alt="mobileMenue" 
        className="mobMenue" 
        onClick={() => setShowMenue(!showMenue)} 
      />

      {/* ===== Mobile Menu ===== */}
      {showMenue && (
        <ul className="mobileMenue">
          <li onClick={() => setShowMenue(false)}>Home</li>

          <li className="dropdown">
            <span>Categories ▾</span>
            <ul className="dropdownMenu">
              {/* 1. Education */}
              <li className="dropdownItem">
                <span 
                  className="dropdownItemTitle"
                  onClick={() => handleDropdownToggle("Education")}
                >
                  Education & E-Learning ▸
                </span>
                {activeDropdown === "Education" && (
                  <ul className="subMenu">
                    <li>Online Courses & Platforms</li>
                    <li>Skill Development</li>
                    <li>Learning Tools</li>
                  </ul>
                )}
              </li>

              {/* 2. Finance */}
              <li className="dropdownItem">
                <span 
                  className="dropdownItemTitle"
                  onClick={() => handleDropdownToggle("Finance")}
                >
                  Finance & Crypto ▸
                </span>
                {activeDropdown === "Finance" && (
                  <ul className="subMenu">
                    <li>Personal Finance & Investment</li>
                    <li>Banking & Payment Solutions</li>
                    <li>Crypto & Blockchain</li>
                  </ul>
                )}
              </li>

              {/* 3. Technology */}
              <li className="dropdownItem">
                <span 
                  className="dropdownItemTitle"
                  onClick={() => handleDropdownToggle("Technology")}
                >
                  Technology & Software ▸
                </span>
                {activeDropdown === "Technology" && (
                  <ul className="subMenu">
                    <li>Gadgets & Smart Devices</li>
                    <li>Software & Apps</li>
                    <li>AI & Emerging Tech</li>
                  </ul>
                )}
              </li>

              {/* 4. Business */}
              <li className="dropdownItem">
                <span 
                  className="dropdownItemTitle"
                  onClick={() => handleDropdownToggle("Business")}
                >
                  Business, Marketing & Personal Dev ▸
                </span>
                {activeDropdown === "Business" && (
                  <ul className="subMenu">
                    <li>Digital Marketing & Tools</li>
                    <li>E-commerce & Online Stores</li>
                    <li>Affiliate & Blogging Tools</li>
                  </ul>
                )}
              </li>

              {/* 5. Lifestyle */}
              <li className="dropdownItem">
                <span 
                  className="dropdownItemTitle"
                  onClick={() => handleDropdownToggle("Lifestyle")}
                >
                  Lifestyle & Health ▸
                </span>
                {activeDropdown === "Lifestyle" && (
                  <ul className="subMenu">
                    <li>Travel & Tourism</li>
                    <li>Health, Wellness & Sports</li>
                    <li>Art & Design</li>
                  </ul>
                )}
              </li>

              {/* 6. Entertainment */}
              <li className="dropdownItem">
                <span 
                  className="dropdownItemTitle"
                  onClick={() => handleDropdownToggle("Entertainment")}
                >
                  Entertainment & Gaming ▸
                </span>
                {activeDropdown === "Entertainment" && (
                  <ul className="subMenu">
                    <li>Online Streaming & Media</li>
                    <li>Games & Esports</li>
                    <li>AR/VR Experiences</li>
                  </ul>
                )}
              </li>
            </ul>
          </li>

          <li onClick={() => setShowMenue(false)}>About</li>
          <li onClick={() => setShowMenue(false)}>Wishlist</li>

          <div className="searchContent">
            <li className="searchBox">
              <input type="text" placeholder="Search..." />
              <div className="searchBoxBtn">Search</div>
            </li>
          </div>

          <div className="authContent">
            <li className="authButtons">
              <button className="loginBtn" onClick={() => setShowMenue(false)}>Login</button>
              <button className="signupBtn" onClick={() => setShowMenue(false)}>Sign Up</button>
            </li>
          </div>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
