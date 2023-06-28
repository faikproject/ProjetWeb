import React from 'react'
import "../../styles/Articles.css"
import Navbar from "../../components/common/Navbar"
import Header from "../../components/common/Header";
function Articles() {
  
  return (
    <>
    <Navbar />
    <div class="content">
      
        <div id='blog-item'>
           <div id='blog-title'>
            <h2>Come and have a good time</h2>
            </div> 
            <div class="blog-content">
                <p>PLONGEZ AU CŒUR DE L'ART</p>

            </div>
        </div>
    </div>
    </>
  )
}

export default Articles