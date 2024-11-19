import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormComponent from "../components/FormComponent";
import FormInputs from "../components/FormInputs";

export default function ForgotPassword() {
    const defaultTheme = createTheme();
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
    });
    
    const handleInputChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };

    const sendPasswordResetEmail = async (e) => {
      e.preventDefault();
      const { email } = formData;
      try {
        const { data } = await axios.post("/forgot-password", {
          email,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Password reset email sent successfully!");
          navigate("/"); // Voit ohjata käyttäjän takaisin kirjautumissivulle tähän
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    const inputData = [
      { name: 'email', label: 'Email', value: formData.email, inputType: 'email'},
    ];

    return (
      <div>
        
        <FormComponent title="Forgot Password?" onSubmit={sendPasswordResetEmail}>
          <FormInputs inputData={inputData} onInputChange={handleInputChange}/>
        </FormComponent>
      </div>
    )
  }