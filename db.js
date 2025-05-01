const mongoose = require("mongoose");

const localDB = process.env.MONGO_URI || process.env.MongoDBLocal;

const connectDB = async () => {
  try {
    await mongoose.connect(localDB);
    console.log("Connecté à MongoDB");
  } catch (err) {
    console.log("Erreur MongoDB:", err);
  }
};

module.exports = connectDB;
