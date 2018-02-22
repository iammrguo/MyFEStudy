import _ from 'lodash';
import printMe from './print.js';
import './style.css';
// import Icon from './icon.jpg';
import Data from './data.xml';
import { cube } from './math.js';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack', cube(5)], ' ');
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

let element = component();
document.body.appendChild(element);

if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    });
}