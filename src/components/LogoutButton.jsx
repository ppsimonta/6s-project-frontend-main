import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"; 

const LogoutButton = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext); 

  const logoutUser = async () => {
    try {
      await axios.post("/logout"); 
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return user ? ( 
    <button onClick={logoutUser} style={{ cursor: "pointer" }}>
      Logout
    </button>
  ) : null;
};

export default LogoutButton;