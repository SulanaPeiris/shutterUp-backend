import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/ClientLayout";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Featured from "./pages/Featured";
import Following from "./pages/Following";
import Learn from "./pages/Learn";
import Academy from "./pages/Academy";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/following" element={<Following />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/academy" element={<Academy />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
