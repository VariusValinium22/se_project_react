import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ userName }) {
  console.log("Sidebar username:", userName);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">{userName}</p>
    </div>
  );
}

export default SideBar;
