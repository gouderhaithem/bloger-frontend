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

function App() {
  const location = useLocation();
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
        <Footer />
      </div>
    </div>
  );
}

export default App;
