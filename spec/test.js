const request = require("supertest");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");

const app = require("../app");

const userData = {
  socialService: 'FACEBOOK',
  socialId: 112034056905615,
  userName: 'asd',
  profileImage: 'image',
  socialToken: 'fbToken'
};

describe("POST login data ", () => {
  it("should not allow no have token user", done => {
    request(app)
      .get("/auth/user")
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).to.eql({ error: "unauthorized" });
        done();
      });
  });

  it("should generate token to valiud user", done => {
    request(app)
      .post("/auth/login/facebook")
      .send({...userData})
      .end((err, res) => {
        if(err){
          console.log(err);
          return done(err);
        }
        expect(Boolean(res.headers.usertoken)).to.equal(true);
        done();
      })
  });

});
