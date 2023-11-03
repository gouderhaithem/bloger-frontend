import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/post`
          // `http://localhost:8000/api/post/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Randomly shuffle the posts array and slice the first 4 elements
  const randomPosts = shuffleArray(posts).slice(0, 4);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {randomPosts.map((post) => (
        <div className="post" key={post.id}>
          <Link className="link" to={`/post/${post.id}`}>
            <img src={post?.img} alt="" />
          </Link>
          <h2>{post.title}</h2>
          <Link className="link" to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
