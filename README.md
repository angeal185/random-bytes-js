# random-bytes-js
pseudo random bytes in javascript for the browser

demo: https://angeal185.github.io/random-bytes-js

### Installation

npm

```sh
$ npm install random-bytes-js --save
```

bower

```sh
$ bower install random-bytes-js
```

git
```sh
$ git clone git@github.com:angeal185/random-bytes-js.git
```

#### browser

```html
<script src="./dist/random-bytes.min.js"></script>
```

### nodejs

```js
const rbjs = require('random-bytes-js')
```

#### API

```js

/**
 *  @param {integer} int ~ bytes length
 *  @param {function} cb ~ optional callback function(err,res)
 **/

// random bytes as string
rbjs.rand(int, cb)

// random bytes as Uint8 array
rbjs.randUint8(int, cb)

// random bytes as numbered array
rbjs.randArr(int, cb)

// random bytes as numbered string
rbjs.randNumStr(int, cb)

// random bytes to hex
rbjs.randHex(int, cb)

// random bytes to base64
rbjs.rand64(int, cb)


//demo

let sync;

sync = rbjs.rand(10);
console.log(sync)

rbjs.rand(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})


sync = rbjs.randUint8(10);
console.log(sync)

rbjs.randUint8(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})


sync = rbjs.randArr(10);
console.log(sync)

rbjs.randArr(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})


sync = rbjs.randNumStr(10);
console.log(sync)

rbjs.randNumStr(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})


sync = rbjs.randHex(10);
console.log(sync)

rbjs.randHex(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})


sync = rbjs.rand64(10);
console.log(sync)

rbjs.rand64(10, function(err, res){
  if(err){return console.log(err)}
  console.log(res)
})


```
