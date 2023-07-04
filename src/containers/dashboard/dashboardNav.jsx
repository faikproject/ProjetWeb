import './dashboardNav.css';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function DashboardNav() {
    const location = useLocation();

    return (
        <div className="dashboardNav">
            <ul>
                <li className="dashboardNav_head">Dashboard</li>
                <li
                    className={`dashboardNav_link ${
                        location.pathname === '/dashboard/profil' && 'active'
                    }`}
                >
                    <Link to="/dashboard/profil">Profile</Link>
                </li>
                <li
                    className={`dashboardNav_link ${
                        location.pathname.includes('/dashboard/news') && 'active'
                    }`}
                >
                    <Link to="/dashboard/news">News</Link>
                </li>
                <li
                    className={`dashboardNav_link ${
                        location.pathname === '/dashboard/gallery' && 'active'
                    }`}
                >
                    <Link to="/dashboard/gallery">Gallery</Link>
                </li>
                <li
                    className={`dashboardNav_link ${
                        location.pathname.includes('/dashboard/account') && 'active'
                    }`}
                >
                    <Link to="/dashboard/account">Paramètres</Link>
                </li>
            </ul>
        </div>
    );
}

export default DashboardNav;