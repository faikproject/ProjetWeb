import React from 'react'
import "../../styles/Home.css"
const HomeTest = () => {
  return (
    <section id="homeSection" className="first-section">
        <div id='home'>
          <div id='citation'>
              <p>“I don’t know anything with certainty, but seeing the stars makes me dream.”</p>
              <h3>Vincent Van Gogh</h3>
          </div>
          <div id='animation'>
              <img src='https://i.pinimg.com/originals/94/81/30/948130e1b398d9b8150275ebe21470cb.gif' alt='anim' />
          </div>
        </div>
    </section>
  )
}

export default HomeTest
