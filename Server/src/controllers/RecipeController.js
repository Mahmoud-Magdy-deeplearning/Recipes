const autoBind = require("auto-bind");
const { Controller } = require("../../system/controllers/Controller");
const { RecipeService } = require("../services/RecipeService");
const { Recipe } = require("../models/Recipe");
const recipeService = new RecipeService(new Recipe().getInstance());

class RecipeController extends Controller {
  constructor(service) {
    super(service);
    autoBind(this);
  }
  async getAll(req, res, next) {
    try {
      const query = `populate=image`;
      const response = await this.service.getAll(query);

      return res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }
  async updateImage(req, res, next) {
    const { id } = req.params;

    try {
      const response = await this.service.update(id, {
        image: req.imageData.data._id,
      });

      return res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  async insert(req, res, next) {
    const data = req.body;
    data["image"] = req.imageData.data._id;

    try {
      const response = await this.service.insert(data);

      return res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new RecipeController(recipeService);
