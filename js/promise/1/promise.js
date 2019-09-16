function Promise(executor) {
    let self = this
    self.value = undefined
    self.reason = undefined
    self.state = 'pending'

    function resolve(value) {
        if (self.state === 'pending') {
            self.value = value
            self.state = 'resolved'
        }
    }

    function reject(reason) {
        if (self.state === 'pending') {
            self.reason = reason
            self.state = 'rejected'
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
    }
}

module.exports = Promise