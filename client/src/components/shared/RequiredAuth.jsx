import { Navigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { atomIsAuthenticate, atomToken, atomUser } from "../../configs/states/atomState";

const RequireAuth = ({ children }) => {

    // globals
    const location = useLocation()

    // atom states
    const [token] = useAtom(atomToken);
    const [isAuthenticate] = useAtom(atomIsAuthenticate);
    const [user] = useAtom(atomUser);
    return (
        isAuthenticate && token && user
            ? children
            : <Navigate to='/login' state={{ from: location.pathname }} replace />
    )
}

export default RequireAuth