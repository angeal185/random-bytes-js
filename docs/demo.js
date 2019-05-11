// demo only

let obj = {
  rand: 'as string',
  randUint8: 'as Uint8 array',
  randArr: 'as numbered array',
  randNumStr: 'as numbered string',
  randHex: 'to hex',
  rand64: 'to base64'
}

$('body').append('<div class="container"><h1 class="text-center mb-4">random-bytes-js</h1><div class="row main"></div></div>');

$.each(obj, function(i,e){
  $.each(['sync','callback'], function(w,x){
  $('.main').append('<div class="col-sm-6"><label>random bytes '+ e +' '+x+'</label><input id="'+i+x+'" type="text" class="form-control mb-4" readonly></div>')
  })
})

function initTest(){
  //bytes as string
  $('#randsync').val(rbjs.rand(10))

  rbjs.rand(10, function(err, res){
    if(err){return console.log(err)}
    $('#randcallback').val(res)
  })

  //bytes as Uint8 array
  $('#randUint8sync').val(rbjs.randUint8(10))

  rbjs.randUint8(10, function(err, res){
    if(err){return console.log(err)}
    $('#randUint8callback').val(res)
  })

  //bytes as numbered array
  $('#randArrsync').val(rbjs.randArr(10))

  rbjs.randArr(10, function(err, res){
    if(err){return console.log(err)}
    $('#randArrcallback').val(res)
  })

  //bytes as numbered string
  $('#randNumStrsync').val(rbjs.randNumStr(10))

  rbjs.randNumStr(10, function(err, res){
    if(err){return console.log(err)}
    $('#randNumStrcallback').val(res)
  })


  //bytes to hex
  $('#randHexsync').val(rbjs.randHex(10))

  rbjs.randHex(10, function(err, res){
    if(err){return console.log(err)}
    $('#randHexcallback').val(res)
  })

  //bytes to base64
  $('#rand64sync').val(rbjs.rand64(10))

  rbjs.rand64(10, function(err, res){
    if(err){return console.log(err)}
    $('#rand64callback').val(res)
  })
}

$(document).ready(function() {
  setInterval(function(){
    initTest();
  },1000)
});
