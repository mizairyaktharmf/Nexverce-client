import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';
import tiktokicon from '../../../src/assets/tiktok.png'
import instagramicon from '../../../src/assets/instagram.png'



const socialLinks = [
  { name: "Tiktok", url: "https://www.tiktok.com/@nexverce", icon: tiktokicon },
  { name: "Instagram", url: "https://www.instagram.com/nexverce", icon: instagramicon },
];

function Footer() {
  const emailRef = useRef(null); // reference to the input

  const handleSubscribe = () => {
    if(emailRef.current) {
      console.log("Subscribed Email:", emailRef.current.value); // optional: log value
      emailRef.current.value = ""; // reset input
    }
  }

  return (
    <section className="footer">
      <div className="footerContent">
        
        {/* Left Box */}
        <div className="footerLeftBox">
          <div className="footerLeftContent">
            <span className="footerLeftContentTitle">Get the Latest Updates</span>
            <input type="text" className="footerLeftContentInput" placeholder='Email' ref={emailRef} />
            <button className="footerLeftContentBtn" onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>

        {/* Right Box */}
        <div className="footerRightBox">
          <div className="footerContentRight">
            <div className="links">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src={link.icon} alt={link.name} className="linkImg test" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation Links */}
          <div style={{
            marginTop: "1.5rem",
            textAlign: "center",
            padding: "0 1rem"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: "1rem"
            }}>
              <Link to="/about-us" style={{ color: "#0077ff", textDecoration: "none", fontSize: "14px" }}>About Us</Link>
              <Link to="/contact" style={{ color: "#0077ff", textDecoration: "none", fontSize: "14px" }}>Contact</Link>
              <Link to="/privacy-policy" style={{ color: "#0077ff", textDecoration: "none", fontSize: "14px" }}>Privacy Policy</Link>
              <a href="mailto:contact@nexverce.com" style={{ color: "#0077ff", textDecoration: "none", fontSize: "14px" }}>contact@nexverce.com</a>
            </div>
          </div>

          <div style={{
          marginTop :"1rem",
          textAlign: "center",
          color: 'black',
          fontSize: "14px",
          padding: "0 1rem"
        }}>
          &copy; 2025 <a href="https://www.nexcodenova.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0077ff", textDecoration: "none" }}>NexCodeNova</a>. All Rights Reserved.
        </div>
        </div>



      </div>
    </section>
  )
}

export default Footer