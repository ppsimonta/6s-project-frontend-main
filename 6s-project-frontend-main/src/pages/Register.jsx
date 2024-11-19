import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import background from "../assets/login.jpg"
import FormComponent from "../components/FormComponent";
import FormInputs from "../components/FormInputs";

export default function Register() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        validateForm({ ...formData, [name]: value });
    };

    const validateForm = (data) => {
        // Yksinkertainen validointi: Tarkista, että kaikki kentät ovat täytettyjä ja salasana on tarpeeksi pitkä
        const isValid = Object.values(data).every((value) => value.trim() !== "") && data.password.trim().length > 6;
        setIsFormValid(isValid);
    };
    

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = formData;
        try{
            const {data} = await axios.post('/register', {
                name, email, password
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                toast.success('Register successful')
                navigate('/')
            }
        }
        catch(err){
            console.log(error)
        }
    }
    const inputData = [
        { name: 'name', label: 'Name', value: formData.name, inputType: 'text'},
        { name: 'email', label: 'Email', value: formData.email, inputType: 'email'},
        { name: 'password', label: 'Password', value: formData.password, inputType: 'password' },
    ];

    return (
        <div>
        
        <FormComponent title="Sign In" onSubmit={registerUser} disabled={!isFormValid}>
          <FormInputs inputData={inputData} onInputChange={handleInputChange}/>
        </FormComponent>
      </div>
            
    );
}   