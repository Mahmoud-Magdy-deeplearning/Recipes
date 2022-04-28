import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./home";
import SingleRecipe from "./singleRecipe";
import AddRecipe from "./addRecipe";
import UpdateRecipe from "./updateRecipe";

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singleRecipe" element={<SingleRecipe />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/updateRecipe" element={<UpdateRecipe />} />
      </Routes>
    </div>
  );
}
export default Content;
