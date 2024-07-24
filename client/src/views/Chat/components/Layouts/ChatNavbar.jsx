import { Link } from "react-router-dom";
import useAuthLogout from "../../../../hooks/useAuthLogout";
import Badge from "react-bootstrap/Badge";
import { useAtom } from "jotai";
import { atomUser } from "../../../../configs/states/atomState";

const ChatNavbar = () => {
  // hooks
  const { logout } = useAuthLogout();
  const [user] = useAtom(atomUser);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ padding: "0.8rem 2rem" }}
      >
        <img
          src="/images/logo_only_blue.png"
          alt="Fysio.AI Logo"
          className="header-logo-navbar"
        />

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/"
                style={{
                  textTransform: "capitalize",
                  position: "relative",
                  top: "-13px",
                }}
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Badge bg="light" text="dark" style={{ marginTop: "8px" }}>
            {`Credits ${user?.usageLimit - user?.timesUsed}`}
          </Badge>
          <button
            className="logout-icon"
            onClick={() => logout()}
            style={{
              background: "rgb(246, 246, 246)",
              position: "relative",
              top: "6px",
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </nav>
    </>
  );
};

export default ChatNavbar;
