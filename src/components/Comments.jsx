import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import send from "../img/send.png";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import avatar1 from "../img/avatar/avatar1.png";
import avatar2 from "../img/avatar/avatar2.png";
import avatar3 from "../img/avatar/avatar3.png";
import avatar4 from "../img/avatar/avatar4.png";
import avatar5 from "../img/avatar/avatar5.png";
import avatar6 from "../img/avatar/avatar6.png";
import avatar7 from "../img/avatar/avatar7.png";
import avatar8 from "../img/avatar/avatar8.png";
import avatar9 from "../img/avatar/avatar9.png";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useContext(AuthContext);
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
  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    return avatarImages[randomIndex];
  };

  const navigate = useNavigate();
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${postId}`
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
    console.log(comments);
  }, [currentUser, postId]);

  const notify = (message) => {
    toast.success(message);
  };
  const loginNotify = () => {
    toast.error("You have to log in first to comment", {});
    navigate("/login");
  };
  const handleDelete = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comments/${id}`,
        {}
      );
      notify("comment has been deleted");
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        loginNotify(); // Redirect to the login page when currentUser is null

        return;
      }
      const newComment = {
        userid: currentUser.id,
        comment: commentText,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      // Post the new comment
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comments/${postId}`,
        newComment
      );

      notify("Your comment is successfully added");

      // Update the comments by fetching them again
      fetchComments();

      // Clear the comment input
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="commentssection">
      <div className="addcomment">
        <div className="typing-textarea">
          <textarea
            id="chat-input"
            spellCheck="false"
            placeholder="Enter your comment here"
            required
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <span
            id="send-btn"
            className="material-symbols-rounded"
            onClick={handleComment}
          >
            <img style={{ width: "25px", height: "25px" }} src={send} alt="" />
          </span>
        </div>
      </div>

      <div className="allcomments">
        {comments.toReversed().map((singlecomment, index) => (
          <div className="commentcontainer" key={index}>
            <div className="user">
              <img alt="avatar" src={getRandomAvatar()} />
              <div className="info">
                <span>{singlecomment.username}</span>
                <p>Posted {moment(singlecomment.date).fromNow()}</p>
              </div>
            </div>
            <div className="singlecomment">{singlecomment.comment}</div>
            {currentUser && currentUser.id === singlecomment.userid && (
              <span
                id="delete-icon"
                onClick={() => {
                  const shouldDelete = window.confirm(
                    "Are you sure you want to delete this comment?"
                  );
                  if (shouldDelete) {
                    handleDelete(singlecomment.id);
                    console.log(singlecomment.id);
                  }
                }}
              >
                🗑️
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
