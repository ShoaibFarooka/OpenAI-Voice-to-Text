import './App.css'
import RequiredActive from './components/shared/RequiredActive';
import RequireAuth from './components/shared/RequiredAuth';
import useAuthCheck from './hooks/useAuthCheck';
import ForgetPassword from './views/Auth/FogetPassswrod';
import Login from './views/Auth/Login';
import ResetPassowrd from './views/Auth/ResetPassowrd';
import Signup from './views/Auth/Signup';
import VerifyAccount from './views/Auth/VerifyAccount';
import VerifyRequired from './views/Auth/verifyRequired';
import ChatDashboard from './views/Chat/ChatDashboard';
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom';

function App() {

  // authentication checking
  const {authenticated: authChecked} = useAuthCheck();

  // states
  // const [token, setToken] = useAtom(atomToken);
  // const [isAuthenticate, setIsAuthenticate] = useAtom(atomIsAuthenticate);
  // const [user, setUser] = useAtom(atomUser);

  // checking authentication
  if (!authChecked) return <div style={{ textAlign: 'center' }}>Checking authentication....</div>


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/chat" element={<RequireAuth>
          <RequiredActive>
            <ChatDashboard />
          </RequiredActive>
        </RequireAuth>}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:tokenParams" element={<ResetPassowrd />} />

        <Route path="/verify-required" element={<RequireAuth>
          <VerifyRequired />
        </RequireAuth>}
        />

        <Route path="/verify/:token" element={<VerifyAccount />} />
      </Routes>
    </>
  )
}

export default App
