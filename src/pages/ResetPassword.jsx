import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormComponent from "../components/FormComponent";
import FormInputs from "../components/FormInputs";
import { useEffect } from "react";

export default function ResetPassword() {
  
    const [formData, setFormData] = useState(
      {
        password: "",
        confirmPassword: "",
      },
    )
    
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (name, value) => {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
      validateForm({ ...formData, [name]: value });
    };

    const validateForm = () => {
      const isValid = formData.confirmPassword === formData.password && formData.password.length > 3;
      setIsFormValid(isValid);
    };

    useEffect(() => {
      validateForm();
    }, [formData]);

    const navigate = useNavigate();
    const { id, token } = useParams();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`/reset-password/${id}/${token}`, { password: formData.password })
        .then((res) => {
            if(res.data.Status === "Success")
            toast.success('Password reseted successfully')
            
            navigate("/");
        }).catch(err => console.log(err));
    };
  
    const inputData = [
      { name: 'password', label: 'New Password', value: formData.password, inputType: 'password' },
      { name: 'confirmPassword', label: 'Confirm Password', value: formData.confirmPassword, inputType: 'password' },
    ];

    return (
      <div>
        <FormComponent title="Reset Password" onSubmit={handleSubmit} disabled={!isFormValid}>
          <FormInputs inputData={inputData}  onInputChange={handleInputChange}/>
        </FormComponent>
      </div>
    );
  }