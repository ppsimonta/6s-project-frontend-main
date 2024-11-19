import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchBar from '../components/SearchBar';
import ListView from '../components/ListView';
import { Box, FormControl, InputLabel, Typography } from '@mui/material';
import { useState } from 'react';
import { Card, MenuItem, Select } from '@mui/material';
function SearchPage() {

  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState("Location");

  // Callback function to receive the search text from SearchBar
  const handleSearchTextChange = (newText) => {
    setSearchText(newText);
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className='p-2.5'>
      <div className='w-full z-10 sticky top-2.5 pb-5'>
        <SearchBar onSearchTextChange={handleSearchTextChange} placeholder='Begin typing to search...' showQrIcon={true} />
        <div className='mt-2.5 bg-white'>
        <FormControl fullWidth>
        <InputLabel id="location-select">Location</InputLabel>
          <Select
            fullWidth
            labelId="location-select"
            id="location-select"
            value={location}
            label="Location"
            onChange={handleChange} 
            size='small'
          >
              <MenuItem disabled value="Location">Location</MenuItem>
              <MenuItem value="Kemi">Kemi</MenuItem>
              <MenuItem value="Rovaniemi">Rovaniemi</MenuItem>
              <MenuItem value="Tornio">Tornio</MenuItem>
            </Select>
          </FormControl>
          </div>
      </div>
      
      <div className='mt-2.5'>
        <ListView searchString={searchText} location={location}/>
      </div>
    </div>
  )
}

export default SearchPage;
