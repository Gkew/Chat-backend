const { addMessage, getAllMessages } = require("../controller/messageController.js");



const router = require("express").Router();

router.post("/addMessage" , addMessage);
router.post("/getmessages" , getAllMessages);
router.get("/getallmessages" , getAllMessages);
;

module.exports = router;