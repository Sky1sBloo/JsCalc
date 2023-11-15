const equationElement = document.getElementById('equation')
const answerElement = document.getElementById('answer');
const buttons = document.getElementsByClassName('calc-button');

let equation = '';
let displayValue = '';  // This is separated so you can change this value even without displaying the element

/**
 * Shows the value on the display div
 * @param {string} value 
 */
const setDisplay = (value) => {
    answerElement.innerHTML = value;
    displayValue = value;
}

/**
 * Clears both the display div and the internal value, display
 */
const clearDisplay = () => {
    answerElement.innerHTML = '0';
    displayValue = '';
}

/**
 * Sets the value of the text above the answer and the equation variable
 * This also handles the animation fading of the equation heading
 * @param {string} value 
 */
const setEquation = (value) => {
    if (value === '0') {
        equationElement.style.opacity = 0;
        equationElement.style.marginBottom = '-1em';
    } else {
        equationElement.style.opacity = 1;
        equationElement.style.marginBottom = '1em';
    }
    equation = value;
    equationElement.innerHTML = value;
}

/**
 * Handles all button inputs
 * @param {string} value Value of the button, generally taken from input type="button" value.
 */
const addInput = (value) => {
    switch (value) {
        case '/':
        case '*':
        case '-':
        case '+':
            setEquation(equation + displayValue + value);
            displayValue = '';  // I didn't update the display div here, its just internal
            break;
        case '+/-':
            if (displayValue.charAt(0) === '-') {
                setDisplay(displayValue.substring(1));
            }
            else {
                setDisplay('-' + displayValue);
            }
            break;
        case '%':
            setDisplay(displayValue / 100);
            break;
        case 'AC':
            equation = '';
            equationElement.innerHTML = equation;
            clearDisplay();
            return;
        case '=':
            setEquation(equation + displayValue);
            clearDisplay();
            const ans = new Function("return " + equation);
            setDisplay(ans());
            break;
        default:
            // This means that the value is a number
            if (answerElement.innerHTML === '0') {
                clearDisplay();
            }

            setDisplay(displayValue + value);
            break;
    }
}

Array.from(buttons).forEach((button) => button.addEventListener('click', () => addInput(button.value)));