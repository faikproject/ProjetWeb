import React, { useContext, useEffect } from 'react';
//LAYOUTS
import ContainerLayout from './layouts/Container';
//CONTEXTS
import { AuthContext } from '../context/authContext';

function Profile() {
    //CONTEXTS
    const [authState] = useContext(AuthContext);

    useEffect(() => {
      console.log(authState.me)
    }, [authState.me])

    return (
      <>
          <ContainerLayout>
            <div className="profile flex flex-col justify-between py-20 border-t border-b border-gray-300 items-start max-w-70 max-h-70 mx-auto mt-15 md:flex-row">
                <div className="max-w-1/2 flex flex-col items-center m-auto md:items-start">
                    <h2 className='text-2xl subpixel-antialiased font-bold m-4'>
                    Vincent van Gogh
                    </h2>
                    <p className='whitespace-pre-line m-4' >Artiste peintre
                    Académie royale des beaux-arts d'Anver        
                    Auvers-sur-Ois
                    Galerie d'art Goupil</p>
                    <a href='/email'className='hover:underline m-4' >Email me</a>
                </div>
                <img className='m-auto' alt='' src="https://download.vikidia.org/vikidia/fr/images/thumb/0/0e/Van_Gogh_-_autoportrait_-_1889.jpg/399px-Van_Gogh_-_autoportrait_-_1889.jpg"></img>
            </div>
          </ContainerLayout>
      </>
    )
}

export default Profile