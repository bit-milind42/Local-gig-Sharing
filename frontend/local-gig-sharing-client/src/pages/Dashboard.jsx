

// import React, { useState, useEffect } from "react";

// const initialGigState = {
//   title: "",
//   description: "",
//   price: "",
//   location: "",
//   createdBy: "67b9ba21ba2bb877dd0d67c3", // Replace with actual user ID
//   gigType: "",
//   status: "Pending",
// };

// const Dashboard = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [newGig, setNewGig] = useState(initialGigState);

//   useEffect(() => {
//     fetchGigs();
//   }, []);

  

//   const fetchGigs = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/gigs");
  
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }
  
//       const data = await response.json();
  
//       if (!data.success || !Array.isArray(data.gigs)) {
//         throw new Error("Invalid response format from server.");
//       }
  
//       setGigs(data.gigs);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message || "Failed to fetch gigs");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Sending gig data:", newGig);

//       const response = await fetch("http://localhost:5000/api/gigs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newGig),
//       });

//       const responseData = await response.json();
//       console.log("Server response:", responseData);

//       if (!response.ok) throw new Error(responseData.error || "Failed to create gig");
      
//       setGigs([...gigs, responseData]);
//       setNewGig(initialGigState);
//       setShowForm(false);
//     } catch (err) {
//       console.error("Error details:", err);
//       setError(err.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewGig(prev => ({ ...prev, [name]: value }));
//   };

//   if (loading) return <div className="text-center text-[#A0522D] text-xl p-8">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-start p-6 bg-[#F5F5DC]">
//       <div className="w-full max-w-screen-xl">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-[#A0522D]">Gigs Dashboard</h1>
//           <button 
//             onClick={() => setShowForm(true)}
//             className="bg-[#E2725B] text-white px-4 py-2 rounded hover:bg-[#A0522D] transition"
//           >
//             Create Gig
//           </button>
//         </div>

//         {/* Modal for creating new gig */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-[#A0522D]">Create New Gig</h2>
//                 <button onClick={() => setShowForm(false)} className="text-gray-600 hover:text-gray-800">✕</button>
//               </div>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={newGig.title}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Description</label>
//                   <textarea
//                     name="description"
//                     value={newGig.description}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     rows="3"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Price</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={newGig.price}
//                     onChange={(e) => setNewGig(prev => ({
//                       ...prev,
//                       price: Number(e.target.value)
//                     }))}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={newGig.location}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">Type</label>
//                   <select
//                     name="gigType"
//                     value={newGig.gigType}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   >
//                     <option value="">Select type</option>
//                     <option value="Remote">Remote</option>
//                     <option value="On-site">On-site</option>
//                   </select>
//                 </div>

//                 <div className="flex justify-end gap-2 pt-4">
//                   <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
//                   <button type="submit" className="px-4 py-2 bg-[#E2725B] text-white rounded hover:bg-[#A0522D] transition">Create</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Gigs Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {gigs.map((gig) => (
//             <div key={gig._id} className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
//               <h3 className="text-xl font-semibold text-[#A0522D]">{gig.title}</h3>
//               <p className="text-gray-700">{gig.description}</p>
//               <div className="grid grid-cols-2 gap-2 text-sm">
//                 <div className="text-gray-600">Price: ${gig.price}</div>
//                 <div className="text-gray-600">Location: {gig.location}</div>
//                 <div className="text-gray-600">Type: {gig.gigType}</div>
//                 <div className="text-gray-600">Status: {gig.status}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;








import React, { useState, useEffect } from "react";

const initialGigState = {
  title: "",
  description: "",
  price: "",
  location: "",
  createdBy: "67b9ba21ba2bb877dd0d67c3", // Replace with actual user ID
  gigType: "",
  status: "Pending",
};

const Dashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editGigId, setEditGigId] = useState(null);
  const [newGig, setNewGig] = useState(initialGigState);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gigs");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !Array.isArray(data.gigs)) {
        throw new Error("Invalid response format from server.");
      }

      setGigs(data.gigs);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch gigs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending gig data:", newGig);

      const response = await fetch(
        isEditing
          ? `http://localhost:5000/api/gigs/${editGigId}`
          : "http://localhost:5000/api/gigs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGig),
        }
      );

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (!response.ok) throw new Error(responseData.error || "Failed to save gig");

      if (isEditing) {
        setGigs(gigs.map((gig) => (gig._id === editGigId ? responseData : gig)));
      } else {
        setGigs([...gigs, responseData]);
      }

      setNewGig(initialGigState);
      setShowForm(false);
      setIsEditing(false);
      setEditGigId(null);
    } catch (err) {
      console.error("Error details:", err);
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGig((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (gig) => {
    setNewGig(gig);
    setShowForm(true);
    setIsEditing(true);
    setEditGigId(gig._id);
  };

  const handleDelete = async (gigId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/gigs/${gigId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete gig");

      setGigs(gigs.filter((gig) => gig._id !== gigId));
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-[#A0522D] text-xl p-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-6 bg-[#F5F5DC]">
      <div className="w-full max-w-screen-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#A0522D]">Gigs Dashboard</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setNewGig(initialGigState);
            }}
            className="bg-[#E2725B] text-white px-4 py-2 rounded hover:bg-[#A0522D] transition"
          >
            {isEditing ? "Edit Gig" : "Create Gig"}
          </button>
        </div>

        {/* Modal for creating/updating gig */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#A0522D]">
                  {isEditing ? "Edit Gig" : "Create New Gig"}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-600 hover:text-gray-800">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newGig.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newGig.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newGig.price}
                    onChange={(e) => setNewGig((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newGig.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="gigType"
                    value={newGig.gigType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#E2725B] text-white rounded hover:bg-[#A0522D] transition">
                    {isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div key={gig._id} className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#A0522D]">{gig.title}</h3>
              <p className="text-gray-700">{gig.description}</p>
              <button onClick={() => handleEdit(gig)} className="text-blue-600 mr-2">
                ✎ Edit
              </button>
              <button onClick={() => handleDelete(gig._id)} className="text-red-600">
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;















