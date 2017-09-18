require("!style-loader!css-loader!./index.css"); // 载入 style.css
document.write('It works.');
document.write(require('./module.js'));