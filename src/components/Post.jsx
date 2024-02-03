import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { BASE_TEST } from "../../config";
import { io } from "socket.io-client";

const Post = ({ post, user, alreadyLiked }) => {
  const [liked, setLiked] = useState(alreadyLiked);
  const [socket, setSocket] = useState(null);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    const newSocket = io(BASE_TEST);

    newSocket.on("liked_post_updated", (data) => {
      handleLikeUpdate(data);
    });

    newSocket.on("unliked_post_updated", (data) => {
      handleLikeUpdate(data);
    });

    setSocket(newSocket);

    // Clean up the WebSocket connection on component unmount
    return () => {
      newSocket.close();
    };
  }, [post.id, liked, likes]);

  const handleLikeUpdate = (data) => {
    if (data.id === post.id) {
      setLikes(data.likes);
      setLiked(data.alreadyLiked);
    }
  };

  const handleLike = () => {
    if (socket) {
      const updatedLikes = liked ? likes - 1 : likes + 1;

      const data = {
        id: post.id,
        like_no: updatedLikes,
        username: user,
        alreadyLiked: !liked,
      };

      // Emit the liked_post or unliked_post event to the server
      socket.emit(liked ? "unliked_post" : "liked_post", data);
    }
  };

  console.log(post.img);

  return (
    <div className="mb-4 border-b-2 border-gray-300 lg:w-[700px]">
      <div className="flex items-center mb-2">
        <img
          src={`https://blog.radware.com/wp-content/uploads/2020/06/anonymous.jpg`}
          alt={post.username}
          className="w-12 h-12 object-contain rounded-full mr-3"
        />
        <Link
          to={`/profile/${post.username}`}
          className="text-white font-semibold hover:underline"
        >
          {post.username}
        </Link>
      </div>
      <img
        src={`${BASE_TEST}/${post.img}`}
        alt={post.caption}
        className="w-full h-[420px] object-contain mb-3 rounded-lg"
      />
      <div className="flex items-center mb-2">
        <button className="mr-2 pr-7 text-white" onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} color={liked ? "red" : "white"} />
        </button>
        <button className="text-white">
          <FontAwesomeIcon icon={faComment} />
        </button>
      </div>
      <p className="text-white mb-2">{likes} likes</p>
      <p className="text-lg text-white font-bold mb-2">{post.caption}</p>
    </div>
  );
};

export default Post;
