import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
  setActiveModal, 
  handleLogOut
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser || !currentUser.name) {
    console.error("currentUser is undefined or missing props: ", currentUser);
  }

  return (
    <div className="profile">
      <div className="profile__sidebar-container">
        <SideBar avatar={currentUser.avatar} name={currentUser.name} />
        <button
          onClick={() => setActiveModal("edit-profile")}
          className="profile__edit-button"
        >
          Change profile data
        </button>
        <button className="profile__signout-button" onClick={handleLogOut}>
          Sign Out
        </button>
      </div>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
