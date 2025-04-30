// let users = [];
const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération",
        error: error.message,
      });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "L'utilisateur avec cet ID est introuvable." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de l'utilisateur",
        error: error.message,
      });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    number,
    passWord,
    profession,
    role,
    requesterId,
  } = req.body;

  if (!requesterId || !role) {
    return res
      .status(400)
      .json({ message: "ID du demandeur ou rôle manquant" });
  }

  try {
    // const requester = await User.findById(requesterId);
    // if (!requester || requester.role !== "admin") {
    //   return res
    //     .status(403)
    //     .json({ message: "Seul un admin peut mettre à jour un utilisateur" });
    // }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des champs
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.number = number || user.number;
    user.passWord = passWord || user.passWord;
    user.profession = profession || user.profession;

    // Si un nouveau rôle est fourni (et que ce n'est pas redondant)
    if (role && user.role !== role) {
      user.role = role;
    }

    await user.save();

    return res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de l'utilisateur",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès", user });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue", error: error.message });
  }
};

exports.getUserWithProduits = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("produits");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};