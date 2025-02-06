import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleAddClick, clothingItems, handleCardClick, userName }) {
  console.log("Profile username:", userName);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar userName={userName} />
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
