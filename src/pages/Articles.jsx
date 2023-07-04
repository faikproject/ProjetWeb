import React from 'react'
import Navbar from "../components/common/Navbar"
//import Header from "../../components/common/Header";
import { Link } from 'react-router-dom'


const articles= [
  { id: 1, title: 'Leonardo da Vinci',description:'“Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.”' },
  { id: 2, title: 'Pablo Picasso' ,description:'“Art washes away from the soul the dust of everyday life.”'},
  { id: 3, title: 'Frida Kahlo' ,description:'“I never paint dreams or nightmares. I paint my own reality.”'},
  
];

function Articles() {
  
  return (
    <>
    <Navbar />
        <div className='article_container flex flex-col'>
        <div className='title text-7xl m-8'>
          <h2>Events</h2>
          </div>
          <div className="article_content flex flex-col mx-12 md:mx-44">
            {articles.map((article) => (
              <div className="article_item  max-w-3xl m-8" key={article.id}>
                <h3 className="article_title mt-6  text-2xl font-semibold md:text-4xl">{article.title}</h3>
                <div className="article_despription">
                  {article.description}
                </div>
                <Link className='read_more' to="">Read more</Link>
              </div>
            ))}
        </div>
        </div>
    </>
  )
}

export default Articles