import React from 'react';
import styles from '../../styles/Header.module.css'

const Header = () => {
   
  const navLinks = ["About Me", "Login"];
  const handleClickLogo = () => {
    document.getElementById("homeSection").scrollIntoView({ behavior: "smooth" })
  }

  const renderNavLink = (content) => {
    

    return (
      <ul key={content}>
        <li>
          <button>{content}</button>
        </li>
      </ul>
    )
  }
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <h1 onClick={handleClickLogo}>MT</h1>
            <nav>
            {navLinks.map(nav => renderNavLink(nav))}
          </nav>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header
