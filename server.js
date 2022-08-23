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
