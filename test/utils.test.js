const {
  isEmail,
  stringToHex,
  hexToString,
  md5,
  getIPAdress
} = require('../helper/utils');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('isEmail()', function () {
  it("1234=false", function () {
    expect(isEmail("1234")).to.be.equal(false);
  })
  it("390805461@qq.com=true", function () {
    expect(isEmail("390805461@qq.com")).to.be.equal(true);
  })
  it("390805461@QQ..com", function () {
    expect(isEmail("390805461@QQ..com=true")).to.be.equal(false);
  })
  it("contains chinese invalid", function () {
    expect(isEmail("中文@QQ.com")).to.be.equal(false);
  })
})

describe('stringToHex()', function () {
  it('你们好', function () {
    assert.equal(stringToHex('你们好'), "e4bda0e4bbace5a5bd");
  })
  it('zhangdianjun', function () {
    assert.equal(stringToHex('zhangdianjun'), "7a68616e676469616e6a756e");
  })
  it('space', function () {
    assert.equal(stringToHex(' '), "20");
  })
})

describe('hexToString()', function () {
  it('space 20', function(){
    assert.equal(hexToString('20'), ' ');
  })
})
describe('md5()', function () {
  it('z_dianjun@163.com', function () {
    assert.equal(md5('z_dianjun@163.com'), 'a2758e31df7c2a74dda56b8959749587');
  })
})

describe('getIPAdress()', function () {
  it('getIPAdress', function () {
    assert.equal(getIPAdress(), '192.168.22.132');
  })
})