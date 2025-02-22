// import { useState } from "react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("Login with:", email, password);
// //   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Attempting to login with:", email, password);
 
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//        method: "POST",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify({ email, password }),
//     });
 
//     const data = await response.json();
//     console.log("API Response:", data);
//  };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <form className="bg-white shadow-md p-6 rounded-lg w-96" onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="w-full bg-blue-600 text-black p-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;









// import { useState } from "react";
// import { loginUser } from "../api/api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await loginUser(formData);
//       navigate("/dashboard"); // Redirect after login
//     } catch (error) {
//       console.error("Login error:", error.response.data);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form className="bg-white p-6 shadow-lg rounded-md" onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold mb-4">Login</h2>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 w-full mb-3" />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 w-full mb-3" />
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;






// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <button type="submit" className="btn">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




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
                localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user info
                
                setMessage("Logged in successfully! Redirecting...");
                
                setTimeout(() => {
                    navigate("/dashboard");  // ✅ Redirect after success
                }, 2000); 
            } else {
                setError("Invalid login response. Try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
