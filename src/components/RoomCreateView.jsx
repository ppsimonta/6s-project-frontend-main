import { Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function RoomCreateView() {

    const [location, setLocation] = useState("Location");
    const [room, setRoom] = useState("");
      
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handleRoomInput = (event) => {
    setRoom(event.target.value);
  }

  const handleRoomCreate = async () => {
    try {
        const response = await axios.post(`/room`, {
            name: room,
            location: location,
        });
        console.log(response);
        
      } catch (error) {
        console.log(error);
      }
  }

    return (
        <Paper elevation={3} sx={{ 
            width: "100%", 
            height: "50%", 
            margin: "8px",
            padding: "12px",
            maxHeight: "50vh",
            minHeight: "36vh", 
            }}>
            <div className="flex flex-col items-center">
              <Typography sx={{marginBottom: '6px', marginTop: '12px'}}>Tilan Nimi: </Typography>
              <TextField sx={{marginBottom:'12px'}} size="small" id="outlined-basic" label="Nimi" variant="outlined" onChange={handleRoomInput} />
            </div>
              <div className="flex flex-col items-center">
                <Typography sx={{marginBottom: '6px'}}>Paikkakunta: </Typography>
                <FormControl>
                  <InputLabel id="location-select">Location</InputLabel>
                  <Select
                    labelId="location-select"
                    id="location-select"
                    value={location}
                    label="location-select"
                    onChange={handleLocationChange} 
                    size='small'
                    sx={{ width: 210, height: 40}}
                  >
                    <MenuItem disabled value="Location">Location</MenuItem>
                    <MenuItem value="Kemi">Kemi</MenuItem>
                    <MenuItem value="Rovaniemi">Rovaniemi</MenuItem>
                    <MenuItem value="Tornio">Tornio</MenuItem>
                  </Select>
                  <Button sx={{marginTop: '70px'}} variant="contained" onClick={handleRoomCreate}>Lisää Tila</Button>
                </FormControl>
              </div>
          </Paper>
    )
}

export default RoomCreateView;