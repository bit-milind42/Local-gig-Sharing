

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            
            if (res.data.token && res.data.user) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                // ✅ Force navbar to update immediately
                window.dispatchEvent(new Event("storage"));

                setMessage("Logged in successfully! Redirecting...");
                setTimeout(() => {
                    navigate("/dashboard");  
                }, 1000); 
            } else {
                setError("Invalid login response. Try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5DC]">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#A0522D] mb-4 text-center">Login</h2>
                
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        required
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        required
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#E2725B]"
                    />
                    <button type="submit" className="w-full bg-[#E2725B] text-white py-3 rounded-md hover:bg-[#A0522D] transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
