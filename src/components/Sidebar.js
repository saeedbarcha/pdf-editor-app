import React, { useState, useRef } from "react";
import { FaTable, FaHeading } from "react-icons/fa";
import { BsFillFileTextFill, BsImageFill } from "react-icons/bs";

import { useDrag } from "react-dnd";
import ContentEditable from "react-contenteditable";

function SidebarItem({ name, icon }) {
  const [photo, setPhoto] = useState("");
  const [uploadedImg, setUploadedImg] = useState(null);
  const contentEditable = useRef(null);
  const [html, setHtml] = useState(`<p>${name}</p>`);

  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setUploadedImg(reader.result);
        setHtml(<img src={reader.result} alt="Uploaded preview" />);
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const contentMap = {
    Heading: (
      <h1>
        {" "}
        <ContentEditable
          // ref={ref}
          innerRef={contentEditable}
          html={html}
          disabled={false}
          onChange={handleChange}
          tagName="article"
          style={{}}
        />
      </h1>
    ),
    Paragraph: (
      <p>
        <ContentEditable
          innerRef={contentEditable}
          html={html}
          disabled={false}
          onChange={handleChange}
          tagName="article"
        />
      </p>
    ),

    // img: <img src="URL_OF_YOUR_IMAGE" alt="Dragged Image" />,
    img:  
    <label className="btn btn-outline-secondary  w-25" >
      {photo ? photo.name : "Upload Photo"}
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
        hidden
      />
    </label>,

    table: (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>
              {" "}
              <ContentEditable
                innerRef={contentEditable}
                html={"heading 1"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </th>
            <th style={{ border: "1px solid black" }}>
              {" "}
              <ContentEditable
                innerRef={contentEditable}
                html={"heading 2"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </th>
            <th style={{ border: "1px solid black" }}>
              {" "}
              <ContentEditable
                innerRef={contentEditable}
                html={"heading 3"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black" }}>
              <ContentEditable
                innerRef={contentEditable}
                html={"table data"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </td>
            <td style={{ border: "1px solid black" }}>
              <ContentEditable
                innerRef={contentEditable}
                html={"table data"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </td>
            <td style={{ border: "1px solid black" }}>
              <ContentEditable
                innerRef={contentEditable}
                html={"table data"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </td>
            {/* ... add more cells as needed */}
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>
              <ContentEditable
                innerRef={contentEditable}
                html={"table data"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </td>
            <td style={{ border: "1px solid black" }}>
              <ContentEditable
                innerRef={contentEditable}
                html={"table data"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </td>
            <td style={{ border: "1px solid black" }}>
              <ContentEditable
                innerRef={contentEditable}
                html={"table data"}
                disabled={false}
                onChange={handleChange}
                tagName="article"
              />
            </td>
            {/* ... add more cells as needed */}
          </tr>
          {/* ... add more rows as needed */}
        </tbody>
      </table>
    ),
  };

  const [, ref] = useDrag({
    type: "ELEMENT",
    // item: { name, icon, content: contentMap[name] },
    item: { name, icon, content: contentMap[name], elementType: name }
  });
  //*********** react icon
  const IconStyle = {
    width: "25px",
    height: "25px",
  };

  const renderIcon = () => {
    switch (icon) {
      case "BsFillFileTextFill":
        return <BsFillFileTextFill style={IconStyle} />;
      case "FaHeading":
        return <FaHeading style={IconStyle} />;
      case "BsImageFill":
        return <BsImageFill style={IconStyle} />;
      case "FaTable":
        return <FaTable style={IconStyle} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        ref={ref}
        style={{
          width: "70px",
          height: "auto",
          padding: "5px",
          margin: "5px",
          border: "1px solid dark",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        <div>{renderIcon()}</div>
        <p className="m-0 p-0" style={{fontSize:"12px"}}>{name}</p>
      </div>
    </>
  );
}

function Sidebar() {
  const headingIcon = "FaHeading";
  const paraIcon = "BsFillFileTextFill";
  const imageIcon = "BsImageFill";
  const tableIcon = "FaTable";

  return (
    <div
      style={{
        width: "25%",
        padding: "10px",
        backgroundColor: "#E9E9E9",
      }}
    >
      <hr />
      <h5>Elements</h5>
      <div className="d-flex">
        <SidebarItem name="Heading" icon={headingIcon} />
        <SidebarItem name="Paragraph" icon={paraIcon} />
        <SidebarItem name="img" icon={imageIcon} />
      </div>
      <div className="d-flex">
        <SidebarItem name="table" icon={tableIcon} />
      </div>
    </div>
  );
}

export default Sidebar;
