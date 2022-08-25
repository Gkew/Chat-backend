process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const variable = "63064f878c37d5499f2ac6d4";

describe('/Delete user by id ', ()=>{
    it('Delete a user by id', (done)=>{
        chai.request("http://localhost:3005")
        .delete('/deleteUser/' + variable )
        .end((err,res) =>{
             chai.assert.equal(200, res.status);
             chai.assert.equal('Deleted id: ' + variable , res.text)
            done();
        })

    })
})

