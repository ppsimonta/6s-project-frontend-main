import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext"; 
import { Button } from "@mui/material";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext); 

  
   
  const anonymizeUser = async () => {
    try {
      await axios.delete(`/delete/${user.account.id}`); // Korvaa :id tarvittavalla käyttäjän ID:llä
      setUser(null);
      navigate('/')
    } catch (error) {
      console.error("Anonymize user error:", error);
    }
  };

  return user ? ( 
    <Button color="error" variant="contained" onClick={anonymizeUser} style={{ cursor: "pointer" }}>
      Delete account
    </Button>
  ) : null;
};

export default DeleteAccount;