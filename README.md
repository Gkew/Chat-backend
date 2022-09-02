# Chat-backend

### TTFHW  
#### Backend
cd workspace  
mkdir Projectfolder  
git clone https://github.com/Gkew/Chat-backend.git  
cd chat-backend  
npm i  
_node server.js_


### Creating mockserver with npm
npm i json-server  
touch dB.json
``` json
{
  "users": [
    {
      "id": 1,
      "name": "Mikaeliiiiiiii",
      "age": "312"
    },
    {
      "id": 2,
      "name": "Axel",
      "age": "2352"
    },
    {
      "id": 3,
      "name": "Alex",
      "age": "312"
    },
    {
      "id": 4,
      "name": "Ganni",
      "age": "312"
    },
    {
      "id": 5,
      "name": "Moha",
      "age": "312"
    }
  ]
}
```
_Starting server_ json-server --watch db.json  

### Creating a real server and connectring to mongoDB  
#### server.js
``` js
const express = require("express");
const app = express();
//Mockserver on PORT 3000
const PORT = 3001;
const cors = require("cors");
const mongoose = require('mongoose');

const User = require('./Models/users.js')
const mongoDB = 'mongodb+srv://NAME:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true,
useUnifiedTopology: true}).then(() => {
    console.log("Connected")
}).catch(err => console.log(err))

app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
```

### Creating user model schema for _users_  
#### Models/users.js  
``` js
const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', usersSchema);

module.exports = User;
```
### Installing npm for testing  
_Bash_  
npm i chai  
npm i mocha  
### Creating CRUD for server.js with mongoDB  
_Server.js_  
``` js
//Get, sending a string
app.get("/", (req, res) => {
  res.send("Hello World");
});
//Get all users
app.get("/allUser", async (req, res) => {
  const client = new MongoClient(mongoDB);

  try {
    await client.connect();
    const users = client.db("Chatt").collection("Users");
    const response = await users.find().toArray();
    res.send(response);
  } finally {
    await client.close();
  }
});
//Post new users
app.post("/postUser", async (req, res) => {
  const client = new MongoClient(mongoDB);
  const {user} = req.body

  try {
    await client.connect()


    const collectionUser = client.db('Chatt').collection("Users");
    const data = {
      user : user,
    }

    await collectionUser.insertOne(data)
    res.send(data)

  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});
//Delete ONE user by ID
app.delete('/deleteUser/:id',async (req,res) =>{
  const {id} = req.params
  const client = new MongoClient(mongoDB);
  try{
    await client.connect()
    const collectionUser = client.db('Chatt').collection("Users");

    await collectionUser.findOneAndDelete({"_id": ObjectId(id)})

    res.send('Deleted id: ' + id)
  }catch (err){
    console.log(err)
  } finally {
    await client.close()
  }
})

app.put('/updateUser/:id',async (req,res) =>{
  const {id} = req.params
  const {user} = req.body
  const client = new MongoClient(mongoDB);
  try{
    await client.connect()
    const collectionUser = client.db('Chatt').collection("Users");

    await collectionUser.findOneAndUpdate({"_id": ObjectId(id)}, {$set: {"user" : user }} )
    res.send('Updated user with: ' + id  +' to: '+ user)
  }catch (err){
    console.log(err)
  } finally {
    await client.close()
  }
})
```
### Testing CRUD, Get request  
_Testing/get.js_  
``` js
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');




chai.use(chaiHttp);

describe('/GET users', ()=>{
    it('Get all users', (done)=>{
        chai.request("http://localhost:3003")
        .get('/allUser')
        .end((err,res) =>{
             chai.assert.equal(200, res.status);
             chai.assert.typeOf(res.body, 'array')
             chai.assert.lengthOf(res.body, 7);
            done();
        })

    })
})


```
<img src="https://github.com/Gkew/Chat-backend/blob/main/images/test%20get.jpg?raw=true" />

### Testing CRUD, post request  
_Test/post.js_  
``` js
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);



describe('/Post user', ()=>{
    it('Post a user', (done)=>{
        let user = {
            user : "Testing123"
        }
        chai.request("http://localhost:3003")
        .post('/postUser')
        .send(user)
        .end((err,res) =>{
             chai.assert.equal(200, res.status);
             chai.assert.typeOf(res.body, 'object')
             chai.assert.equal(res.body.user, "Testing123");
            done();
        })

    })
})


```
<img src="https://github.com/Gkew/Chat-backend/blob/main/images/test%20post.jpg?raw=true" />

### Testing CRUD, PUT request  
_Test/put.js_  
``` js
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const variable = "63064d2a168226aa648554ea";

describe('/Put user by id ', ()=>{
    it('Update a user', (done)=>{

        let potato = { user : "test"}

        chai.request("http://localhost:3005")
        .put('/updateUser/' + variable )
        .send(potato)
        .end((err,res) =>{
             chai.assert.equal(200, res.status);
             chai.assert.equal('Updated user with: ' + variable  +' to: ' + potato.user , res.text)
            done();
        })

    })
})


```
<img src="https://github.com/Gkew/Chat-backend/blob/main/images/put%20request.jpg?raw=true" />  

### Testing CRUD, delete request  
_Test/delete.js_  
``` js
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const variable = "63064f878c37d5499f2ac6d4";

describe('/Delete user by id ', ()=>{
    it('Delete a user by id', (done)=>{
        chai.request("http://localhost:3005")
        .delete('/deleteUser/' + variable )
        .end((err,res) =>{
             chai.assert.equal(200, res.status);
             chai.assert.equal('Deleted id: ' + variable , res.text)
            done();
        })

    })
})

```
<img src="https://github.com/Gkew/Chat-backend/blob/main/images/del%20request.jpg?raw=true" />  

### Creating MongoDB docker container  
``` js
docker run -d --name test-mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    mongo
    
    docker logs test-mongodb --follow
```
### Dockerfile  
#### touch Dockerfile  
_vim dockerfile_  
``` js
FROM node:12-alpine

WORKDIR /chat-backend

COPY package*.json ./

USER node

RUN npm install

EXPOSE 3000

```
### Dockerignore  
#### touch .dockerignore  
_node_modules_

### Setup for socket.io  
_npm i socket.io socket.io-client cors_  
cd server.js  
``` js
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

.....
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});
```
### Setup for firebase  
``` js
npm install -g firebase-tools  
firebase login
firebase init
firebase deploy
```
