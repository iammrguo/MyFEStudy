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

    executor(resolve, reject)
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    const self = this
    if (self.state === 'resolved') {
        onFulfilled(self.value)
    } else if (self.state === 'rejected') {
        onRejected(self.reason)
    } else if (self.state === 'pending') {
        // 为何要写成
        // push () => { onFulfilled(self.value) }
        self.onResolvedCallbacks.push(onFulfilled)
        self.onRejectedCallbacks.push(onRejected)
    }
}

module.exports = Promise