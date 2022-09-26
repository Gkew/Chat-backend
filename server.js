//BD = Chatt
//COLLECTION = Users
const dotenv = require("dotenv");
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require("express");
const app = express();
const cors = require("cors");
const healthcheck = require('healthcheck')
const userRoutes = require("./routes/userRoutes")
const messageRoute = require("./routes/messageRoutes")
// const User = require("./Models/roomSchema.js");
//Mockserver on PORT 3000
const PORT = process.env.PORT;
// const SOCKETPORT = process.env.SOCKETPORT;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Socket.io
app.use(cors());


// const io = require("socket.io")(SOCKETPORT, {
//   cors: {
//     origin: ["http://localhost:8080" ],
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

const mongoose = require("mongoose");
dotenv.config();
const mongoDB = process.env.DB_HOST;
const socket = require("socket.io");

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/health', require('./routes/healthcheck'));
app.use(cors());
app.use("/user", userRoutes)
app.use("/messages", messageRoute)
//Get, sending a string
app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes

// Read
/**
 * @openapi
 * /users:
 *  get:
 *    description: Use to fetch all the users
 *    responses:
 *      '200':
 *        description: A successful response
 */

// //Get all users
// app.get("/allUser", async (req, res) => {
//   const client = new MongoClient(mongoDB);

//   try {
//     await client.connect();
//     const users = client.db("Chatt").collection("Users");
//     const response = await users.find().toArray();
//     res.send(response);
//   } finally {
//     await client.close();
//   }
// });

// //Post new users
// app.post("/postUser", async (req, res) => {
//   const client = new MongoClient(mongoDB);
//   const {userName, messageText, room} = req.body;
//   const date = Date(Date.now());
//   timestamp = date.toString()

//   try {
//     await client.connect()


//     const collectionUser = client.db('Chatt').collection("Users");
//     const data = {
//       userName,
//       messageText,
//       room

//     }

//     await collectionUser.insertOne(data)
//     res.send(data)

//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// });

// //Delete ONE user by ID
// app.delete('/deleteUser/:id',async (req,res) =>{
//   const {id} = req.params
//   const client = new MongoClient(mongoDB);
//   try{
//     await client.connect()
//     const collectionUser = client.db('Chatt').collection("Users");

//     await collectionUser.findOneAndDelete({"_id": ObjectId(id)})
//     res.send('Deleted id: ' + id)
//   }catch (err){
//     console.log(err)
//   } finally {
//     await client.close()
//   }
// })

// app.put('/updateUser/:id',async (req,res) =>{
//   const {id} = req.params
//   const {user} = req.body
//   const client = new MongoClient(mongoDB);
//   try{
//     await client.connect()
//     const collectionUser = client.db('Chatt').collection("Users");

//     await collectionUser.findOneAndUpdate({"_id": ObjectId(id)}, {$set: {"user" : user }} )
//     res.send('Updated user with: ' + id  +' to: '+ user)
//   }catch (err){
//     console.log(err)
//   } finally {
//     await client.close()
//   }
// })

const server = app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});


const io = socket(server,{
  cors:{
      origin:"http://localhost:3000",
      credentials: true,
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
      onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
});

function stop() {
  server.close();
}

module.exports.stop = stop;
