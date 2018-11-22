const crypto = require('crypto');

// TODO 这块继续积累，多了以后会生创建一个工具npm package，加油。
// md5加密
exports.md5 = function (content) {
  let md5 = crypto.createHash('md5');
  md5.update(content);
  return md5.digest('hex');
}

// 判断是否邮箱格式是否合法
exports.isEmail = function (string) {
  return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(string);
}

const writeUTF = function (str, isGetBytes) {
  var back = [];
  var byteSize = 0;
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    if (0x00 <= code && code <= 0x7f) {
      byteSize += 1;
      back.push(code);
    } else if (0x80 <= code && code <= 0x7ff) {
      byteSize += 2;
      back.push((192 | (31 & (code >> 6))));
      back.push((128 | (63 & code)))
    } else if ((0x800 <= code && code <= 0xd7ff) ||
      (0xe000 <= code && code <= 0xffff)) {
      byteSize += 3;
      back.push((224 | (15 & (code >> 12))));
      back.push((128 | (63 & (code >> 6))));
      back.push((128 | (63 & code)))
    }
  }
  for (i = 0; i < back.length; i++) {
    back[i] &= 0xff;
  }
  if (isGetBytes) {
    return back
  }
  if (byteSize <= 0xff) {
    return [0, byteSize].concat(back);
  } else {
    return [byteSize >> 8, byteSize & 0xff].concat(back);
  }
}
const readUTF = function (arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var UTF = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      UTF += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1
    } else {
      UTF += String.fromCharCode(_arr[i])
    }
  }
  return UTF
}
// 字符串转16进制
exports.stringToHex = function (str) {
  var charBuf = writeUTF(str, true);
  var re = '';
  for (var i = 0; i < charBuf.length; i++) {
    var x = (charBuf[i] & 0xFF).toString(16);
    if (x.length === 1) {
      x = '0' + x;
    }
    re += x;
  }
  return re;
}
// 16进制转字符串
exports.hexToString = function (str) {
  var buf = [];
  for (var i = 0; i < str.length; i += 2) {
    buf.push(parseInt(str.substring(i, i + 2), 16));
  }
  return readUTF(buf);
}

// 
exports.getIPAdress = function () {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}