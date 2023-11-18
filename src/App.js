import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import "./style.scss";
import Upload from "./pages/Upload";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [darkMode, SetDarkMode] = useState(false);
  //use effect for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-salmon");
    } else {
      document.body.classList.remove("bg-salmon");
    }

    // 👇️ checking if the body element contains a class
    if (document.body.classList.contains("bg-salmon")) {
      console.log("body tag contains class");
    }
  }, [darkMode]);

  //dark mode handler
  const darkModeHandler = () => {
    SetDarkMode(!darkMode);
  };
  return (
    <div className="app">
      <div className="container">
        <NavBar />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={<Write />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>

        <Footer darkModeHandler={darkModeHandler} darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
