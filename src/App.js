import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/Mainfooter";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { jsPDF } from "jspdf";
import "./assets/styles/index.css";
import html2canvas from "html2canvas";

function App() {
  const [elementsHeader, setElementsHeader] = useState([
  ]);
  const onDropHeader = (element) => {
    setElementsHeader((prev) => [...prev, element]);
  };

  const [elementsBody, setElementsBody] = useState([
  ]);
  const onDropBody = (element) => {
    setElementsBody((prev) => [...prev, element]);
  };

  const [elementsFooter, setElementsFooter] = useState([
  ]);
  const onDropFooter = (element) => {
    setElementsFooter((prev) => [...prev, element]);
  };

  //generate pdf
  const generatePdf = async () => {
    const canvas = await html2canvas(document.getElementById("canvasArea"));
    const pdf = new jsPDF("p", "mm", [210, 297]); // A4 size
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
    pdf.save("output.pdf");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <MainHeader />
      <div style={{ display: "flex", minHeight: "100vh",  width:"100%",  alignContent:"center", justifyContent:'center'}}>
        <div id="canvasArea" style={{width:"80%", display:"flex", flexDirection:"column", alignContent:"center", justifyContent:'center'}} className="mt-2 mb-2">
          <Header onDrop={onDropHeader} elements={elementsHeader} />
          <Body onDrop={onDropBody} elements={elementsBody} />
          <Footer onDrop={onDropFooter} elements={elementsFooter} />
        </div>
        <Sidebar />
      </div>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
        className="mt-2 mb-5"
      >
        <button className="btn btn-primary" onClick={generatePdf}>
          Generate PDF
        </button>
      </div>

      <MainFooter />
    </DndProvider>
  );
}

export default App;
