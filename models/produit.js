const Mongoose = require("mongoose")

const ProduitSchema = new Mongoose.Schema({
    title: {
    type: String,
    unique: false,
    required: true,
  },
  image: {
    type: String,
    unique: false,
    required: false,
  },
  prix: {
    type: Number,
    unique: false,
    required: false,
  },
  description: {
    type: String,
    unique: false,
    required: false,
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
})

module.exports = Mongoose.model("Produit", ProduitSchema);