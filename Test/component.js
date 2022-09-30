/**
 * @group component
 */
const mongoose = require("mongoose");
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { request } = require("http");
const { json } = require("stream/consumers");
chai.use(chaiHttp);
process.env.NODE_ENV = "test";
const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:3001";
//Get all users
describe("/GET user", () => {
  it("it should GET all the users", (done) => {
    chai
      .request(BACKEND_HOST)
      .get("/user/allusers")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.null;
        done();
      });
  });
});
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

//Get all messages
describe("/GET messages", () => {
  it("it should GET all the messages", (done) => {
    chai
      .request(BACKEND_HOST)
      .get("/messages/getallmessages")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.null;
        done();
      });
  });
});

//Post a messages

const newMessage = {
  from: "testing",
  to: "testing123",
  message: "testing123537y578919548",
};

describe("POST a new message", () => {
  it("should add new message", (done) => {
    chai
      .request(BACKEND_HOST)
      .post("/messages/addmessage")
      .send({
        from: "6331ddb00f39f2b720a51d2f",
        to: "632462520c76f32ce5462b39",
        message: "test",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.not.be.null;
        const resText = JSON.parse(res.text);
        expect(resText.msg).to.equal("Message sent");
        done();
      });
  });
});
