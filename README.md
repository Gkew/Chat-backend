# Chat-backend

### Creating mockserver with npm
npm i json-server  
touch dB.json
``` json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```
_Starting server_ json-server --watch db.json  

### Creating a real server and connectring to mongoDB  
#### server.js
````js
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
```js
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
