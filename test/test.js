import app from '../src/app';
import supertest from 'co-supertest';
import should from 'should';
let request = supertest(app);

describe('node-es6-demo',()=>{
  it('test /index/version',function*(){
    yield request.get('/index/version').expect(200).expect((res)=>{
      res.body.version.should.eql('1.0.0');
    });
  });
  it('test /index',function*(){
    yield request.get('/index').expect(200).expect((res)=>{
      res.body.code.should.eql(0);
    });
  });
  it('test /index/info',function*(){
    yield request.post('/index/info').send({
    	"nickname" : "xiaochi",
    	"age"  : "26",
    	"hobbys" : ["node","koa","express","react","vue","avalon"]
    }).expect(200).expect((res)=>{
      //console.log(res.body)
      res.body.code.should.eql(0);
    });
  });
});
