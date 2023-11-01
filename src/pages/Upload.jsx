import axios from "axios";
import React, { useState } from "react";

/*const Upload = () => {
  const [uploadFile, setUploadFile] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "blogimg");

    axios
      .post("https://api.cloudinary.com/v1_1/dxxnd2npq/image/upload", formData)
      .then((response) => {
        console.log(response);
        setCloudinaryImage(response.data.secure_url);
        console.log(cloudinaryImage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 const sumbit =()=>{

 }
  return (
    <div className="App">
      <section className="left-side">
        <form>
          <h3> Upload Images to Cloudinary Cloud Storage</h3>
          <div>
            <input
              type="file"
              onChange={(event) => {
                setUploadFile(event.target.files[0]);
              }}
            />
          </div>
          <button onClick={handleUpload}> Upload File</button>
        </form>
      </section>
      <section className="right-side">
        <h3>The resulting image will be displayed here</h3>
        {cloudinaryImage && <img src={cloudinaryImage} alt="" />}
      </section>
    </div>
  );
};

export default Upload;
*/

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const res = await axios.post("http://localhost:8000/api/upload", data);
      setRes(res.data);
      console.log(res.data.secure_url);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <label htmlFor="file" className="btn-grey">
        {" "}
        select file
      </label>
      {file && <center> {file.name}</center>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      <code>
        {Object.keys(res).length > 0
          ? Object.keys(res).map((key) => (
              <p className="output-item" key={key}>
                <span>{key}:</span>
                <span>
                  {typeof res[key] === "object" ? "object" : res[key]}
                </span>
              </p>
            ))
          : null}
      </code>
      {file && (
        <>
          <button onClick={handleUpload} className="btn-green">
            {loading ? "uploading..." : "upload to cloudinary"}
          </button>
        </>
      )}
    </div>
  );
};

export default Upload;
