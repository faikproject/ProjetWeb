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
            Marie-therese Docherty
            </h2>
            <p>Scottish artiste</p>
            <p>Pisces sun Scorpio moon Sagittarius rising</p>         
            <p>BA (hons) degree</p>
            <p>Duncan Of Jordanstone College of Art and design Dundee

</p>
            <a href='#'>Email me</a>
        </div>
        <img id='profile-photo' src="https://api-www.louvre.fr/sites/default/files/styles/w844_h1500_c1/public/2021-01/leonard-de-vinci-portrait-de-monna-lisa-dite-la-joconde.jpg"></img>
    </div>
    </>
  )
}

export default Profile