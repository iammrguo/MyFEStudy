function Promise(executor) {
    let self = this
    self.value = undefined
    self.reason = undefined
    self.state = 'pending'
    self.onResolvedCallbacks = []
    self.onRejectedCallbacks = []

    function resolve(value) {
        if (self.state === 'pending') {
            self.value = value
            self.state = 'resolved'
            self.onResolvedCallbacks.forEach(fn => fn(self.value))
        }
    }

    function reject(reason) {
        if (self.state === 'pending') {
            self.reason = reason
            self.state = 'rejected'
            self.onRejectedCallbacks.forEach(fn => fn(self.reason))
        }
    }

    try {
        executor(resolve, reject)
    } catch (err) {
        reject(err)
    }
}

// 递归解析 promise
function resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('不能循环引用'))
    }
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        let called = false
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolutionProcedure(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (err) {
            if (called) return
            called = true
            reject(err)
        }
    } else {
        resolve(x)
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
        throw err
    }

    const self = this
    // .then 返回一个 promise
    let promise2 = new Promise((resolve, reject) => {
        if (self.state === 'resolved') {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            }, 0)
        } else if (self.state === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolutionProcedure(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            }, 0)
        } else if (self.state === 'pending') {
            // 为何要写成
            // push () => { onFulfilled(self.value) }
            self.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value)
                        resolutionProcedure(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            })
            self.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason)
                        resolutionProcedure(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            })
        }
    })

    return promise2
}

// 实现一个promise的延迟对象 defer
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

Promise.prototype.catch = function (errFn) {
    return this.then(null,errFn)
}
Promise.all = function (values){
    return new Promise((resolve,reject) => {
        let arr = [] // 最终结果的数组
        let index = 0
        function processData(key, value) {
            index++
            arr[key] = value
            if(index === values.length) { // 如果最终的结果的个数和values的个数相等 抛出结果即可
                resolve(arr)
            }
        }
        for(let i = 0; i < values.length; i++){
            let current = values[i];
            if(current && current.then && typeof current.then === 'function'){
                // promise
                current.then(y => {
                    processData(i, y);
                }, reject)
            } else {
                processData(i, current);
            }
        }
    })
}
Promise.race = function (values) { 
    return new Promise((resolve, reject) => {
        for(let i = 0; i < values.length; i++) {
            let current = values[i];
            if(current && current.then && typeof current.then == 'function'){
                // race方法 如果已经成功了 就不会失败了 反之一样
                current.then(resolve, reject)
            } else {
               resolve(current);
            }
        }
    });
}
Promise.resolve = function () {
    return new Promise((resolve, reject) => {
        resolve();
    })
}
Promise.reject = function () {
    return new Promise((resolve, reject) => {
        reject();
    })
}

module.exports = Promise