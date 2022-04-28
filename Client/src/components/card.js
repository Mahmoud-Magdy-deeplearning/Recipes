import React from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { recipe, onDelete } = props;
  let navigate = useNavigate();

  const showDetails = () => {
    navigate("/singleRecipe/", {
      state: {
        title: recipe.title,
        image: recipe.image,
        recipe: recipe.recipe,
        ingredients: recipe.ingredients,
        id: recipe._id,
      },
    });
  };
  return (
    <div className="recipe-card">
      <div id="recipe-card__cover" className="recipe-card__cover">
        <div className="recipe-card__img">
          <img
            src={
              recipe.image
                ? process.env.REACT_APP_UPLOADS + recipe.image.filename
                : "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"
            }
            alt="Food img"
          />
        </div>
        <div className="recipe-card__cover-details">
          <Button
            ClassName="recipe-card__Button"
            backgroundColor="#4CAF50"
            text="Show details"
            params={recipe}
            onClickAction={showDetails}
          />
          <Button
            ClassName="recipe-card__Button"
            backgroundColor="#f44336"
            text="Delete"
            onClickAction={onDelete}
            onClickParameters={recipe}
          />

          <div id="recipe-card__info" className="recipe-card__info">
            <div className="recipe-card__title">
              <h1 className="blackText">{recipe.title}</h1>
            </div>
            <div className="recipe-card__description">
              <p className="blackText">{recipe.recipe}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
