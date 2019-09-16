// 1. 状态 resolved rejected pengding
// 2. 方法 then

const Promise = require('./promise')

let p = new Promise(function(resolve,reject) {
    console.log('start')
    reject('情人节到了')
    resolve('情人到了')
})

p
    .then(value => {
        console.log('success', value)
    }, reason => {
        console.log('error', reason)
    })

console.log('end')