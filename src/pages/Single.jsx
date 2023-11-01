import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { AuthContext } from "../context/authContext";
import { toast } from "react-hot-toast";
import { pageAnimation } from "../animation";
import { motion } from "framer-motion";
import ScrollTop from "../components/ScrollTop";
import avatar1 from "../img/avatar/avatar1.png";
import avatar2 from "../img/avatar/avatar2.png";
import avatar3 from "../img/avatar/avatar3.png";
import avatar4 from "../img/avatar/avatar4.png";
import avatar5 from "../img/avatar/avatar5.png";
import avatar6 from "../img/avatar/avatar6.png";
import avatar7 from "../img/avatar/avatar7.png";
import avatar8 from "../img/avatar/avatar8.png";
import avatar9 from "../img/avatar/avatar9.png";
import Comments from "../components/Comments";
const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/post/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  //toast
  const notify = () => {
    toast.remove("new post created ");
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      try {
        axios.defaults.withCredentials = true;
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${postId}`);
        notify();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const avatarImages = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
  ];
  const randomAvatar =
    avatarImages[Math.floor(Math.random() * avatarImages.length)];

  return (
    <motion.div
      variants={pageAnimation}
      exit="exit"
      initial="hidden"
      animate="show"
      className="single"
    >
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          <img alt="avatar" src={randomAvatar} />
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.desc }} />
        <h2>comments</h2>
        <Comments postId={postId} />
      </div>
      <Menu cat={post.cat} />
      <ScrollTop />
    </motion.div>
  );
};

export default Single;
