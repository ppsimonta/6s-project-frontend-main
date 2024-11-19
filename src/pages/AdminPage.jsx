import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Dashboard from "./Dashboard";
import ReviewView from "../components/ReviewView";
import FormComponent from "../components/FormComponent";
import RoomCreateView from "../components/RoomCreateView";

export default function AdminPage() {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);

  const handleSearchTextChange = (newText) => {
    setSearchText(newText);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("/user");
        setUserData(data);
        const newData = data.sort((a, b) => {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        setUserData(newData);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.put(`/update-role/${userId}`, { newRole });
      // Update the user's role directly in the state
      setUserData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                role: newRole,
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/delete-user/${userId}`);
      // Remove the deleted user from the state
      setUserData((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-1/2 p-1">
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            maxHeight: "50vh",
            minHeight: "50vh",
            margin: "10px",
            padding: "12px",
            overflowY: "scroll",
          }}
        >
          <Typography component="div" sx={{ fontSize: "20px", fontWeight: 500, borderBottom: "solid 1px rgb(215 215 215)", paddingX: "12px", paddingY: "6px" }}>
            Users
          </Typography>
          <div className="mb-7 mt-3">
            <SearchBar onSearchTextChange={handleSearchTextChange} placeholder="Search by name" />
          </div>
          {userData.map((user) => {
            if (!searchText || user.name.toUpperCase().includes(searchText.toUpperCase().trim())) {
              if (user.name == "Anonymous") {
                return null;
              }
              return (
                <Accordion key={user.id} sx={{ borderRadius: "5px", borderTopLeftRadius: "0px", borderTopRightRadius: "0px", marginBottom: "12px", fontWeight: 20 }}>
                  <AccordionSummary
                    sx={{ borderRadius: "5px" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${user.id}-content`}
                    id={`panel-${user.id}-header`}
                  >
                    <Typography component="div" sx={{ fontWeight: 500, textTransform: "capitalize", fontSize: "20px" }}>
                      {user.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography component="div" sx={{ fontWeight: 20 }}>
                      <div className="flex row">
                        <div className="font-extrabold mr-2">Email:</div>
                        <div className="font-medium">{user.email}</div>
                      </div>
                    </Typography>
                    <Typography component="div">
                      <div className="flex row">
                        <div className="font-extrabold mr-2">Role:</div>
                        <div className="font-medium">{user.role}</div>
                      </div>
                    </Typography>
                    <div className="flex row justify-end items-end gap-5">
                      <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id={`role-label-${user.id}`}>Role</InputLabel>
                        <Select
                          labelId={`role-label-${user.id}`}
                          id={`role-select-${user.id}`}
                          value={user.role}
                          label="Role"
                          onChange={(e) => handleChangeRole(user.id, e.target.value)}
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="operator">Operator</MenuItem>
                        </Select>
                      </FormControl>
                      <Button variant="contained" sx={{ backgroundColor: "rgb(168 55 55)" }} onClick={() => handleDeleteUser(user.id)}>
                        Delete User
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            }
          })}
        </Paper>
        </div>
        <div className="w-1/2 p-1">
          <Paper elevation={3} sx={{ 
            width: "98%", 
            height: "50%", 
            margin: "10px", 
            padding: "10px", 
            overflowY: "scroll",
            maxHeight: "50vh",
            minHeight: "50vh", 
            }}>
            <ReviewView />
          </Paper>
        </div>
        {/* Start of Add Room form */}
        <div className=" w-full flex flex-col text-gray-700 shadow-none items-center justify-center content-center h-auto  p-2">
          <RoomCreateView />
        </div>
      </div>
    </>
  );
}