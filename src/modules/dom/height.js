import ToolJS from '../main';
import { getElement, cToA, Logs, manipulate } from "../deps";
import isObj from '../obj/isObj';
import isNum from '../num/isNum';
import isString from '../str/isString';

/**
 * This method calculates the offset height of an element and returns it. If passed a second parameter, then it sets the height of the element and returns the element.
 * @method module:DOM.height
 * @param {String|HTMLElement} el Could be a valid css selector string, an html elements.
 * @param {Number} [value] The new height of the element.
 * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s).
 * @returns {Number} The element's offset height.
 */
const height = (el, value, options) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var output = [], opt = (isObj(value)) ? value : options;
    
    if(!el && debugging) Logs.throw("Specify an element whose sibling elements is to be returned");

    if(el){
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(currEl => {
            if(value && !isObj(value)){
                if(isNum(value)){ currEl.style.height = value + "px"; }
                else if (isString(value)){ currEl.style.height = value; }
                output = elem;
            }
            else { output.push(currEl.offsetHeight); }
        });

        // manipulate if options are available
        if ( isObj(opt) ) {
            manipulate(elem, opt);
        }

        return (output.length == 1) ? output[0] : output;
    }
}

export default height;