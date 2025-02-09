import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  handleAddClick,
  clothingItems,
  handleCardClick,
  setActiveModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser || !currentUser.name) {
    console.error("currentUser is undefined or missing props: ", currentUser);
  }
  console.log("Profile.jsx Current User: ", currentUser);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar userName={currentUser.name} />
        <button
          onClick={() => setActiveModal("edit-profile")}
          className="profile__edit-button"
        >
          Edit Profile
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
