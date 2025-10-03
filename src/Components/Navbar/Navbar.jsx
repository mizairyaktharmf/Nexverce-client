import React from 'react';
import "./Navbar.css";
import homeLogo from "../../assets/nexvercelogo.png";


function Navbar() {
  return (
    <nav className="navbar">
      <img src={homeLogo} alt="nexverce home logo" className="homeLogo" />

      {/* Desktop Menu */}
      <ul className="desktopMenu">
        {/* Home */}
        <li>Home</li>

        <li className="dropdown"> <span>Categories ▾</span>
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
    </nav>
  );
}

export default Navbar;
