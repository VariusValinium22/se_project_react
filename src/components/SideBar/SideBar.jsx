import "./SideBar.css";
import avatar from "../../assets/avatar.png";


function SideBar( currentUser ) {
  
  return (
      <div className="sidebar">
        <img className="sidebar__avatar" src={currentUser.avatar} alt={currentUser.name} />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
  );
}

export default SideBar;
