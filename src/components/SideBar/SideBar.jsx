import "./SideBar.css";

function SideBar( {avatar, name} ) {
  
  return (
      <div className="sidebar">
        <img className="sidebar__avatar" src={avatar} alt={name} />
        <p className="sidebar__username">{name}</p>
      </div>
  );
}

export default SideBar;
