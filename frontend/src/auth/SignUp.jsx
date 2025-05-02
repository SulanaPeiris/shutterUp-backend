import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "../services/authService";

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await signupUser(data); // Sends {username, email, password}
      const user = await loginUser(data.email, data.password); // expects full user
      login(user);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-[#1f1f1f] p-8 rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold">Sign Up</h2>

        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            {...register("username")}
            className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700"
            type="text"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            {...register("password")}
            className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700"
            type="password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded text-white font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
