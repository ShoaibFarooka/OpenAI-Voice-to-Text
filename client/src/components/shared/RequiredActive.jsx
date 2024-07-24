import { Navigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { atomUser } from "../../configs/states/atomState";

const RequiredActive = ({ children }) => {

    // globals
    const location = useLocation()

    // atom states
    const [user] = useAtom(atomUser);

    return (
        user.isVerified
            ? children
            : <Navigate to='/verify-required' state={{ from: location.pathname }} replace />
    )
}

export default RequiredActive