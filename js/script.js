/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */



/**
 * ? representerar negativa tal**/

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd');
    memoryDisplay = document.getElementById('memoryDisplay');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

//displaytext
let displayText = null;
let inputArray = [];


//Lite variabler
let isComma = false;
let isNum = false;
let isOperator = false; //Inkluderar komma
let isNegative = false;

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner
    console.log(btn);

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addToArray(digit);
        isNum = true;
        isOperator = false;
    } else if (btn == 'comma') {
        if (!isComma) {
            if (isOperator) {
                addToArray("0")
                addToArray(".")
            } else {
                addToArray(".");
            }

            isComma = true;
            isNum = false;
            isOperator = true;
        }
    } else if (btn == 'minus' && inputArray.at(-1) == "-") {
        addToArray("?");
    } else {
        switch (btn) {
            case 'add':
                if (!isOperator) {
                    addToArray("+");
                    isComma = false;
                    isNum = false;
                    isOperator = true;
                }
                break;
            case 'sub':
                if (!isOperator) {
                    addToArray("-");
                    isComma = false;
                    isNum = false;
                    isOperator = true;
                }
                break;
            case 'mul':
                if (!isOperator) {
                    addToArray("*");
                    isComma = false;
                    isNum = false;
                    isOperator = true;
                }
                break;
            case 'div':
                if (!isOperator) {
                    addToArray("/");
                    isComma = false;
                    isNum = false;
                    isOperator = true;
                }
                break;
            case 'clear':
                clearLCD();
                break;
            case 'enter':
                calculate();
                break;
        }
    }
}

//Array handler
function addToArray(f) {
    if (f == "." && isComma) {
        return;
    }

    inputArray.push(f);

    console.log(inputArray);
    lcd.value = inputArray.join('');

    //Autoscrollar ifall inputtexten overflowar
    lcd.scrollLeft = lcd.scrollWidth;
}

/** Rensar display */
function clearLCD() {

    inputArray = [0];

    console.log(inputArray);
    lcd.value = inputArray.join('');

    inputArray = [];
}

function calculate() {

    let numbers = [];
    let operators = [];
    let calculated = null;

    let currentNum = [];

    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == "*" || inputArray[i] == "/" || inputArray[i] == "-" || inputArray[i] == "+") {
            operators.push(inputArray[i]);
            if (currentNum !== 0) {
                numbers.push(parseFloat(currentNum.join('')));
                currentNum = [];
            }
        } else {
            currentNum.push(inputArray[i]);

        }
        console.log(inputArray[i]);
    }
    numbers.push(parseFloat(currentNum.join(''))); //Lägger till det sista numret i arrayen

    if (operators === 0) {
        lcd.value = inputArray.join('');
        inputArray = [];
        return;
    } else {

        for (let i = 0; i < operators.length; i++) {

            if (operators[i] == "+") {
                if (calculated == null) {
                    calculated = numbers[i] + numbers[i + 1];
                } else {
                    calculated = calculated + numbers[i + 1];
                }
            }
            else if (operators[i] == "-") {
                if (calculated == null) {
                    calculated = numbers[i] - numbers[i + 1];
                } else {
                    calculated = calculated - numbers[i + 1];
                }
            }
            else if (operators[i] == "*") {
                if (calculated == null) {
                    calculated = numbers[i] * numbers[i + 1];
                } else {
                    calculated = calculated * numbers[i + 1];
                }
            }
            else if (operators[i] == "/") {
                if (calculated == null) {
                    calculated = numbers[i] / numbers[i + 1];
                } else {
                    calculated = calculated / numbers[i + 1];
                }
            }
        }
        lcd.value = calculated;
        inputArray = [];
    }
    console.log("CurrentNum: " + currentNum);
    console.log("numbers: " + numbers);
    console.log("operators: " + operators);
    console.log("Calculated: " + calculated);
}
window.onload = init;