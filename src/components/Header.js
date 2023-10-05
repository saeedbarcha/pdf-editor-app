import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

function Header({ onDrop, elements }) {
  const [photo, setPhoto] = useState(null);
  const [{ isOver }, dropRef] = useDrop({
    accept: "ELEMENT",
    drop: (item) => {
      if (item.elementType === "img") {
        // Trigger the file input dialog when an "img" type is dropped
        inputRef.current.click();
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onDrop({
          type: "img",
          content: (
            <img src={reader.result} alt="Uploaded preview" width="100%" />
          ),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-2 mb-2">
      <ResizableBox width={"800"} height={130}>
        <div
          ref={dropRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            borderRadius: "6px",
            height: "100%",
            width: "100%",
            backgroundColor: "rgb(233, 233, 233)",
            padding: "20px",
            margin: "10px",
          }}
        >
          {"Header"}
          <div
            ref={dropRef}
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
          >
            <div
              ref={dropRef}
              style={{
                width: "100%",
                alignSelf: "center",
                backgroundColor: "#fff",
                flex: 1, // This will make it take the full height of its parent container
                display:"flex"
              }}
            >
              {elements.map((element, index) => (
              
                  <div key={index}>
                    <ResizableBox
                      width={80}
                      height={80}
                      minConstraints={[80, 80]}
                      maxConstraints={[600, 400]}
                    >
                      {element.content}
                    </ResizableBox>
                  </div>
              ))}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
                ref={inputRef}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </div>
        </div>
      </ResizableBox>
    </div>
  );
}

export default Header;
