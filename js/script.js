/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

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
 let value = [];

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner
    console.log(btn);

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);
    } else {
        if (arithmetic && btn != "comma") { // Kontrollerar om en operation är vald och det finns ett värde att beräkna
            calculate(); // Utför pågående beräkning
        }
        switch (btn) {
            case 'add':
                addPlus();
                break;
            case 'sub':
                addMinus();
                break;
            case 'mul':
                addMul();
                break;
            case 'div':
                addDiv();
                break;
            case 'clear':
                clearLCD();
                break;
            case 'enter':
                calculate();
                break;
            case 'comma':
                addComma();
                break;
        }
    }
}

function showMem() {
    document.getElementById('memoryDisplay').value = memory + (arithmetic ? arithmetic : '');
}
/**
 *  Lägger till siffra på display.
 */

//Array handler
index = 0;
function addToArray(f) {
    value[index] = f;
    index += 1;

    console.log(value);
    lcd.value = value.join('');
}

function addDigit(digit) {
    addToArray(digit);
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    addToArray(",");
}

function addPlus() {
    addToArray("+");
}

function addMinus() {
    addToArray("-");
}

function addDiv() {
    addToArray("/");
}

function addMul() {
    addToArray("*");
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {

}


/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {
    let result;



    // switch (arithmetic) {
    //     case '+':

    //         break;
    //     case '-':

    //         break;
    //     case '*':

    //         break;
    //     case '/':

    //         break;
    // }
}

/** Rensar display */
function clearLCD() {

}

/** Rensar allt, reset */
function memClear() {

}

window.onload = init;
