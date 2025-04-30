const Produit = require('../models/produit');
const User = require('../models/user');

exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération",
        error: error.message,
      });
  }
};

exports.createProduit = async (req, res) => {
  try {
    const { title, image, prix, description } = req.body;
    const userId = req.user.id;

    const produit = new Produit({
      title,
      image,
      prix,
      description,
      user: userId
    });

    await produit.save();

    res.status(201).json({ message: "Produit créé", produit });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);

    if (!produit) {
      return res
        .status(404)
        .json({ message: "Le produit avec cet ID est introuvable." });
    }

    res.status(200).json(produit);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération du produit",
        error: error.message,
      });
  }
};

exports.updateProduit = async (req, res) => {
  const { id } = req.params;
  const {
    title,
      image,
      prix,
      description,
      user: userId
  } = req.body;

  try {

    const produit = await Produit.findById(id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Mise à jour des champs
    produit.title = title || produit.title;
    produit.prix = prix || produit.prix;
    produit.image = image || produit.image;
    produit.description = description || produit.description;
    produit.user = userId || produit.user;

    await produit.save();

    return res.status(200).json({
      message: "Produit mis à jour avec succès",
      produit,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du produit",
      error: error.message,
    });
  }
};

exports.deleteProduit = async (req, res) => {
  const { id } = req.params;

  try {
    const produit = await Produit.findByIdAndDelete(id);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit supprimé avec succès", produit });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue", error: error.message });
  }
};
