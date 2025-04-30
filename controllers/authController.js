const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.Key;
const User = require("../models/user")
// let users = [];
const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
    const { firstName, lastName, email, number, password, profession } = req.body
    if (password.length < 8) {
      return res.status(400).json({ message: "Le mot de passe doit contenir 8 caractérs au moins" })
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        firstName,
        lastName,
        email,
        number,
        password: hashedPassword,
        profession,
        role: "user"
      }).then(user =>
        res.status(200).json({
          message: "Utilisateur créé avec succcés",
          user,
        })
      )
    } catch (err) {
      console.error("Erreur MongoDB:", err); // <-- Affiche l'erreur dans le terminal
      res.status(400).json({
        message: "La création de votre compte a échoué",
        error: err.message, // <- corrige le message d'erreur
      });
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email ou mot de passe manquant",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Connexion échouée",
        error: "Utilisateur introuvable",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // données embarquées
      JWT_SECRET,
      { expiresIn: "2h" } // durée de validité
    );

    return res.status(200).json({
      message: "Connexion réussie",
      user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

