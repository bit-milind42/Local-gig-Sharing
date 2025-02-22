

//   const handleCreateGig = async (e) => {
//     e.preventDefault();
  
//     try {
//       console.log("Creating gig with data:", newGig); // Debugging log
  
//       const response = await fetch("http://localhost:5000/api/gigs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newGig),
//       });
  
//       const responseData = await response.json();
//       console.log("API Response:", responseData); // Log API response
  
//       if (!response.ok) {
//         throw new Error(responseData.error || "Failed to create gig");
//       }
  
//       setGigs([...gigs, responseData]); // Update state with new gig
//       setShowForm(false); // Close form modal
//       setNewGig({
//         title: "",
//         description: "",
//         price: "",
//         location: "",
//         createdBy: "",
//         gigType: "",
//         status: "active",
//       });
//     } catch (error) {
//       console.error("Error creating gig:", error);
//       setError(error.message);
//     }
//   };
  


//   if (loading) return <p>Loading gigs...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <button onClick={() => setShowForm(true)}>Create New Gig</button>

//       {showForm && (
//         <form onSubmit={handleCreateGig} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
//           <h3>Create New Gig</h3>
//           <input type="text" placeholder="Title" value={newGig.title} onChange={(e) => setNewGig({ ...newGig, title: e.target.value })} required />
//           <input type="text" placeholder="Description" value={newGig.description} onChange={(e) => setNewGig({ ...newGig, description: e.target.value })} required />
//           <input type="number" placeholder="Price" value={newGig.price} onChange={(e) => setNewGig({ ...newGig, price: e.target.value })} required />
//           <input type="text" placeholder="Location" value={newGig.location} onChange={(e) => setNewGig({ ...newGig, location: e.target.value })} required />
//           <input type="text" placeholder="Gig Type" value={newGig.gigType} onChange={(e) => setNewGig({ ...newGig, gigType: e.target.value })} required />
//           <button type="submit">Add Gig</button>
//           <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
//         </form>
//       )}

//       <h3>Your Gigs</h3>
//       <ul>
//         {gigs.map((gig) => (
//           <li key={gig._id}>
//             <h3>{gig.title}</h3>
//             <p>{gig.description}</p>
//             <p><strong>Price:</strong> ${gig.price}</p>
//             <p><strong>Location:</strong> {gig.location}</p>
//             <p><strong>Type:</strong> {gig.gigType}</p>
//             <p><strong>Status:</strong> {gig.status}</p>
//             <p><strong>Created By:</strong> {gig.createdBy?.name || "Unknown"}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const initialGigState = {
  title: "",
  description: "",
  price: "",
  location: "",
  createdBy: "user123", // Replace with actual user ID
  gigType: "",
  status: "Pending",
};

const Dashboard = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGig, setNewGig] = useState(initialGigState);

  useEffect(() => {
    fetchGigs();
  }, []);
  const fetchGigs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/gigs");
      if (!response.ok) throw new Error("Failed to fetch gigs");
      const data = await response.json();
      setGigs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/gigs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGig),
      });

      if (!response.ok) throw new Error("Failed to create gig");
      
      const createdGig = await response.json();
      setGigs([...gigs, createdGig]);
      setNewGig(initialGigState);
      setIsDialogOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGig(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gigs Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Gig
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Gig</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newGig.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newGig.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newGig.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={newGig.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="gigType">Type</Label>
                <Select 
                  value={newGig.gigType} 
                  onValueChange={(value) => setNewGig(prev => ({ ...prev, gigType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <Card key={gig._id}>
            <CardHeader>
              <CardTitle>{gig.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{gig.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Price: ${gig.price}</div>
                <div>Location: {gig.location}</div>
                <div>Type: {gig.gigType}</div>
                <div>Status: {gig.status}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;