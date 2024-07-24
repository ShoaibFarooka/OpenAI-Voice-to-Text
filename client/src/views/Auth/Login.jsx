import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atomIsAuthenticate, atomToken, atomUser } from '../../configs/states/atomState';
import { setOnLocalStorage } from '../../hooks/helpers';
import { axiosPOST } from '../../hooks/axiosMethods';
import AuthWrap from './components/AuthWrap';
import toast from 'react-hot-toast';

const Login = () => {

    // global
    const navigate = useNavigate();

    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useAtom(atomToken);
    const [isAuthenticate, setIsAuthenticate] = useAtom(atomIsAuthenticate);
    const [user, setUser] = useAtom(atomUser);

    // if token redirect
    useEffect(() => {
        if (isAuthenticate && token && user) {
            navigate('/chat')
        }
    }, [navigate, isAuthenticate, token, user])

    // login action
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // getting data
            const getPOST = await axiosPOST('auth/signin', { email, password }, setLoading);

            console.log(getPOST);

            // if success
            if (getPOST.success) {
                setToken(getPOST.data.accessToken);
                setUser(getPOST.data.user);
                setIsAuthenticate(true);

                setEmail('');
                setPassword('');

                setOnLocalStorage('token', getPOST.data.accessToken);
            }
        } catch (error) {
            setLoading(false);
            toast.error(`${error.response.data.message}`);
        }
    }

    return (
        <AuthWrap authEl>
            <form autoComplete="off" onSubmit={handleLogin}>

                <div className="form-group">
                    <label className="font-weight-bold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="font-weight-bold">Wachtwoord:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-custom btn-block"
                >
                    {loading ? 'Inloggen...' : 'Login'}
                </button>

            </form>
        </AuthWrap>

    )
}

export default Login