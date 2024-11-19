import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormComponent from "../components/FormComponent";
import FormInputs from "../components/FormInputs";
import { useUserContext } from "../context/userContext";
import { link } from "d3";

export default function Login() {
  const {user, setUser} = useUserContext()
  const defaultTheme = createTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    // Yksinkertainen validointi: Tarkista, että email ja password eivät ole tyhjiä
    const isValid = Object.values(data).every((value) => value.trim() !== "");
    setIsFormValid(isValid);
  };

  const navigate = useNavigate();
  

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const inputData = [
    { name: 'email', label: 'Email', value: formData.email, inputType: 'email'},
    { name: 'password', label: 'Password', value: formData.password, inputType: 'password' },
  ];

    return (
      <>
        <div>
          
          <FormComponent title="Login" onSubmit={loginUser} register forgotPassword disabled={!isFormValid}>
            <FormInputs inputData={inputData} onInputChange={handleInputChange}/>
            
          </FormComponent>
          
        </div>
      </>
    );
  }
