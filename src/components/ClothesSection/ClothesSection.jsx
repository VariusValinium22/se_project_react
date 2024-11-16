import React from "react";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection( { handleAddClick, clothingItems } ) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              //TODO : pass as prop to this ClothesSection component with other props
              onCardClick={handleAddClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
