const express = require("express")
const router = express.Router()
const produitsController = require("../controllers/produitController")
const verifyToken = require("../middleware/verifyToken");

router.get('/', verifyToken, produitsController.getAllProduits );
router.get('/:id', verifyToken, produitsController.getProduitById );
router.post('/add', verifyToken, produitsController.createProduit );
router.put('/edit/:id', verifyToken, produitsController.updateProduit );
router.delete('/delete/:id', verifyToken, produitsController.deleteProduit );

module.exports = router;