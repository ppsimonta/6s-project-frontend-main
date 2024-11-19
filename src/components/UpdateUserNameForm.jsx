import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import DeleteAccount from './DeleteAccount';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const UpdateUserNameForm = ({ userId, onUpdateUserName }) => {
  const { user } = useContext(UserContext)
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tarkista, että uusi nimi ei ole tyhjä
    if (!newName.trim()) {
      alert('Uusi nimi ei voi olla tyhjä');
      return;
    }

    // Kutsu onUpdateUserName prop-funktiota uudella nimellä
    onUpdateUserName(userId, newName);

    // Tyhjennä kenttä
    setNewName('');
  };
  
  return (
    <div className='w-full flex flex-col  text-gray-700 shadow-none items-center h-auto sm:max-w-full sm:max-h-full md:max-w-full md:max-h-full'>
      <form className='flex flex-col w-72 border border-gray-300 p-10 shadow-xl rounded-lg' onSubmit={handleSubmit}>
        
        <Typography sx={{marginBottom: '25px'}} variant='h6'>
          Update Name
        </Typography>
          {/* <input type="text" value={newName} onChange={handleNameChange} /> */}
        <TextField sx={{marginBottom: '22px'}} size='small' helperText="Please enter new name" id="demo-helper-text-misaligned" label="Name" value={newName} onChange={handleNameChange}/>
        
        <Button sx={{marginBottom: '40px'}} variant='contained' type="submit">update name</Button>
        <DeleteAccount sx={{marginBottom: '12px'}} />
      </form>
    </div>
  );
};

export default UpdateUserNameForm;