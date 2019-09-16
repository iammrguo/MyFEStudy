// 1. new Promise 中可以处理异步逻辑
// 2. 同一个实例可以多次then

const Promise = require('./promise')

let p = new Promise(function(resolve,reject) {
    setTimeout(function(){
        resolve('情人节到了');
    },1000)
})

p.then(value => {
    console.log('success1', value)
}, reason => {
    console.log('error1', reason)
})

p.then(value => {
    console.log('success2', value)
}, reason => {
    console.log('error2', reason)
})

console.log('end')