import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService"; // Expects full user object response

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.email, data.password); // expects { token, id, role, email }
      login(response); // store in context + session
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-[#1f1f1f] p-8 rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded text-white font-semibold"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
