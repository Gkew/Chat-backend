const Users = require("../Models/userSchema")

module.exports.addUser = async (req,res) =>{
    try{
        const {userId,displayName,photoUrl} = req.body;
        const userNameCheck = await Users.findOne({userId})
        if(userNameCheck){
            return res.json({BackendMessage: "Username already exists"})
        }
        const user = await Users.create({
            userId,
            displayName,
            photoUrl
        })

        return res.json({status: true, user})

    }catch (err){
        console.log(err)
    }
}

module.exports.allUsers = async (req,res) => {

    try{
        const users = await Users.find({_id: {$ne:req.params.id}}).select([
            "_id",
            "displayName",
            "photoUrl"
        ])

        return res.json({status:true, users})
    }catch(err){
        console.log(err)
    }
}

module.exports.getUserId =  async (req,res,next) => {
    try{
        const user = await Users.find({userId: req.params.id})
        console.log(user)
        return res.json(user[0]._id)
    }catch (err){
        next(err)
    }
}
