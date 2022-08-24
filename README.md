# Chat-backend

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
const mongoDB = 'mongodb+srv://Emmi:banan@cluster0.lzx1kr4.mongodb.net/?retryWrites=true&w=majority';
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
```
