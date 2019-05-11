const rbjs = require('../')

console.log(rbjs.rand(10))

rbjs.rand(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})

console.log(rbjs.randUint8(10))

rbjs.randUint8(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})

console.log(rbjs.randArr(10))

rbjs.randArr(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})

console.log(rbjs.randNumStr(10))

rbjs.randNumStr(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})

console.log(rbjs.randHex(10))

rbjs.randHex(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})

/*
// randomBytes ~ browser only
console.log(rbjs.rand64(10))

rbjs.rand64(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})
*/
