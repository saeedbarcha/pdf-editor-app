import React from "react";
import { useDrop } from "react-dnd";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Don't forget to import the styles

function Footer({ onDrop, elements }) {
  const [{ isOver }, dropRef] = useDrop({
    accept: "ELEMENT",
    drop: (item) => {
      if (item.elementType === "Paragraph" || item.elementType === "Heading") {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <>
        <div className="mt-2 mb-2 " style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
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
            }}
          >
            {"Footer"}
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
                }}
              >
                {elements.map((element, index) =>
                  element.name === "Heading" ? (
                    <h1 key={index}>{element.content}</h1>
                  ) : element.name === "Paragraph" ? (
                    <p key={index}>{element.content}</p>
                  ) : (
                    <h3 key={index}>{element.content}</h3>
                  )
                )}
              </div>
            </div>
          </div>
        </ResizableBox>
      </div>
    </>
  );
}

export default Footer;
