process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// let variable;

describe('/Post user', ()=>{
    it('Post a user', (done)=>{
        let user = {
            user : "Testing123"
        }
        chai.request("http://localhost:3006")
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

