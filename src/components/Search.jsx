import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const Search = () => {
  return (
    <div className="flex flex-col fixed top-0 right-0 items-center justify-end p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search...."
          className="border border-gray-400 rounded-full px-4 py-2 w-[300px] focus:outline-none focus:border-grey-300 bg-gray-900 text-white"
        />
        <button className="fixed top-5 right-12 bg-gray-900 text-white px-4 py-2 rounded-md">
          <FaSearch /> {/* Search icon */}
        </button>
      </div>
      <div className="container mx-auto w-[350px] mt-10 p-3 bg-gray-700 text-white rounded-lg">
        <div className="p-8 bg-gray-700 text-white">
          <h1 className="text-xl font-bold mb-4">About Discreet Net</h1>
          <p className="text-md">
            Discreet Net is a platform for connecting with people discreetly. 
            Share your thoughts,
            experiences, and moments without revealing your true identity. Stay connected with
            others who value privacy and discretion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
