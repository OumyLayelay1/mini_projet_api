require('dotenv').config();
const express = require ( 'express' );
const path = require('path');
const cors = require('cors'); 
const app = express ();
const connectDB = require("./db");
connectDB();
const usersRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")
const produitRoutes = require("./routes/produit")

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
app.use (express.json ());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use("/api/auth", authRoutes)
app.use('/api/users', usersRoutes)
app.use("/api/produits", produitRoutes)

app.listen ( process.env.PORT , () => { 
    console . log ( "Le serveur s'exécute sur le port 3000" ); 
});

process.on("unhandledRejection", err => {
    console.log(`Une erreur est survenue: ${err.message}`)
    app.close(() => process.exit(1))
})