import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      inputs
    );
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    axios.defaults.withCredentials = true;
    await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
