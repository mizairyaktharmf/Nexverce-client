import React from 'react'
import './HeroSection.css'

function HeroSection() {
  return (
    <section id="intro">
        <div className="introContent">
          <span className="introTitle">Discover. Compare. Buy Smarter <br/> with Nexverce.</span>
          <p className="introDesc">Your all-in-one affiliate hub to explore trusted tools, courses, apps, and services across  <br/> education, finance, tech, health, and more.  <br/>
           Find everything valuable in one place, compare the best offers, and shop smarter with Nexverce. </p>
          <div to="/services" className="exploreSoltn">
                Explore Now
          </div>

          
        </div>
      </section>
  )
}

export default HeroSection