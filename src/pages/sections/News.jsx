import React from 'react'
import "../../styles/News.css"
import { Link } from 'react-router-dom'
//import { BsArrowRight } from "react-icons/bs"

const articles= [
  { id: 1, title: 'Leonardo da Vinci',description:'“Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.”' },
  { id: 2, title: 'Pablo Picasso' ,description:'“Art washes away from the soul the dust of everyday life.”'},
  { id: 3, title: 'Frida Kahlo' ,description:'“I never paint dreams or nightmares. I paint my own reality.”'},
  
];

const News = () => {
  return (
    <section id="newsSection" className="first-section">
        <div className='newsSection-header'><h2>Events</h2></div>
        
        <div className="container">
            {articles.map((article) => (
              <div className="article-item" key={article.id}>
                <h3 className="article-title">{article.title}</h3>
                <div className="article-discrip">
                  {article.description}
                </div>
                  <Link to="">-</Link>
                </div>
            ))}
        </div>
        
    </section>
  )
}

export default News