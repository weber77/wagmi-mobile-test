import React from "react";
import LandingPage from "./components/LandingPage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
