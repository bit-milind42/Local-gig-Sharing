import React from "react";

const GigList = ({ gigs, selectGig }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Available Gigs</h2>
            <ul>
                {gigs.map((gig) => (
                    <li
                        key={gig.id}
                        onClick={() => selectGig(gig)}
                        className="cursor-pointer border-b p-2 hover:bg-blue-100"
                    >
                        {gig.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GigList;
