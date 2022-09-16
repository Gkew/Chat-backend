const { allUsers, addUser } = require("../controller/userController");


const router = require("express").Router();

router.post("/adduser", addUser)
router.get("/allusers/:id" , allUsers);

module.exports = router;