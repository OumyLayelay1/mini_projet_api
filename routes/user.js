const express = require ( 'express' ); 
const router = express ();
const usersControler = require("../controllers/userController");

router.get('/', usersControler.getAllUsers );
router.get('/:id', usersControler.getUserById);
router.put('/edit/:id', usersControler.updateUser);
router.delete("/delete/:id", usersControler.deleteUser);
router.get("/:id/produits", usersControler.getUserWithProduits);

module.exports = router;