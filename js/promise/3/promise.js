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
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        reject(new TypeError('不能循环引用'))
    }
    let called = false
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        let then = x.then
        if (typeof then === 'function') {
            try {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } catch (err) {
                if (called) return
                called = true
                reject(err)
            }
        } else {
            if (called) return
            called = true
            resolve(x)
        }
    } else {
        if (called) return
        called = true
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
                    resolvePromise(promise2, x, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            }, 0)
        } else if (self.state === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
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
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            })
            self.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason)
                        resolvePromise(promise2, x, resolve, reject)
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

module.exports = Promise