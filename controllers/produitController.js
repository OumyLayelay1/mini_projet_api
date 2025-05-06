const Produit = require('../models/produit');
const fs = require("fs");
const path = require("path");
const { cloudinary } = require('../config/cloudinary');


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
    const { title, prix, description } = req.body;
    const image = req.file ? req.file.path : null;
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
  const { title, prix, description, user: userId } = req.body;
  const newImage = req.file ? req.file.path : null;

  try {
    const produit = await Produit.findById(id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Si une nouvelle image est uploadée, supprimer l'ancienne image de Cloudinary
    if (newImage && produit.image) {
      // Extraire le `public_id` de l'URL Cloudinary actuelle
      const segments = produit.image.split('/');
      const filename = segments[segments.length - 1]; // Récupère le nom du fichier
      const publicId = filename.split('.')[0]; // Récupère le `public_id` (avant l'extension)

      try {
        // Supprimer l'image sur Cloudinary
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Erreur lors de la suppression de l'image sur Cloudinary :", err.message);
      }
    }

    // Mise à jour des champs du produit
    produit.title = title || produit.title;
    produit.prix = prix || produit.prix;
    produit.description = description || produit.description;
    produit.user = userId || produit.user;
    
    if (newImage) produit.image = newImage; // Remplacer l'ancienne image par la nouvelle

    // Sauvegarder les modifications
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
