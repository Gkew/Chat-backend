/**
 * @group component
 */

 const { expect } = require('chai');
 const chai = require('chai')
 const chaiHttp = require('chai-http');
 chai.use(chaiHttp);
 process.env.NODE_ENV = 'test'
 const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:3001"

 //Get all users
 describe('/GET user', () => {
     it('it should GET all the users', (done) => {
         chai.request(BACKEND_HOST)
           .get('/user/allusers')
           .end((err, res) => {
             expect(res).to.have.status(200)
             expect(res.body).to.not.be.null
             done()
           })
     })
 })
//Post a new user
 const newUser = {
  user: "hello"
}
describe("POST a new user", () => {
  it("should add new user", async () => {
      chai.request(BACKEND_HOST)
      .post('/user/adduser')
      .end((err, res) => {
          expect(response.statusCode).toBe(200);
          expect(lastItem.item).toBe(newUser["string"]);
          expect(lastItem.completed).toBe(newUser["completed"]);
        done()
      })
})
})

//Get all messages
describe('/GET messages', () => {
  it('it should GET all the messages', (done) => {
      chai.request(BACKEND_HOST)
        .get('/messages/getallmessages')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.not.be.null
          done()
        })
  })
})

//Post a messages

const newMessage = {
  message: "hello"
}
describe("POST a new message", () => {
  it("should add new message", async () => {
      chai.request(BACKEND_HOST)
      .post('/messages/addMessage')
      .end((err, res) => {
          expect(response.statusCode).toBe(200);
          expect(lastItem.item).toBe(newMessage["string"]);
          expect(lastItem.completed).toBe(newMessage["completed"]);
        done()
      })
})
})