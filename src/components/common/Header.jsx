import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/Header.module.css'

const Header = () => {
    //HOOKS
    const navigate = useNavigate();

    const handleClickLogo = () => {
      document.getElementById("homeSection").scrollIntoView({ behavior: "smooth" })
    }

    const handleGoToLogin = useCallback(() => {
         navigate('/login');
    }, [navigate]);

    const handleGoToProfil = useCallback(() => {
      navigate('/profile');
 }, [navigate]);

    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.navContainer}>
            <h1 onClick={handleClickLogo}>MT</h1>
            <nav>
              <ul onClick={handleGoToProfil}>
                <li>
                  <button>About Me</button>
                </li>
              </ul>
              <ul onClick={handleGoToLogin}>
                <li>
                  <button>Login</button>
                </li>
              </ul>
            {/* {navLinks.map(nav => renderNavLink(nav))} */}
          </nav>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header
