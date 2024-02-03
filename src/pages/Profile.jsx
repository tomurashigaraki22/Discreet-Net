import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { PROFILE_TEST } from "../../config";

const Profile = () => {
  const [profileData, setprofileData] = useState([]);
  const [username, setusername] = useState('');

  useEffect(() => {
    async function getDeets() {
      const token = localStorage.getItem('token');
      const decodedtoken = jwt_decode(token);
      const usernames = decodedtoken.username;
      setusername(usernames);
    }
    getDeets();
  }, []);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(`${PROFILE_TEST}/${username}`, {
          method: 'GET'
        });
        const resp2 = await response.json();
        setprofileData(resp2);
      } catch (error) {
        console.error(error);
      }
    }
    getProfile();
  }, [username !== '']);

  const coverURL = 'https://static.vecteezy.com/system/resources/thumbnails/018/754/757/original/welcome-text-in-white-on-black-screen-background-animated-welcome-word-with-bounce-effect-animation-suitable-for-message-or-greeting-text-footage-free-video.jpg';
  const profileURL = 'https://blog.radware.com/wp-content/uploads/2020/06/anonymous.jpg';

  return (
    <div className="relative bg-gray-900 min-h-screen">
      {/* Cover Photo */}
      <div
        className="bg-cover bg-center h-60 relative mb-[90px]"
        style={{ backgroundImage: `url(${coverURL})` }}
      >
        {/* Circular Profile Image Overlapping on Cover Photo */}
        <img
          src={profileURL}
          alt="Profile"
          className="rounded-full border-4 border-gray-700 absolute bottom-[-80px] left-4 w-[150px] h-[150px] ring ring-offset-2 ring-gray-900"
        />
      </div>

      {/* Profile Information */}
      <div className="container mx-auto mt-8 p-6 bg-gray-700 rounded-lg shadow-md relative z-10">
        {profileData ? (
          <div>
            <div className="flex items-center justify-between">
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-white">{profileData.username}</h1>
                <p className="text-gray-400">@anonymous_{profileData.username}</p>
              </div>
              {/* Extra Buttons - Customize as Needed */}
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Follow</button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">Message</button>
              </div>
            </div>

            <p className="mt-4 text-lg text-white">Bio: {profileData.bio}</p>
            <div className="mt-4">
              <p className="text-gray-300">Followers: {profileData.followers}</p>
              <p className="text-gray-300">Following: {profileData.following}</p>
              <p className="text-gray-300">Posts: {profileData.post_no}</p>
            </div>

            {/* Additional Section - Posts, Photos, etc. */}
            <div className="mt-6">
              {/* Add more content here based on your design */}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
