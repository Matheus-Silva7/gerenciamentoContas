const express = require("express");
const router = express.Router();

const userController = require("../controller/UserController");
const userIsAuth = require("../middleware/userIsAuth");


router.post("/signup", userController.createUser);
router.post("/signin", userController.signinUser);
router.get("/profile", userIsAuth, userController.getProfile);

module.exports = router;
 