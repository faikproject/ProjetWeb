import React from 'react'
import { Link } from 'react-router-dom'

const articles= [
  { id: 1, title: 'Leonardo da Vinci',description:'“Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.”' },
  { id: 2, title: 'Pablo Picasso' ,description:'“Art washes away from the soul the dust of everyday life.”'},
  { id: 3, title: 'Frida Kahlo' ,description:'“I never paint dreams or nightmares. I paint my own reality.”'},
  
];

const News = () => {
  return (
    <section id="newsSection" className="first-section">
        <div className='newsSection-header'><h2>Events</h2></div>
        
        <div className="container grid md:grid-cols-9 md:pl-60  ">
              {articles.map((article) => (
                <div className="article-item md:col-span-3" key={article.id}>
                  <h3 className="article-title font-normal leading-tight md:text-24 md:font-light md:leading-6">{article.title}</h3>
                  <div className="article-discrip text-white md: my-6">
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