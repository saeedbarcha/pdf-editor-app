import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./Sidebar";
import CanvasBody from "../components/CanvasBody";
import CanvasHeader from "../components/CanvasHeader";
import CanvasFooter from "../components/CanvasFooter";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const CanvasSection = () => {
  const [elementsHeader, setElementsHeader] = useState([]);
  const [elementsBody, setElementsBody] = useState([]);
  const [elementsFooter, setElementsFooter] = useState([]);

  const onDropHeader = (element) => {
    setElementsHeader((prev) => [...prev, element]);
  };

  const onDropBody = (element) => {
    setElementsBody((prev) => [...prev, element]);
  };

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
      <div style={{ display: "flex", minHeight: "100vh",  width:"100%",  alignContent:"center", justifyContent:'center'}}>
        <div id="canvasArea" style={{width:"100%", display:"flex", flexDirection:"column", alignContent:"center", justifyContent:'center'}} className="mt-2 mb-2">
          <CanvasHeader onDrop={onDropHeader} elements={elementsHeader} />
          <CanvasBody onDrop={onDropBody} elements={elementsBody} />
          <CanvasFooter onDrop={onDropFooter} elements={elementsFooter} />
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
    </DndProvider>
  );
};

export default CanvasSection;
