import React from "react";
import { Formik, FieldArray, Field, Form } from "formik";
import { updateData, updateImage } from "../service/updateData";
import CustomButton from "./button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

function FormikUpdate() {
  const { state } = useLocation();
  const { title, recipe, ingredients, id } = state;
  let navigate = useNavigate();

  return (
    <div>
      <h1>Update Recipe</h1>
      <Formik
        initialValues={{
          title: title,
          recipe: recipe,
          ingredients: ingredients,
          file: null,
        }}
        onSubmit={async (values) => {
          if (
            !values["title"] ||
            !values["recipe"] ||
            values["ingredients"].length === 0
          ) {
            alert("Please fill all fields");
            return;
          }
          if (values["ingredients"].length > 0) {
            for (let i = 0; i < values["ingredients"].length; i++) {
              if (values["ingredients"][i] === "") {
                alert("Please fill all fields");
                return;
              }
            }
          }

          if (values["file"]) {
            const formData = new FormData();
            formData.append("file", values["file"]);

            const responsePic = await updateImage(
              process.env.REACT_APP_API_URL,
              id,
              formData
            );
            if (responsePic.status === 200) {
              alert("Recipe picture updated successfully");
            } else {
              console.log(responsePic);
              alert("Error while update picture recipe");
            }
          }

          const responseData = await updateData(
            process.env.REACT_APP_API_URL,
            id,
            values
          );
          if (responseData.status === 200) {
            alert("Recipe Data updated successfully");
            navigate("/");
          } else {
            console.log(responseData);
            alert("Error while Updating recipe");
          }
        }}
        render={({ values, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="file">Upload image</label>
              <input
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Title">Title</label>
              <Field id="title" name="title" placeholder="Food Title" />
            </div>

            <div className="form-group">
              <label htmlFor="recipe">Recipe</label>
              <Field
                id="recipe"
                name="recipe"
                placeholder="recipe description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">ingredients</label>
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div>1
                    {values.ingredients && values.ingredients.length > 0 ? (
                      values.ingredients.map((item, index) => (
                        <div key={index}>
                          <Field
                            variant="outlined"
                            label="Name"
                            name={`ingredients.${index}`}
                            id={`ingredients.${index}`}
                          />

                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove an item from the list
                          >
                            -
                          </Button>
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")} // insert an empty item at a position
                          >
                            +
                          </Button>
                        </div>
                      ))
                    ) : (
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all items from the list */}
                        Add item
                      </Button>
                    )}
                  </div>
                )}
              />
            </div>
            <CustomButton
              type="submit"
              ClassName="buttonFormik"
              backgroundColor="#4CAF50"
              text="Submit"
            />
          </Form>
        )}
      />
    </div>
  );
}

export default FormikUpdate;
