const request = require("supertest");

describe("Recipes EndPoints", () => {
  let recipeID = "";
  let API = request("http://localhost:5001/api/recipes");
  it("should create a new recipe", async () => {
    const res = await API.post("/").send({
      title: "Mulukhya",

      ingredient: ["garlic", "oil"],
      recipe: "put garlic on oil and then put mulukhya on them",
    });
    recipeID = res.body.data._id;
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("title");
  });

  it("should get all Recipes", async () => {
    const res = await API.get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Mulukhya" }),
        expect.objectContaining({ title: "Pizza" }),
      ])
    );
  });

  it("should update specific recipe by ID", async () => {
    const res = await API.put(`/${recipeID}`).send({
      title: "New Mulukhya",
      ingredient: ["onion", "Mulukhya plant"],
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.title).toEqual("New Mulukhya");
  });

  it("should delete specific recipe by ID", async () => {
    const res = await API.delete(`/${recipeID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.title).toEqual("New Mulukhya");
  });
});
