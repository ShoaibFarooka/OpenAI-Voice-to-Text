/* eslint-disable no-unused-vars */
import { useAtom } from 'jotai';
import { atomIsAuthenticate, atomToken, atomUser } from '../configs/states/atomState';
import { removeFromLocalStorage } from './helpers';

const useAuthLogout = () => {

    const [token, setToken] = useAtom(atomToken);
    const [isAuthenticate, setIsAuthenticate] = useAtom(atomIsAuthenticate);
    const [user, setUser] = useAtom(atomUser);

    const logout = () => {
        // atom sates
        setToken('');
        setIsAuthenticate(false);
        setUser(null);

        // remove from storage
        removeFromLocalStorage('token');
    };

    return { logout };
};

export default useAuthLogout;
