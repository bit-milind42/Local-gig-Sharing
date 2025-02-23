
import { useEffect, useState } from "react";

const Gigs = () => {
  const [gigs, setGigs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gigs");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("🚀 API Response:", result);

        if (!Array.isArray(result.gigs)) { 
          throw new Error("Invalid data format: Expected an array");
        }

        setGigs(result.gigs);
      } catch (error) {
        console.error("Fetch Gigs Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) return <p className="text-[#A0522D] text-center">Loading gigs...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-6 bg-[#F5F5DC]">
      <h2 className="text-3xl font-bold mb-4 text-[#A0522D]">Available Gigs</h2>
      {gigs.length === 0 ? (
        <p className="text-lg text-[#A0522D]">No gigs available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {gigs.map((gig) => (
            <li key={gig._id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#A0522D]">{gig.title}</h3>
              <p className="text-gray-700">{gig.description}</p>
              <p className="text-green-600 font-bold">Price: ₹{gig.price}</p>
              <p><strong>Location:</strong> {gig.location}</p>
              <p><strong>Type:</strong> {gig.gigType}</p>
              <p><strong>Status:</strong> {gig.status}</p>
              <p><strong>Created By:</strong> {gig.createdBy?.name || "Unknown"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Gigs;
