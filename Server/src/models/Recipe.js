const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

class Recipe {
  initSchema() {
    const schema = new Schema({
      title: { type: String, required: true, maxlength: 32 },
      image: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
      ingredients: [{ type: String, required: true, maxlength: 32 }],
      recipe: { type: String, required: true, maxlength: 1000 },
      created: { type: Date, default: Date.now },
    });

    schema.plugin(uniqueValidator);
    try {
      mongoose.model("Recipe", schema);
    } catch (err) {
      console.log(err);
    }
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Recipe");
  }
}

module.exports = { Recipe };
