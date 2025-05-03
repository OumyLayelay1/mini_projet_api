const express = require("express")
const router = express.Router()
const produitsController = require("../controllers/produitController")
const upload = require('../middleware/upload'); // importe le middleware
const verifyToken = require("../middleware/verifyToken");

router.get('/', produitsController.getAllProduits );
router.post('/add', verifyToken, upload.single('image'), produitsController.createProduit );
router.put('/edit/:id', verifyToken, produitsController.updateProduit );
router.delete('/delete/:id', verifyToken, produitsController.deleteProduit );
router.get('/:id', produitsController.getProduitById );


module.exports = router;