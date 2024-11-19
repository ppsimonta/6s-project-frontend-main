import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FormComponent from "./FormComponent";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleVerification = () => {
    // Tee pyyntö backendiin vahvistaaksesi sähköpostin
    axios
      .get(`/verify/${token}`)
      .then((response) => {
        setMessage(response.data.message);
        navigate("/")
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <FormComponent title="Confirm Your Email" onSubmit={handleVerification}>
      
      <div>{message}</div>
    </FormComponent>
  );
};

export default VerifyEmail;