const { addMessage, getAllMessages } = require("../controller/messageController");



const router = require("express").Router();

router.post("/addMessage" , addMessage);
router.post("/getmessages" , getAllMessages);
;

module.exports = router;