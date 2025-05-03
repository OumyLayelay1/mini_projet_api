const express = require("express")
const router = express.Router()
const produitsController = require("../controllers/produitController")
const upload = require('../middleware/upload'); // importe le middleware
const Produit = require('../models/produit');
const verifyToken = require("../middleware/verifyToken");

router.get('/', produitsController.getAllProduits );
router.get('/:id', produitsController.getProduitById );
router.post('/add', verifyToken, produitsController.createProduit );
router.put('/edit/:id', verifyToken, produitsController.updateProduit );
router.delete('/delete/:id', verifyToken, produitsController.deleteProduit );

router.post('/add', upload.single('image'), async (req, res) => {
    try {
      const { title, prix, description } = req.body;
      const image = req.file.filename;
  
      const produit = new Produit({
        title,
        prix,
        description,
        image,
        userId: req.user.id, // ou autre source d'id utilisateur
      });
  
      await produit.save();
      res.status(201).json(produit);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
  });

module.exports = router;