
// 递归解析Promise
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  let called;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, function (y) {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, function (r) {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

function Promise(executor) {
  let that = this;
  that.status = 'pending';
  that.value = undefined;
  that.reason = undefined;
  that.onResolvedCallbacks = [];
  that.onRejectedCallbacks = [];

  // resolve
  function resolve(value) {
    if (that.status === 'pending') {
      that.status = 'fulfilled';
      that.value = value;
      that.onResolvedCallbacks.forEach(function (fn) {
        fn();
      });
    }
  }

  // reject
  function reject(reason) {
    if (that.status === 'pending') {
      that.status = 'rejected';
      that.reason = reason;
      that.onRejectedCallbacks.forEach(function (fn) {
        fn();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e); // 如果发生错误 可以直接变成失败态
  }
}

Promise.prototype.then = function (onFulfiled, onRejected) {
  onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : function (data) {
    return data;
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
    throw err;
  }
  let that = this;
  let promise2;
  promise2 = new Promise(function (resolve, reject) {
    if (that.status === 'fulfilled') {
      setTimeout(() => {
        try {
          let x = onFulfiled(that.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }
    if (that.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    }
    if (that.status === 'pending') {
      that.onResolvedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onFulfiled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      that.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      })
    }
  });
  return promise2;
}
Promise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback);
}
Promise.prototype.finally = function (callback) {
  return this.then(function (data) {
    callback();
    return data;
  }, function (err) {
    callback();
    return err;
  });
}

Promise.resolve = function (value) {
  return new Promise(function (resolve, reject) {
    resolve(value);
  });
}
Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
}
Promise.deferred = Promise.defer = function () {
  let dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let arr = [];let i = 0
    function processData(index, value) {i++;
      arr[index] = value;
      if (i === promises.length) {resolve(arr);}
    }
    for (let i = 0; i < promises.length; i++) {
      let current = promises[i];
      if (typeof current === 'object' && current.then) {
        current.then(function (data) {
          processData(i, data);
        }, reject);
      } else {
        processData(i, current);
      }
    }
  })
}
Promise.race = function (promises) {
  return new Promise(function (resolve,reject) {
    for(let i = 0 ;i < promises.length;i++){
      let current = promises[i];
      current.then(function (data) {
        resolve(data);
      },function (err) {
        reject(err);
      });
    }
  })
}
module.exports = Promise;