import React, { useState, useEffect } from "react";
import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';
import { POST_TEST } from "../../config";
import Post from "../components/Post";
import jwt_decode from 'jwt-decode'
import SideBar from "../components/SideBar";
import Search from "../components/Search";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setusername] = useState('');
  const [nonefollowing, setNoneFollowing] = useState(false);
  const [lastpostid, setLastPostId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function getDeets() {
      const token = localStorage.getItem('token');
      const decodedtoken = jwt_decode(token);
      const username = decodedtoken.username;
      setusername(username);
    }
    getDeets();
  }, []);

  useEffect(() => {
    async function getPosts() {
      if (username !== undefined && username !== null && username !== '') {
        try {
          const response = await fetch(`${POST_TEST}/${username}`);
          const resp2 = await response.json();

          if (resp2.length > 0) {
            const postsWithLikes = resp2.map((post) => {
              post.alreadyLiked = false;
              return post;
            });

            setPosts(postsWithLikes);
            setLastPostId(resp2[resp2.length - 1].id);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setNoneFollowing(true);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
          setIsLoading(false);
        }
      }
    }

    setTimeout(() => {
      getPosts();
    }, 2000);
  }, [username !== '']);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <SideBar onClose={closeSidebar} />
      <div className="flex flex-col flex-grow items-center justify-center">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Home</h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Dots color="#fff" />
          </div>
        ) : (
          <div className="flex-col items-center justify-center">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      <Search/>
    </div>
  );
};

export default HomeScreen;
