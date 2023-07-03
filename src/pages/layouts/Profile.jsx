import React from 'react'
import "../../styles/Profile.css"
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar"
function Profile() {
  return (
    <>
    
       <Navbar />
    <div class="profile">
      
        <div id="profile-body">
            <h2>
            Vincent van Gogh


            </h2>
            <p>Artiste peintre</p>
            <p>Académie royale des beaux-arts d'Anvers</p>         
            <p>Auvers-sur-Oise</p>
            <p>a galerie d'art Goupil</p>
            <a href='#'>Email me</a>
        </div>
        <img id='profile-photo' src="https://download.vikidia.org/vikidia/fr/images/thumb/0/0e/Van_Gogh_-_autoportrait_-_1889.jpg/399px-Van_Gogh_-_autoportrait_-_1889.jpg"></img>
    </div>
    </>
  )
}

export default Profile