var should = require('should');
var request = require('supertest');
var app = require('../application');

var context = describe;

context('Contact Service',function(){
    context('POST /agendas/:ageda_id/contacts - Test Contact Creation service', function () {
        context('Check response when we do not send the required field title', function () {
            it('should response 400 http status code', function (done) {
                request(app)
                    .post('/agendas')
                    .send({title:'Family', description:'just family contacts'})
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(201)
                    .end(done);
            });
        });
    });
});
