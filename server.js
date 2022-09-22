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

