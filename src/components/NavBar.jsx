import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo1_2.png";
import list from "../img/list.png";
import { AuthContext } from "../context/authContext";
import { toast } from "react-hot-toast";

const NavBar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [linksVisible, setLinksVisible] = useState(false);

  const toggleLinks = () => {
    setLinksVisible(!linksVisible);
  };

  const navigate = useNavigate();

  const notify = () => {
    toast.error("You have to log in first to create a blog", {});
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              <span id="login">Login</span>
            </Link>
          )}
          <span className="write">
            {currentUser ? (
              <Link className="link" to="/write">
                <span className="write">Write</span>
              </Link>
            ) : (
              <Link
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  notify(); // Show the toast notification
                }}
                to="/login"
              >
                <span className="write">Write</span>
              </Link>
            )}
          </span>
        </div>
        <div className="list" onClick={toggleLinks}>
          <img src={list} alt="list" />
        </div>
      </div>
      <div className={`links2 ${linksVisible ? "show" : ""}`}>
        <Link className="link" to="/?cat=art" onClick={toggleLinks}>
          <h6>ART</h6>
        </Link>
        <Link className="link" to="/?cat=science" onClick={toggleLinks}>
          <h6>SCIENCE</h6>
        </Link>
        <Link className="link" to="/?cat=technology" onClick={toggleLinks}>
          <h6>TECHNOLOGY</h6>
        </Link>
        <Link className="link" to="/?cat=cinema" onClick={toggleLinks}>
          <h6>CINEMA</h6>
        </Link>
        <Link className="link" to="/?cat=design" onClick={toggleLinks}>
          <h6>DESIGN</h6>
        </Link>
        <Link className="link" to="/?cat=food" onClick={toggleLinks}>
          <h6>FOOD</h6>
        </Link>
        {/* Add other links as needed */}
        <span>{currentUser?.username}</span>
        {currentUser ? (
          <span style={{ cursor: "pointer" }} onClick={logout}>
            <Link className="link" to="/">
              {" "}
              Logout
            </Link>
          </span>
        ) : (
          <Link className="link" to="/login" onClick={toggleLinks}>
            <span>Login</span>
          </Link>
        )}
        <Link className="link" to="/write">
          <span className="write">Write</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
