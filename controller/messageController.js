const messageModel = require("../Models/messageSchema")


module.exports.addMessage = async (req, res) => {

    try{
        const {from,to ,message} = req.body;


        const mezzage = {
            message:{text:message},
            users: [from, to],
            sender: from,
        }

        const data = messageModel.create(mezzage);

        if(data) return res.json({msg:"Message sent"});
        return res.json({ msg: "Something went wrong"})
    }
    catch(err){
        console.log(err)
    }
};

module.exports.getAllMessages = async (req, res, next) => {
    try{
        const {from, to} = req.body
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            }
        }).sort({updatedAt: 1})
        const projectMessages = messages.map((msg) =>{
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectMessages)
    }catch (err){
        next(err)
    }
};

//
// [{fromSelf:true, message:"this is a message"}, {fromSelf:true, message:"this is a message"}, {fromSelf:true, message:"this is a message"}]
//

