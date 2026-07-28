import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIncident from "./pages/ReportIncident";
import MyReports from "./pages/MyReports";
import IncidentDetails from "./pages/IncidentDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminIncidents from "./pages/AdminIncidents";
import AdminMap from "./pages/AdminMap";
import ResponderDashboard from "./pages/ResponderDashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report" element={<ReportIncident />} />
      <Route path="/my-reports" element={<MyReports />} />
      <Route path="/incident/:id" element={<IncidentDetails />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/incidents" element={<AdminIncidents />} />
      <Route path="/admin/map" element={<AdminMap />} />
      <Route path="/responder" element={<ResponderDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;