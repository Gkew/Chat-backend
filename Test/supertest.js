const supertest = require('supertest');
const express = require('express');

const app = express();

app.get('/user/allusers', function(req, res) {
  res.status(200).json({});
});

supertest(app)
  .get("/user/allusers")
  .expect(200)
  .then((response) => {
  })

  test("GET /user/allusers", async () => {
    await supertest(app)
        .get("/user/allusers")
        .expect(200)
        .then((response) => {
        })

})
app.post('/user/adduser', function(req, res) {
    res.status(200).json({});
  });

supertest(app)
  .post("/user/adduser")
  .expect(200)
  .then((response) => {
  })

  test("POST /user/adduser", async () => {
    await supertest(app)
        .post("/user/adduser")
        .expect(200)
        .then((response) => {
        })
})



app.get('/messages/getallmessages', function(req, res) {
    res.status(200).json({});
  });

supertest(app)
  .get("/messages/getallmessages")
  .expect(200)
  .then((response) => {
  })

  test("GET /messages/getallmessages", async () => {
    await supertest(app)
        .get("/messages/getallmessages")
        .expect(200)
        .then((response) => {
        })
})

app.post('/messages/addMessage', function(req, res) {
    res.status(200).json({});
  });

supertest(app)
  .post("/messages/addMessage")
  .expect(200)
  .then((response) => {
  })

  test("POST /messages/addMessage", async () => {
    await supertest(app)
        .post("/messages/addMessage")
        .expect(200)
        .then((response) => {
        })
})