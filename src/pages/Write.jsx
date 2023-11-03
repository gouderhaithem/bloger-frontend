import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-hot-toast";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [cloudinaryImage, setCloudinaryImage] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/upload`,
        data
      );
      setRes(res.data);
      return res.data.secure_url;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const notify = () => {
    toast.success("New post created");
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = await handleUpload();

      if (imgUrl !== null) {
        axios.defaults.withCredentials = true;
        console.log(state);
        if (state) {
          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/post/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: imgUrl,
            }
          );
        } else {
          await axios.post(`${process.env.REACT_APP_BASE_URL}/post`, {
            title,
            desc: value,
            cat,
            img: imgUrl,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
        }

        notify();
        navigate("/");
      } else {
        // Handle the case where the image upload fails.
        console.error("Image upload failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          {/*
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
           */}
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={handleSelectFile}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
