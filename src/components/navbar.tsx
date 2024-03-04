import { Button, Menu } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;

  const logout = () => {
    localStorage.removeItem("guest_session_id");
    navigate("/auth");
  };

  return (
    <Menu fixed="top" size="huge" style={{ backgroundColor: "#21448f" }}>
      <Menu.Item
        as={Link}
        to="/"
        style={{ fontSize: "1.5rem", color: "#f5f3c6" }}
      >
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/rated" style={{ fontSize: "1.5rem", color: "#f5f3c6" }}>
        Rated
      </Menu.Item>
      <Menu.Menu position="right">
        {isLoggedIn ? (
          <Menu.Item
            as={Button}
            onClick={logout}
            style={{ fontSize: "1.5rem", color: "#f5f3c6" }}
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/auth" style={{ fontSize: "1.5rem", color: "#f5f3c6" }}>
            Auth
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};
