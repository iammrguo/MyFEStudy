var fs = require('fs');
var list = {
    todo: ['src/test1.js', 'src/test2.js'],
    complete: []
}

function readJson() {
    var result = JSON.parse(fs.readFileSync('./src/testJson.js'));
    console.log(result.todo);
}

exports.readJson = readJson;
exports.todo = list.todo;
exports.complete = list.complete;