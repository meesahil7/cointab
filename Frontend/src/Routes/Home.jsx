import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("login_token"));
  const email = JSON.parse(localStorage.getItem("login_email"));

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    localStorage.removeItem("login_email");
    navigate("/login");
  };

  return (
    <div className="container">
      {token && <h1>Email: {email}</h1>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
