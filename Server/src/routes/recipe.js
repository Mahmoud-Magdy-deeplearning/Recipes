const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const MediaController = require("../controllers/MediaController");

const router = express.Router();

router.put(
  "/updateImage/:id",
  MediaController.upload.single("file"),
  MediaController.link,
  RecipeController.updateImage
);
router.get("/", RecipeController.getAll);
router.get("/:id", RecipeController.get);
router.post(
  "/",
  MediaController.upload.single("file"),
  MediaController.link,
  RecipeController.insert
);
router.put("/:id", RecipeController.update);
router.delete("/:id", RecipeController.delete);

module.exports = router;
