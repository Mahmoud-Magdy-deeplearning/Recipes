import { React, useEffect, useState } from "react";
import Card from "../components/card";
import fetchData from "../service/fetchData";
import Loading from "../components/loading";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import deleteData from "../service/deleteData";
import CustomMessage from "../components/customMessage";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const recipesAPI = async () => {
    try {
      setIsLoading(true);

      const recipesesData = await fetchData(process.env.REACT_APP_API_URL);

      setTimeout(() => {
        setRecipes(recipesesData);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const onClickDelete = (id) => {
    setRecipes(recipes.filter((recipe) => recipe._id !== id));
    deleteData(process.env.REACT_APP_API_URL, id);
  };
  useEffect(() => {
    recipesAPI();
  }, []);

  // if (!recipes) return null;

  return (
    <>
      <TransitionGroup className="allCards">
        {isLoading ? (
          <CSSTransition timeout={50} classNames="itemTrans">
            <Loading />
          </CSSTransition>
        ) : recipes.length === 0 ? (
          <CustomMessage className="noItems" msg="There are no recipes" />
        ) : (
          recipes.map((recipe, index) => (
            <CSSTransition timeout={1000} classNames="itemTrans" key={index}>
              <Card
                key={index}
                recipe={recipe}
                id={index}
                onDelete={() => onClickDelete(recipe._id)}
              />
            </CSSTransition>
          ))
        )}
      </TransitionGroup>
    </>
  );
}

export default Home;
