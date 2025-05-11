import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to ShutterUp 📸</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 border rounded">Login</Link>
        <Link to="/signup" className="px-4 py-2 border rounded">Sign Up</Link>
      </div>
    </div>
  );
};

export default Landing;
