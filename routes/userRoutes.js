const { allUsers, addUser,getUserId } = require("../controller/userController");


const router = require("express").Router();

router.post("/adduser", addUser)
router.get("/allusers/:id" , allUsers);
router.get("/getuserid/:id",getUserId)
module.exports = router;