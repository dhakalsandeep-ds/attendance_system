import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import { Routes, Route } from "react-router-dom";
import BatchView from "./pages/BatchView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/batch" element={<BatchView></BatchView>}></Route>
      </Routes>
    </>
  );
}

export default App;
