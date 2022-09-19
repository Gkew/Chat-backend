/**
 * @group component
 */
const { expect } = require('chai');
 const chai = require('chai')
 const chaiHttp = require('chai-http');
 chai.use(chaiHttp);
 
 process.env.NODE_ENV = 'test'
 const BACKEND_HOST = "http://localhost:3001"
 


const testId = "630763f491271649c658b873";

 describe('/GET user', () => {
     it('should GET all users', (done) => {
         chai.request(BACKEND_HOST)
           .get('/allUser')
           .end((err, res) => {
             expect(res).to.have.status(200)
             expect(res.body).to.not.be.null
             expect(res.body).to.be.an('array')
             done()
           })
     })
 })

 const newUser = {
    user: "hello"
  }
 describe("POST a new user", () => {
    it("should add new user", async () => {
        chai.request(BACKEND_HOST)
        .post('/postUser')
        .end((err, res) => {
            expect(response.statusCode).toBe(201);
            expect(lastItem.item).toBe(newUser["string"]);
            expect(lastItem.completed).toBe(newUser["completed"]);
          done()
        })
  })
})
     

  describe('/Delete user by id ', ()=>{
      it('Delete a user by id', (done)=>{
          chai.request(BACKEND_HOST)
          .delete('/deleteUser/' + testId )
          .end((err,res) =>{
            expect(200, res.status);
            expect('Deleted id: ' + testId , res.text)
              done();
          })
 
      })
  })

