import _ from 'lodash';
import printMe from './print.js';
import './style.css';
// import Icon from './icon.jpg';
import Data from './data.xml';


function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // // img
    // var myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);

    // xml
    console.log(Data);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());