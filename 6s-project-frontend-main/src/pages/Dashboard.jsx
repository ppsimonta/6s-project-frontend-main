import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ReviewView from "../components/ReviewView";

export default function Dashboard() {
    const {user} = useContext(UserContext);
    return (
        <div style={{padding: 10}}>
            <h1>Dashboard</h1>
            {user && (<h1>Hi {user.account.name}!</h1>)}
            <ReviewView />
        </div>
    );
}
