import { Link, useLocation } from 'react-router-dom'
import '../styles/login.css'

const AuthWrap = ({ children, authEl }) => {

    const location = useLocation();

    return (
        <>

            {/* Include the Bootstrap CSS link directly in the component */}
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" />

            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-lg-4 col-md-6 col-sm-8">


                        <div className="text-center mb-4">
                            <img src="/images/fysio_ai_logo2.png" alt="Fysio.AI Logo" className="logo" />
                        </div>

                        <div className="card shadow-lg">

                            {authEl && <div className='d-flex'>
                                <Link
                                    to='/login'
                                    style={{ width: '50%', borderBottom: location.pathname === '/login' ? '2px solid #00113f' : '2px solid #edf2f7', textDecoration: 'none' }} className='text-center pt-3'
                                >
                                    <p
                                        style={{ color: location.pathname === '/login' ? '#00113f' : '#666' }}
                                    >
                                        Login
                                    </p>
                                </Link>

                                <Link
                                    to='/signup'
                                    style={{ width: '50%', borderBottom: location.pathname === '/signup' ? '2px solid #00113f' : '2px solid #edf2f7', textDecoration: 'none' }}
                                    className='text-center pt-3'
                                >
                                    <p
                                        style={{ color: location.pathname === '/signup' ? '#00113f' : '#666' }}
                                    >
                                        Aanmelden
                                    </p>
                                </Link>
                            </div>}

                            <div className="card-body">

                                {children}

                            {(location.pathname !== '/reset-password' && authEl) && <div className='d-flex align-items-center justify-content-center mt-3'>
                                    <p className='mb-0 me-1'>Wachtwoord vergeten?</p>
                                    <Link
                                        to="/reset-password"
                                        className="info-link mt-0"
                                        style={{ position: 'relative', top: '-1px' }}
                                    >Reset het hier</Link>
                                </div>}



                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthWrap