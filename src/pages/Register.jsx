import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`,
        inputs
      );
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />

        <input type="email" name="email" id="" onChange={handleChange} />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
