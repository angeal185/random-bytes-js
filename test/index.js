'use strict'

const rbjs = require('../');

// test
(function(){
  let errMsg = 'length must be integer',
  sync;

  function assertSync(i){
    if(i === errMsg){
      return false;
    }
    return true;
  }

  function syncTest(sync, i){
    if(!assertSync(sync)){
      console.log(i + ' sync fail');
    } else {
     console.log(i + ' sync pass');
     console.log(sync + '\n');
   }
  }

  sync = rbjs.rand(10);
  syncTest(sync, 'rand')
  rbjs.rand(10, function(err, res){
    if(err){return console.log('rand fail')}
    console.log('rand pass');
    console.log(res + '\n');
  })

  sync = rbjs.randUint8(10);
  syncTest(sync, 'randUint8')
  rbjs.randUint8(10, function(err, res){
    if(err){return console.log('randUint8 fail')}
    console.log('randUint8 pass');
    console.log(res + '\n');
  })

  sync = rbjs.randArr(10);
  syncTest(sync, 'randArr')
  rbjs.randArr(10, function(err, res){
    if(err){return console.log('randArr fail')}
    console.log('randArr pass');
    console.log(res + '\n');
  })

  sync = rbjs.randNumStr(10);
  syncTest(sync, 'randNumStr')
  rbjs.randNumStr(10, function(err, res){
    if(err){return console.log('randNumStr fail')}
    console.log('randNumStr pass');
    console.log(res + '\n');
  })

  sync = rbjs.randHex(10);
  syncTest(sync, 'randHex');
  rbjs.randHex(10, function(err, res){
    if(err){return console.log('randHex fail')}
    console.log('randHex pass');
    console.log(res + '\n');
  })

  sync = rbjs.rand64(10);
  syncTest(sync, 'rand64');
  rbjs.rand64(10, function(err, res){
    if(err){return console.log('rand64 fail')}
    console.log('rand64 pass');
    console.log(res + '\n');
  })

})()
