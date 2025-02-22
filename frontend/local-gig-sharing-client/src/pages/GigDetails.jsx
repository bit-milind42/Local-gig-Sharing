import React from "react";

const GigDetails = ({ gig }) => {
    if (!gig) return <p className="text-center">Select a gig to see details</p>;

    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{gig.title}</h2>
            <p className="text-gray-700">{gig.description}</p>
            <p className="text-sm text-gray-500 mt-2">Pay: {gig.pay}</p>
        </div>
    );
};

export default GigDetails;

