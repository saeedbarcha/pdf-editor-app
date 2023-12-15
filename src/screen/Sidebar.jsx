import SidebarItem from "../components/SidebarItem";

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
      <hr />
    </div>
  );
}

export default Sidebar;
