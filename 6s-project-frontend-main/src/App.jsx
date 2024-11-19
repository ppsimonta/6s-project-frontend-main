import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SearchBar from "./components/SearchBar";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";
import AuditPage from "./pages/AuditPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LogoutButton from "./components/LogoutButton";
import VerifyEmail from "./components/VerifyEmail";
import DeleteAccount from "./components/DeleteAccount";
import StatisticPage from "./pages/StatisticsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import AdminPage from "./pages/AdminPage";


axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* <Route path = "/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/stats" element={<StatisticPage />} />
        <Route path="/audit/fill/:roomId" element={<AuditPage />} />
        <Route path="/audit/review/:auditId" element={<AuditPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/profilesettings" element={<ProfileSettingsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
