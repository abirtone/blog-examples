var should = require('should');
var request = require('supertest');
var app = require('../application');

var context = describe;

context('Agenda Service',function(){
    context('POST /agendas- Test Agenda creation service', function () {
        context('Check response when we do not send the required field title', function () {
            it('should response 400 http status code', function (done) {
                request(app)
                    .post('/agendas')
                    .send({ description:'new agenda'})
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect({errors:[{ param: 'title', msg: 'required'}]})
                    .end(done);
            });
        });
        context('Check response when the body is empty', function () {
            it('should response 400 http status code', function (done) {
                request(app)
                    .post('/agendas')
                    .send({})
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(400)
                    .expect({errors:[{ param: 'title', msg: 'required'}]})
                    .end(done);
            });
        });
        context('Check response when the agenda is created successfully.', function () {
            it('should response 201 http status code', function (done) {
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
