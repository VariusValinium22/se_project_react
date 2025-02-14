import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  if (clothingItems === undefined) {
    return <p> Loading items... </p>;
  }

  if (clothingItems.length === 0) {
    return <p>No items found. Add an Item!</p>;
  }

  return (
    <div className="clothes-section">
      <div className="clothes__title-button">
        <p className="clothes__title">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__button"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes__items">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
