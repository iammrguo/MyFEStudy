//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    jslint = require('gulp-jslint'),
    testJson = require('./src/testJson.json'),
    fs = require('fs');

testJson.baseUrl = __dirname + '/';

// function readJson() {
//     var result = JSON.parse(fs.readFileSync('./src/testJson.json'));
//     return result;
// }
// 数组查找元素，返回位置
function indexOfArr (ele, arr) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (ele == arr[i]) {
            return i;
        }
    }
    return -1;
}

// 写json到文件
function writeJson (filename, jsonObj) {
    fs.writeFileSync(filename, JSON.stringify(jsonObj));
}

// json文件添加todo
function updateTodo (rightPath) {
    var i;
    rightPath = rightPath.replace(testJson.baseUrl, '');
    i = indexOfArr(rightPath, testJson.complete);
    if (i >= 0) {
        testJson.complete.splice(i, 1);
    }
    i = indexOfArr(rightPath, testJson.todo);
    if (i < 0) {
        testJson.todo.push(rightPath);
    }
    writeJson('./src/testJson.json', testJson);
    // console.log(testJson);
    console.log('update testJson.json ✓');
}

// json文件添加complete
function updateComplete (rightPath) {
    var i;
    rightPath = rightPath.replace(testJson.baseUrl, '');
    i = indexOfArr(rightPath, testJson.todo);
    if (i >= 0) {
        testJson.todo.splice(i, 1);
    }
    i = indexOfArr(rightPath, testJson.complete);
    if (i < 0) {
        testJson.complete.push(rightPath);
    }
    writeJson('./src/testJson.json', testJson);
    // console.log(testJson);
    console.log('update testJson.json ✓');
}

// gulp-jslint任务
function doTestJs (srcpath) {
    gulp.src(srcpath)
        .pipe(jslint({
            for: true
        }))
        .pipe(jslint.reporter('guo-reporter', {errorsOnly: false, complete: updateComplete, todo: updateTodo}))
        .on('error', function (error) {
            console.error(String(error));
        });
}

//定义一个testJs任务（自定义任务名称）
gulp.task('testJs', function () {
    // var testList = readJson();
    doTestJs(testJson.todo);
}); 
gulp.task('default',['testJs']); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

// 监听js变化
var watcher = gulp.watch('src/*.js');
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    doTestJs(event.path);
});