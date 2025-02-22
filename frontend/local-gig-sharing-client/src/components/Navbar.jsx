// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-800 p-4 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1 className="text-xl font-bold">Local Gig Sharing</h1>
//         <div className="space-x-4">
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/gigs" className="hover:underline">Gigs</Link>
//           <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//           <Link to="/login" className="hover:underline">Login</Link>
//           <Link to="/signup" className="hover:underline">Sign Up</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API, { getCurrentUser } from "../api/api";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await getCurrentUser();
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("User not authenticated:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await API.post("/auth/logout");
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <nav className="bg-blue-500 text-white p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo / Home */}
//         <h1 className="text-2xl font-bold">
//           <Link to="/">Local Gig Sharing</Link>
//         </h1>

//         {/* Navigation Links */}
//         <div className="space-x-4">
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/gigs" className="hover:underline">Gigs</Link>
//           {user ? (
//             <>
//               <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//               <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:underline">Login</Link>
//               <Link to="/signup" className="hover:underline">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import axios from "axios";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/auth/me", {
//         withCredentials: true, // Allow cookies to be sent
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.error("User not authenticated:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <nav>
//       {user ? <p>Welcome, {user.name}</p> : <p>Please Login</p>}
//     </nav>
//   );
// };

// export default Navbar;



// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//             setUser(JSON.parse(userData));
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//     };

//     return (
//         <nav className="navbar">
//             <h3>Gig Sharing</h3>
//             <ul>
//                 <li><Link to="/">Home</Link></li>
//                 {user ? (
//                     <>
//                         <li><Link to="/dashboard">Dashboard</Link></li>
//                         <li><span>Welcome, {user.name}</span></li>
//                         <li><button onClick={handleLogout}>Logout</button></li>
//                     </>
//                 ) : (
//                     <>
//                         <li><Link to="/login">Login</Link></li>
//                         <li><Link to="/signup">Signup</Link></li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;





import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/"); // ✅ Redirect to homepage
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold">Local Gig Sharing</Link>

                {/* Navigation Links */}
                <ul className="flex space-x-6 text-white font-medium">
                    <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                    {user ? (
                        <>
                            <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
                            <li className="font-semibold">Welcome, {user.name}</li>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                            <li><Link to="/signup" className="hover:text-gray-300">Signup</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
