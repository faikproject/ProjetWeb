import React from 'react'
import Navbar from '../../components/common/Navbar'
function article() {
  
  return (
    <>
    <Navbar />
    <div className="content">
      
        <div className='blog-item py-20 border-t border-b border-gray-300 max-w-70 max-h-70 mx-auto mt-15'>
           <div className='blog-title text-center'>
            <h2>Come and have a good time</h2>
            </div> 
            <div className="blog-content px-20">
                <p>PLONGEZ AU CŒUR DE L'ART</p>

            </div>
        </div>
    </div>
    </>
  )
}

export default article;