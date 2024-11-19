import React, { useContext } from "react";
import axios from 'axios';
import UpdateUserNameForm from "../components/UpdateUserNameForm";
import DeleteAccount from "../components/DeleteAccount";
import { UserContext } from "../context/userContext";
import { Button, Card, CardContent, Divider, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ProfileSettingsPage() {
  const { user } = useContext(UserContext);

  const [text, setText] = useState("");

  const handleUpdateUserName = async (userId, newName) => {
    try {

      const response = await axios.put(`/update-username/${userId}`, { newName });
      
      console.log(response.data);
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tarkista, että uusi nimi ei ole tyhjä
    if (!text.trim()) {
      alert('Uusi nimi ei voi olla tyhjä');
      return;
    }

    // Kutsu onUpdateUserName prop-funktiota uudella nimellä
    handleUpdateUserName(user.account.id, text);

    // Tyhjennä kenttä
    setText('');
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  }

  return (
    <>
      {!!user && (


<div style={{ padding: 10 }}>
  <Card>
    <CardContent>
      <Typography sx={{ marginBottom: '15px' }} variant="h5">
        Profile Settings
      </Typography>
      <Divider light />
      <div
        style={{
          margin: '20px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: '400px', // Set your desired maximum width
          margin: 'auto', // Center the container
        }}
      >
        <TextField
         style={{marginTop: "2rem", marginBottom: "1rem"}}
         id="outlined-basic"
         label="Name"
         variant="outlined"
         value={text}
         onChange={handleTextChange}
         />
        <Button style={{marginBottom: "1rem"}} variant="contained" onClick={handleSubmit}>
          Change
        </Button>
          <DeleteAccount/>
      </div>
      <Typography
        sx={{ marginTop: '6rem', marginBottom: '15px' }}
        variant="h5"
      >
        Account Details
      </Typography>
      <Divider light />
      <Typography variant="h6">Name: {user.account.name}</Typography>
      <Typography variant="h6">Email: {user.account.email}</Typography>
    </CardContent>
  </Card>
</div>

      )}
    </>
  );
}