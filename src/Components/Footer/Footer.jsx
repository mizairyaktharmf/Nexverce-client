import React, { useRef } from 'react'
import './Footer.css';
import facebookicon from '../../../src/assets/facebook.png'
import instagramicon from '../../../src/assets/instagram.png'
import linkdinicon from '../../../src/assets/linkdin.png'
import whatsappicon from '../../../src/assets/whatsapp.png'

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/", icon: facebookicon },
  { name: "Instagram", url: "https://www.instagram.com/", icon: instagramicon },
  { name: "Linkdin", url: "https://www.linkedin.com/company/nexcode-nova/", icon: linkdinicon },
  { name: "Whatsapp", url: "https://wa.me/971562393573?text=Hello%20NexCodeNova!", icon: whatsappicon },
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