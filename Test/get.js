process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');




chai.use(chaiHttp);

describe('/GET users', ()=>{
    it('Get all users', (done)=>{
        chai.request("http://localhost:3005")
        .get('/allUser')
        .end((err,res) =>{
             chai.assert.equal(200, res.status);
             chai.assert.typeOf(res.body, 'array')
             chai.assert.lengthOf(res.body, 18);
            done();
        })

    })
})

