import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { atomIsAuthenticate, atomToken, atomUser } from '../../configs/states/atomState';
import { axiosPOST } from '../../hooks/axiosMethods';
import AuthWrap from './components/AuthWrap';
import toast from 'react-hot-toast';

const SignUp = () => {

    // global
    const navigate = useNavigate();

    // states
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
    const [token] = useAtom(atomToken);
    const [isAuthenticate] = useAtom(atomIsAuthenticate);
    const [user] = useAtom(atomUser);

    // if token redirect
    useEffect(() => {
        if (isAuthenticate && token && user) {
            navigate('/chat')
        }
    }, [navigate, isAuthenticate, token, user])

    // signup action
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!companyName || !email || !password || !confirmPassword) {
            toast.error('All fields are required!')
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Password not matched!')
            return;
        }

        try {
            // getting data
            const getPOST = await axiosPOST('auth/signup', { companyName, email, password }, setLoading);

            // if success
            if (getPOST.success) {
                setCompanyName('');
                setPassword('');
                setConfirmPassword('');
                setEmail('');
                setIsSuccess(true);
                toast.success(getPOST.message)
            }

        } catch (error) {
            setLoading(false);
            setIsSuccess(false);
            toast.error(`${error.response.data.message}`);
        }
    }

    return (
        <AuthWrap authEl>

            {isSuccess ? <p style={{ textAlign: 'justify' }}>Bekijk je e-mail om je account te verifiëren.</p> : <form autoComplete="off" onSubmit={handleSignup}>

                <div className="form-group">
                    <label className="font-weight-bold">Bedrijf:</label>
                    <input
                        type="text"
                        name="setCompanyName"
                        className="form-control"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="font-weight-bold">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={email}
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
                    {loading ? 'Aanmelden...' : 'Aanmelden'}
                </button>

            </form>}

        </AuthWrap>

    )
}

export default SignUp