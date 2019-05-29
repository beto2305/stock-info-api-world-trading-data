//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let assert = require("assert");

let server = require("../server");
let should = chai.should();
let Stock = require("../app/model/stock");

chai.use(chaiHttp);
//Our parent block
describe("World Trading Data API", () => {
  /*
   * Test the API routes
   */
  describe("Validate database Connection", () => {
    beforeEach(function() {
      return Stock.deleteOne({ symbol: "ABCD" });
    });

    beforeEach("abc", function() {
      let stock = new Stock();
      stock.symbol = "ABCD";
      return stock.save();
    });
    it("it should find Stock{symbol: ABCD}", done => {
      Stock.findOne({ symbol: "ABCD" }).then(stock => {
        assert(stock.symbol === "ABCD");
        done();
      });
    });
  });
  describe("Validate REST API", () => {
    it("it should GET 200 http status when trying to access root directory /", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("core");
          res.body.should.have.property("version");
          res.body.should.have.property("date");
          done();
        });
    });

    it("it should GET 404 http status when trying to access an invalid endpoint", done => {
      chai
        .request(server)
        .get("/blah")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("error");
          res.body.should.have.property("error").to.be.equal("URL not found");
          res.body.should.have.property("message");
          done();
        });
    });

    it("it should GET 400 http status when trying to start Routine API missing request params", done => {
      chai
        .request(server)
        .get("/api/v1/wtd/start/")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("code");
          res.body.should.have.property("message");
          done();
        });
    });
  });
});
