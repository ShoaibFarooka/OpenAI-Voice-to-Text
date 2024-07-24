import AuthWrap from './components/AuthWrap'
import useAuthLogout from '../../hooks/useAuthLogout'

const VerifyRequired = () => {

    // hooks
    const { logout } = useAuthLogout();

    return (
        <AuthWrap>
            <p style={{ textAlign: 'justify' }}>
                Ga naar je e-mailaccount om te verifiëren. Als je al geverifieerd hebt, probeer dan opnieuw in te loggen of de pagina te verversen.
            </p>

            <div className="d-flex justify-content-center">
                <button
                    style={{
                        background: 'white',
                    }}
                    className='info-link mt-0'
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>

        </AuthWrap>
    )
}

export default VerifyRequired