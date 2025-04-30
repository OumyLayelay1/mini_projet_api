const express = require("express")
const router = express.Router()
const { register, login } = require("../controllers/authController")
// const { protect, isAdmin } = require("../middlewares/auth");
// const { update } = require("../controllers/userController");

router.route("/register").post(register);
router.route("/login").post(login);
// router.put("/update-role", protect, isAdmin, update);


module.exports = router