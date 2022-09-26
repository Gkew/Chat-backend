const messageModel = require("../Models/messageSchema")
var Stopwatch = require('timer-stopwatch');


module.exports.addMessage = async (req, res) => {

    try{
        var stopwatch = new Stopwatch();
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

// Post a new user
//  const newUser = {
//   userId : "aJQwXgDy5NMkrwgAzsSoMYA6adaw2",
//   displayName : "test_name",
//   photoUrl : "https://lh3.googleusercontent.com/a/AItbvmmJLXCNJcMRMo3C_TsrVL-7sbEUeeHSyJHUprvz=s96-c"
// }
// describe("POST a new user", () => {
//   it("should add new user", (done) => {
//       chai.request(BACKEND_HOST)
//       .post('/user/adduser')
//       .send(newUser)
//       .end((err, res) => {
//           expect(res.statusCode).to.equal(200);
//           expect(res.body).to.not.be.null;
//           const lastItem = JSON.parse(res.text)
//           expect(lastItem.user.userId).to.equal(newUser.userId);
//           expect(lastItem.user.displayName).to.equal(newUser.displayName);
//           expect(lastItem.user.photoUrl).to.equal(newUser.photoUrl);
//         done()
        
//       })
// })
// })