import './styles.less';

import { Observable } from 'rxjs/Observable';
// Static methods
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';


// Operators
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';








let result = 0;
let operation = '';
let display = false; // Boolean to hide the input after we hit the operator 

const buttons = document.getElementsByClassName("button-item");






const clickstream$ = Observable.of(buttons) // convert the list to an observable stream
                 .map(btn => Observable.fromEvent(btn, 'click').map(btn => btn.srcElement.innerText)) // capture the click events and extract the value
                 .mergeAll(); // out of all the buttons the event gets triggered from one button so we need to merge all the events emitted


clickstream$.subscribe(event => {


    if (/\d/.test(event) || event === '.') {
        // If the button is a number display it in the input field
        
        if (display) {
            document.getElementsByTagName('input')[0].value = event;
            display = false;
        } else {
            document.getElementsByTagName('input')[0].value += event;
        }


    } else if (event === 'AC') {
        
        // if it is AC clear the input 
        console.log('clear');
        result = 0;
        operation = '';
        document.getElementsByTagName('input')[0].value = null;
    
    
    
    } else {
        // if it is any operation grab the existing input and do the necessary calculation
        
        const v = parseFloat(document.getElementsByTagName('input')[0].value);
     
        
        if (operation === '+') {
            result += v;
        } else if (operation === '-') {
            result -= v;
        } else if (operation === 'x') {
            result *= v;
        } else if (operation === '/') {
            result /= v;
        } else {
            result = v;
        }
        
        operation = event;
        document.getElementsByTagName('input')[0].value = result;
        
        display = true;
    }
});
