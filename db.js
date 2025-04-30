const mongoose = require("mongoose");

const localDB = "mongodb://localhost:27017/mini_projet";

const connectDB = async () => {
  try {
    await mongoose.connect(localDB);
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.log("Erreur MongoDB:", err);
  }
};

module.exports = connectDB;
