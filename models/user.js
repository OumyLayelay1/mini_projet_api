const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  number: { type: String, unique: true, required: true },
  profession: { type: String },
  password: { type: String, minlength: 8, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual pour produits créés par l'utilisateur
UserSchema.virtual("produits", {
  ref: "Produit",
  localField: "_id",
  foreignField: "user"
});

module.exports = Mongoose.model("User", UserSchema);
