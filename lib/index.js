
// js randomBytes
'use strict'

function RBJS(){
  // shuffle seed
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // create random seed then shuffle
  function randSeed(length, max) {
    return parseInt(shuffle(Array.apply(null, Array(length)).map(function() {
      return Math.round(Math.random() * max);
    })).join(''));
  }

  //prng
  const Mt = function() {
    let seed = randSeed(15, 9);
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    this.U_MASK = 0x80000000;
    this.L_MASK = 0x7fffffff;

    this.mt = new Array(this.N);
    this.mti = this.N + 1;

    this.init_genrand(seed);
  }

  Mt.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      let s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) +
        this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  Mt.prototype.genrand_int32 = function() {
    let y,
        mag01 = new Array(0x0, this.MATRIX_A);

    if (this.mti >= this.N) {
      let kk;
      if (this.mti == this.N + 1) {
        this.init_genrand(5489);
      }

      for (kk = 0; kk < this.N - this.M; kk++) {
        y = (this.mt[kk] & this.U_MASK) | (this.mt[kk + 1] & this.L_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y = (this.mt[kk] & this.U_MASK) | (this.mt[kk + 1] & this.L_MASK);
        this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N - 1] & this.U_MASK) | (this.mt[0] & this.L_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
      this.mti = 0;
    }

    y = this.mt[this.mti++];
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  //random byte array
  Mt.prototype.randByteArr = function(len) {
    if(!len || typeof len !== 'number'){
      return null;
    }
    try {
      let arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(Math.round(this.genrand_int32() * (1.0 / 4294967296.0) * 256))
      }
      return arr
    } catch (err) {
      if(err){return null;}
    }
  }

  //random numbered string
  Mt.prototype.randNumStr = function(len, i) {
    if(!len || typeof len !== 'number'){
      return null;
    }
    try {
      return this.randByteArr(len).join(' ');
    } catch (err) {
      if(err){return null;}
    }
  }

  //random Uint8 array
  Mt.prototype.randUint8 = function(len) {
    if(!len || typeof len !== 'number'){
      return null;
    }
    try {
      return new Uint8Array(this.randByteArr(len));
    } catch (err) {
      if(err){return null;}
    }
  }

  //random bytes as string
  Mt.prototype.randBytes = function(len) {
    if(!len || typeof len !== 'number'){
      return null;
    }
    try {
      let str = '';
      for (var i = 0; i < len; i++) {
        str += String.fromCharCode(
          Math.round(this.genrand_int32() * (1.0 / 4294967296.0) * 256)
        )
      }
      return str;
    } catch (err) {
      if(err){return null;}
    }
  }

  //random bytes to hex
  Mt.prototype.randHex = function(len) {
    if(!len || typeof len !== 'number'){
      return null;
    }
    try {
      let res = '',
          str = this.randBytes(len);
      for (var i=0; i<str.length; i++) {
        res += str.charCodeAt(i).toString(16);
      }
      return res;
    } catch (err) {
      if(err){return null;}
    }
  }

  //random bytes to base64
  Mt.prototype.rand64 = function(len) {
    if(!len || typeof len !== 'number'){
      return null
    }
    try {
      return Buffer.from(this.randBytes(len)).toString('base64');
    } catch (err) {
      if(err){return null;}
    }
  }

  const crypt = new Mt();
  let err = false,
  errMsg = 'length must be integer',
  res;

  return {
    rand: function(len, cb){
      res = crypt.randBytes(len)
      if(!cb && typeof len === 'number'){
        res = crypt.randBytes(len)
        return res;
      }
      if(!cb && typeof len !== 'number' && typeof len !== 'function'){
        return errMsg;
      }
      if(typeof len === 'function'){
        len(errMsg,null);
        return
      }
      if(len === null){
        err = errMsg;
      }
      cb(err,res);
    },
    randUint8: function(len, cb){
      res = crypt.randUint8(len)
      if(!cb && typeof len === 'number'){
        return res;
      }
      if(!cb && typeof len !== 'number' && typeof len !== 'function'){
        return errMsg;
      }
      if(typeof len === 'function'){
        len(errMsg,null);
        return
      }
      if(len === null || typeof len !== 'number'){
        err = errMsg;
      }
      cb(err,res);
    },
    randArr: function(len, cb){
      res = crypt.randByteArr(len, cb)
      if(!cb && typeof len === 'number'){
        return res;
      }
      if(!cb && typeof len !== 'number' && typeof len !== 'function'){
        return errMsg;
      }
      if(typeof len === 'function'){
        len(errMsg,null);
        return
      }
      if(len === null || typeof len !== 'number'){
        err = errMsg;
      }
      cb(err,res);
    },
    randNumStr: function(len, cb){
      res = crypt.randNumStr(len)
      if(!cb && typeof len === 'number'){
        return res;
      }
      if(!cb && typeof len !== 'number' && typeof len !== 'function'){
        return errMsg;
      }
      if(typeof len === 'function'){
        len(errMsg,null);
        return
      }
      if(len === null || typeof len !== 'number'){
        err = errMsg;
      }
      cb(err,res);
    },
    randHex: function(len, cb){
      res = crypt.randHex(len)
      if(!cb && typeof len === 'number'){
        return res;
      }
      if(!cb && typeof len !== 'number' && typeof len !== 'function'){
        return errMsg;
      }
      if(typeof len === 'function'){
        len(errMsg,null);
        return
      }
      if(len === null || typeof len !== 'number'){
        err = errMsg;
      }
      cb(err,res);
    },
    rand64: function(len, cb){
      res = crypt.rand64(len);
      if(!cb && typeof len === 'number'){
        return res;
      }
      if(!cb && typeof len !== 'number' && typeof len !== 'function'){
        return errMsg;
      }
      if(typeof len === 'function'){
        len(errMsg,null);
        return
      }
      if(len === null || typeof len !== 'number'){
        err = errMsg;
      }
      cb(err,res);
    }
  }
}

const rbjs = new RBJS();

module.exports = rbjs;
