



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:5000/api/auth/signup", formData);
            navigate("/login"); 
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5DC]">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-[#A0522D] mb-4 text-center">Signup</h2>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        onChange={handleChange} 
                        required
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#E2725B]"
                    />
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
                        Signup
                    </button>
                </form>
                
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <a href="/login" className="text-[#A0522D] font-bold hover:text-[#E2725B]">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
