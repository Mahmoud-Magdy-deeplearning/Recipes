import Button from "../components/button";
import { useLocation } from "react-router-dom";
import deleteData from "../service/deleteData";
import { useNavigate } from "react-router-dom";

function SingleRecipe(props) {
  const { state } = useLocation();
  const { title, ingredients, image, recipe, id } = state;
  let navigate = useNavigate();

  const onDelete = async () => {
    await deleteData(process.env.REACT_APP_API_URL, id);
    navigate("/");
  };
  const onUpdate = () => {
    navigate("/updateRecipe", {
      state: {
        title: title,
        image: image,
        recipe: recipe,
        ingredients: ingredients,
        id: id,
        type: "update",
      },
    });
  };

  return (
    <div className="singleCardContainer">
      <div className="singleCard">
        <div className="card-image">
          <img
            className="img"
            src={
              image
                ? process.env.REACT_APP_UPLOADS + image.filename
                : "https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png"
            }
            alt="Food img"
          />
        </div>
        <div className="card-content">
          <div className="card-header">
            <div className="card-title">
              <h1 className="h1-title">{title}</h1>
            </div>
          </div>

          <div className="card-body">
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient">
                  {ingredient}
                </li>
              ))}
            </ul>
            <div className="">{recipe}</div>
          </div>
        </div>
      </div>
      <div className="buttonGroup">
        <Button
          ClassName="buttonSingleRecipe"
          backgroundColor="#008CBA"
          text="Update"
          onClickAction={onUpdate}
        />
        <Button
          ClassName="buttonSingleRecipe"
          backgroundColor="#FF0000"
          text="Delete"
          onClickAction={onDelete}
        />
      </div>
    </div>
  );
}
export default SingleRecipe;
