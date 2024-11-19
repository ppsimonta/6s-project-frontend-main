import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import Login from "./Login";
import SearchPage from "./SearchPage";

export default function Home() {    
    const {user} = useContext(UserContext);
    return (
        <>
            {user ? <SearchPage /> : <Login />}
        </>
    );
}