// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Gigs = () => {
//     const [gigs, setGigs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchGigs = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/gigs");
//                 setGigs(response.data);
//             } catch (err) {
//                 setError("Failed to fetch gigs");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchGigs();
//     }, []);

//     if (loading) return <p className="text-center text-lg">Loading gigs...</p>;
//     if (error) return <p className="text-center text-red-500">{error}</p>;

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4 text-center">Available Gigs</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {gigs.map((gig) => (
//                     <div key={gig._id} className="bg-white shadow-md p-4 rounded-lg">
//                         <h3 className="text-xl font-semibold">{gig.title}</h3>
//                         <p className="text-gray-700">{gig.description}</p>
//                         <p className="text-sm text-gray-500 mt-2">Pay: {gig.pay}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Gigs;







// import { useEffect, useState } from "react";

// const Gigs = () => {
//   const [gigs, setGigs] = useState([]); // Ensure initial state is an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/gigs");
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           setGigs(data); // Ensure data is an array before setting it
//         } else {
//           throw new Error("Invalid data format");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };


  
//     fetchGigs();
//   }, []);

//   if (loading) return <p>Loading gigs...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Gigs List</h2>
//       {gigs.length === 0 ? (
//         <p>No gigs available.</p>
//       ) : (
//         <ul>
//           {gigs.map((gig) => (
//             <li key={gig._id}>
//               <h3>{gig.title}</h3>
//               <p>{gig.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Gigs;




// import { useEffect, useState } from "react";

// const Gigs = () => {
//   const [gigs, setGigs] = useState([]); // Initial state as an array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/gigs");
//         const data = await response.json();

//         console.log("Fetched gigs:", data); // Debugging log

//         if (Array.isArray(data)) {
//           setGigs(data); // Ensure data is an array
//         } else {
//           throw new Error("Invalid data format: Expected an array");
//         }
//       } catch (error) {
//         console.error("Error fetching gigs:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGigs();
//   }, []); // ✅ Fixed the missing closing bracket

//   if (loading) return <p>Loading gigs...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Gigs List</h2>
//       {gigs.length === 0 ? (
//         <p>No gigs available.</p>
//       ) : (
//         <ul>
//           {gigs.map((gig) => (
//             <li key={gig._id}>
//               <h3>{gig.title}</h3>
//               <p>{gig.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Gigs;






// import { useEffect, useState } from "react";

// const Gigs = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGigs = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/gigs");
//         const result = await response.json();

//         // Fix: Check if the response is an array or inside an object
//         const data = Array.isArray(result) ? result : result.data || [];

//         if (!Array.isArray(data)) {
//           throw new Error("Invalid data format: Expected an array");
//         }

//         setGigs(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGigs();
//   }, []);

//   if (loading) return <p>Loading gigs...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>All Gigs</h2>
//       {gigs.length === 0 ? (
//         <p>No gigs available.</p>
//       ) : (
//         <ul>
//           {gigs.map((gig) => (
//             <li key={gig._id}>
//               <h3>{gig.title}</h3>
//               <p>{gig.description}</p>
//               <p><strong>Price:</strong> ${gig.price}</p>
//               <p><strong>Location:</strong> {gig.location}</p>
//               <p><strong>Created By:</strong> {gig.createdBy}</p>
//               <p><strong>Type:</strong> {gig.gigType}</p>
//               <p><strong>Status:</strong> {gig.status}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Gigs;






import { useEffect, useState } from "react";

const Gigs = () => {
  const [gigs, setGigs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gigs");
        const result = await response.json();

        // Ensure the response is an array
        const data = Array.isArray(result) ? result : [];
        
        if (!Array.isArray(data)) throw new Error("Invalid data format: Expected an array");

        setGigs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) return <p>Loading gigs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gigs List</h2>
      {gigs.length === 0 ? (
        <p>No gigs available.</p>
      ) : (
        <ul>
          {gigs.map((gig) => (
            <li key={gig._id}>
              <h3>{gig.title}</h3>
              <p>{gig.description}</p>
              <p><strong>Price:</strong> ${gig.price}</p>
              <p><strong>Location:</strong> {gig.location}</p>
              <p><strong>Type:</strong> {gig.gigType}</p>
              <p><strong>Status:</strong> {gig.status}</p>
              <p><strong>Created By:</strong> {gig.createdBy}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Gigs;
