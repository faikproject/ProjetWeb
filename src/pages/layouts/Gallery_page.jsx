import React from 'react'
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar"
const images = [
    { id: 1, src: 'https://images.pexels.com/photos/17367747/pexels-photo-17367747.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', title: 'Image 1',description:'descrip' },
    { id: 2, src: 'https://images.pexels.com/photos/13093182/pexels-photo-13093182.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', title: 'Image 2' ,description:'descrip'},
    { id: 3, src: 'https://images.pexels.com/photos/17315978/pexels-photo-17315978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', title: 'Image 3' ,description:'descrip'},
    { id: 4, src: 'https://images.unsplash.com/photo-1685648043756-124a4adad0ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1600&q=60', title: 'Image 3' ,description:'descrip'},
    { id: 5, src: 'https://images.unsplash.com/photo-1687418850094-8b99dd963da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80', title: 'Image 3' ,description:'descrip'},
     
    // Add more image objects as needed
  ];
function Profile() {
  return (
    <>
        <Header />
        <div className="gallery_page bg-black grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-4">
            {images.map((image) => (
                <div className="gallery_page-item relative overflow-hidden m-2" key={image.id}>
                <img src={image.src} alt={image.title} className="image w-full h-auto transform transition duration-300 ease hover:scale-110" />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 transition duration-300 ease hover:opacity-100">
                    <span className="text-white text-2xl font-bold text-center">{image.title}</span>
                    <span className="image-description text-white text-base text-center">{image.description}</span>
                </div>
                </div>
            ))}
    </div>
    
    </>
  )
}

export default Profile