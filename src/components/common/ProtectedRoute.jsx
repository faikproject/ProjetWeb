import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
//CONTEXTS
import { AuthContext } from "../../context/authContext";
function ProtectedRoute({ children }) {
    //HOOKS
    const location = useLocation();
    //CONTEXTS
    const [authState] = useContext(AuthContext);

    if (authState.isLogged) {
        return children;
    } else {
        return <Navigate to="/" replace state={{ from: location }} />;
    }
}

export default ProtectedRoute;