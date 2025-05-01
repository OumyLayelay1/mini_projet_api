require('dotenv').config();
const express = require ( 'express' ); 
const app = express ();
const connectDB = require("./db");
connectDB();
const usersRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")
const produitRoutes = require("./routes/produit")

app.use (express.json ());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/produits", produitRoutes)

app.listen ( process.env.PORT , () => { 
    console . log ( "Le serveur s'exécute sur le port 3000" ); 
});

process.on("unhandledRejection", err => {
    console.log(`Une erreur est survenue: ${err.message}`)
    app.close(() => process.exit(1))
})