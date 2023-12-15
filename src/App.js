import React, { useState } from "react";
import Header from "./screen/Header";
import Footer from "./screen/Footer";
import CanvasSection from "./screen/CanvasSection";
import "./assets/styles/index.css";

function App() {
  return (
    <>
      <Header />
      <CanvasSection />
      <Footer />
    </>
  );
}

export default App;
