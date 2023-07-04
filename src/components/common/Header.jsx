import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Header.css'

//CONTEXTS
import { AuthContext } from '../../context/authContext';
import UseAuth from '../../hooks/useAuth';

const Header = () => {
    //HOOKS
    const navigate = useNavigate();
    const { logout } = UseAuth();

    //CONTEXTS
    const [authState] = useContext(AuthContext);


    const handleClickLogo = () => {
      document.getElementById("homeSection").scrollIntoView({ behavior: "smooth" })
    }

    const handleGoToLogin = useCallback(() => {
         navigate('/login');
    }, [navigate]);

    const handleLogout = useCallback(() => {
      logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGoToProfil = useCallback(() => {
      navigate('/profile');
    }, [navigate]);

    const handleGoToDashboard = useCallback(() => {
      navigate('/dashboard/profil');
    }, [navigate]);

    return (
      <header className={"p-4"}>
        <div className={"container"}>
          <div className={"navContainer"}>
            <h1 onClick={handleClickLogo}>Van Gogh</h1>
            <nav>
              <ul onClick={handleGoToProfil}>
                <li>
                  <button>About Me</button>
                </li>
              </ul>
              {authState.isLogged && authState.me?.isAdmin && (
                <ul onClick={handleGoToDashboard}>
                  <li>
                    <button>Dasbhoard</button>
                  </li>
                </ul>
              )}
              {!authState.isLogged && (
                <ul onClick={handleGoToLogin}>
                  <li>
                    <button>Login</button>
                  </li>
                </ul>
              )}
              {authState.isLogged && (
                <ul onClick={handleLogout}>
                  <li>
                    <button>Log out</button>
                  </li>
                </ul>
              )}
          </nav>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header
