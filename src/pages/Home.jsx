import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { pageAnimation, titleAnim } from "../animation";
import { motion } from "framer-motion";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/post${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err.code);
        setErrMsg(err.code);
      }
    };
    fetchData();
  }, [cat, errMsg]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <motion.div
      className="home"
      variants={pageAnimation}
      exit="exit"
      initial="hidden"
      animate="show"
      style={{ minHeight: "80vh" }}
    >
      {posts.length === 0 ? (
        <div className="no-data-message">
          <motion.div
            variants={titleAnim}
            exit="exit"
            initial="hidden"
            animate="show"
          >
            {errMsg === "ERR_NETWORK" ? (
              <h4>
                There is no data at the moment. Please check your internet
                connection.
              </h4>
            ) : (
              <h4>There is no data at the moment.</h4>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="posts">
          {posts.toReversed().map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post?.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>
                  {truncateText(getText(post.desc), 100)}{" "}
                  <a href={`/post/${post.id}`}>more</a>
                </p>
                <button>Read More</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Home;
