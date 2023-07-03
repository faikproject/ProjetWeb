import React from 'react'
import "../../styles/Single_article.css"
function Single_article() {
  
  return (
    <>
    <Navbar />
    <div class="content">
      
        <div className='blog-item py-20 border-t border-b border-gray-300 max-w-70 max-h-70 mx-auto mt-15'>
           <div className='blog-title text-center'>
            <h2>Come and have a good time</h2>
            </div> 
            <div class="blog-content px-20">
                <p>PLONGEZ AU CŒUR DE L'ART</p>

            </div>
        </div>
    </div>
    </>
  )
}

export default Single_article