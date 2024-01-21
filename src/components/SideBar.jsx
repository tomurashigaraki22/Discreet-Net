import React from "react";
import { Link } from "react-router-dom";
import { X, Home, Edit, Inbox, Settings, User } from "react-feather";

const SideBar = ({ onClose }) => {
  const iconSize = 24; // Set the desired icon size

  const sidebarOptions = [
    { label: "Home", to: "/home", icon: <Home size={iconSize} /> },
    { label: "Compose", to: "/compose", icon: <Edit size={iconSize} /> },
    { label: "Inbox", to: "/inbox", icon: <Inbox size={iconSize} /> },
    { label: "Settings", to: "/settings", icon: <Settings size={iconSize} /> },
    { label: "Profile", to: "/profile", icon: <User size={iconSize} /> },
  ];

  return (
    <div className="bg-gray-900 text-white h-screen w-1/6 p-4 fixed top-0 left-0 pt-6">
      <p className="items-center justify-center text-white text-2xl italic">
        Discreet Net
      </p>
      <div className="mb-8 mt-10">
        {sidebarOptions.map((option, index) => (
          <Link
            key={index}
            to={option.to}
            className="flex items-center mb-4 mt-10 text-2xl hover:text-gray-400"
          >
            <span className="mr-2">{option.icon}</span>
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
