import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleAddClick, clothingItems, handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
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