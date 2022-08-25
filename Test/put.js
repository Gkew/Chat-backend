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

