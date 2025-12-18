import React from 'react'

function NexCodeNova() {
  return (
    <section id="nexcodenova">
        <div className="nexcodenova">
          <span className="nexcodenovaTitle animate-up">
            Build dream Projects with <br/> NexCode Nova.
          </span>
          <button 
            className="nexcodenovaexploreBtn animate-fade"
            onClick={() => window.open("https://www.nexcodenova.com", "_blank")}
          >
            Find out here
          </button>
        </div>
      </section>
  )
}

export default NexCodeNova
