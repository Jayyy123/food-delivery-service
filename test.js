const server = require('./src/app');
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
// let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const user = require('./src/models/user');
let should = chai.should();


chai.use(chaiHttp);


const newUser = {
    "first_name":"Test",
    "last_name":"Auth",
    "address":"dev",
    "email_id": "test@gmail.com",
	"password": "test"
}

const newOrder = {
                "email_id": newUser.email_id,
                "menuItem":"jambalaya rice",
                "quantity":"20"
            }

//Our parent block

describe('Signup a User', () => {

    beforeEach((done) => {
        user.remove({}, (err) => { 
           done();           
        });        
    });

    describe('/POST new user', () => {
        it('it should signup a new user', (done) => {

        chai.request(server)
            .post('/dev/api/v1/user/signup')
            .send(newUser)
            .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('access_token')
                done();
            });
        });

    });

})

describe('Signin a user', () => {

    describe('/POST signin user', () => {
        it('it should signin a user', (done) => {

        chai.request(server)
            .post('/dev/api/v1/user/signin')
            .send({
                "email_id":newUser.email_id,
                "password":newUser.password
            })
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.should.have.property('message');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('access_token')
                done();
            });
        });

    });

})



describe('Restaurants', () => {

/*
  * Test the /GET route
  */
  describe('/GET restaurants', () => {
      it('it should GET all the restaurants', (done) => {
        chai.request(server)
            .get('/dev/api/v1/restaurants/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
              
            });
      });
  });

  describe('/GET Menus', () => {
      it('it should GET all the menus', (done) => {
        chai.request(server)
            .get('/dev/api/v1/restaurants/menu')
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
              done();
            });
      });
  });

  describe('/POST order', () => {
    it('it should make an order to the server', (done) => {

      chai.request(server)
          .post('/dev/api/v1/orders')
          .send(newOrder)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
            done();
          });
        });

    });




  describe('/GET orders', () => {
      it('it should GET all the orders', (done) => {
        chai.request(server)
            .get('/dev/api/v1/orders?id=' + newUser.email_id)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('success');
                  res.body.should.have.property('message');
                  res.body.should.be.a('object');
              done();
            });
      });
      after((done) => process.exit())
  });

});