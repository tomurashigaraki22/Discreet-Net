import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post }) => {
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
        src={`http://192.168.1.188:5000/${post.img}`}
        alt={post.caption}
        className="w-full h-[420px] object-contain mb-3 rounded-lg"
      />
      <div className="flex items-center mb-2">
        <button className="mr-2 pr-7 text-white">
          <FontAwesomeIcon icon={faHeart} />
          {/* You can add your logic for handling likes here */}
        </button>
        <button className="text-white">
          <FontAwesomeIcon icon={faComment} />
          {/* You can add your logic for handling comments here */}
        </button>
      </div>
      <p className="text-white mb-2">{post.likes} likes</p>
      <p className="text-lg text-white font-bold mb-2">{post.caption}</p>
    </div>
  );
};

export default Post;
