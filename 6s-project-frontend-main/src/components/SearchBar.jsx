import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useState } from 'react';
import ScannerModal from './ScannerModal';

function SearchBar({ onSearchTextChange, placeholder, showQrIcon = false }) {

  const [showScannerModal, setShowScannerModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText); // Update the state with the new text
    onSearchTextChange(newText); // Use the new text in the callback
  };

  const handleSearch = () => {
    onSearchTextChange(searchText);
  };

  return (
    <>
    <Paper
      component="form"
      sx={{display: 'flex', alignItems: 'center', width: '100%', height: '50px' }}
    >
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        sx={{ ml: 0.5, flex: 1, fontSize: '16px', paddingLeft: '10px' }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search for a room' }}
        value={searchText}
        onChange={handleInputChange} // Add the onChange handler here
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      {showQrIcon ? 
      <>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton 
        color="secondary" 
        sx={{ p: '10px' }} 
        aria-label="QR code"
        onClick={() => setShowScannerModal(true)}>
          <QrCodeIcon />
        </IconButton>
        </>  
      : <></>}
    </Paper>
    <ScannerModal open={showScannerModal} close={() => setShowScannerModal(false)} />
    </>
  );
}

export default SearchBar;