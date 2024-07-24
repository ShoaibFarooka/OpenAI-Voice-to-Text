import { useNavigate, useParams } from "react-router-dom";
import AuthWrap from "./components/AuthWrap"
import { useEffect, useState } from "react";
import { atomIsAuthenticate, atomToken, atomUser } from "../../configs/states/atomState";
import { useAtom } from "jotai";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { axiosPatch } from '../../hooks/axiosMethods';


const ResetPassowrd = () => {

    // global
    const navigate = useNavigate();
    const { tokenParams } = useParams();

    // states
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token] = useAtom(atomToken);
    const [isAuthenticate] = useAtom(atomIsAuthenticate);
    const [user] = useAtom(atomUser);

    // if token redirect
    useEffect(() => {
        if (isAuthenticate && token && user) {
            navigate('/chat')
        }
    }, [navigate, isAuthenticate, token, user])

    useEffect(() => {
        const decodedToken = jwtDecode(tokenParams);

        if (decodedToken.exp * 1000 > new Date().getTime()) {
            setEmail(decodedToken.email)
        } else {
            setEmail('');
            toast.error('Link expired!')
        }
    }, [tokenParams])

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            // getting data
            const getPOST = await axiosPatch('auth/reset-password', { email, password, confirmPassword }, setLoading);

            // if success
            if (getPOST.success) {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsSuccess(true);
            }
        } catch (error) {
            setLoading(false);
            setIsSuccess(false);
            toast.error(`${error.response.data.message}`);
        }
    }

    return (
        <AuthWrap authEl>
            {isSuccess ? <p style={{ textAlign: 'justify' }}>Wachtwoord succesvol gereset. Je kunt nu inloggen.</p> : <form autoComplete="off" onSubmit={handleResetPassword}>

                <div className="form-group">
                    <label className="font-weight-bold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label className="font-weight-bold">Wachtwoord:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="font-weight-bold">Bevestig Wachtwoord:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-custom btn-block"
                >
                    {loading ? 'Reseting...' : 'Reset Password'}
                </button>

            </form>}
        </AuthWrap>
    )
}

export default ResetPassowrd