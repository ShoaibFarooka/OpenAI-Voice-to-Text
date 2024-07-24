import ChatNavbar from "./ChatNavbar"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../../styles/main_page.css'
import '../../styles/header.css'
import '../../styles/navbar.css'



const ChatDashboardWrap = ({ children }) => {
    return (
        <div style={{ backgroundColor: '#f6f6f6' }}>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" /> */}

            <ChatNavbar />

            {children}
        </div>
    )
}

export default ChatDashboardWrap