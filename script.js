
let flag = 0;
const operators = ['+', '-', '*', '/', '%', '**', 'π'];
let memoryValue = 0;
let lastWasFunction = false;
let angleMode = 'DEG'; // default mode
let lastResult = null;  // to store result after "="
let isFE = false;       // track if we're in FE mode
let justInsertedRandom = false;
let randFlag = false;


const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const backSpaceButton = document.getElementById('backspace');
const toggleSignButton = document.getElementById('toggle-sign');
const openParenButton = document.getElementById('open-paren');
const closeParenButton = document.getElementById('close-paren');
const lnButton = document.getElementById('ln');
const logButton = document.getElementById('log');
const factorialButton = document.getElementById('factorial');
const expButton = document.getElementById('exp');
const absButton = document.getElementById('abs');
const powerButton = document.getElementById('power');
const reciprocalButton = document.getElementById('reciprocal');
const squareButton = document.getElementById('square');
const sqrtButton = document.getElementById('sqrt');
const tenPowerButton = document.getElementById('tenPower');
const piButton = document.getElementById('pi');
const floorButton = document.getElementById('floor');
const ceilButton = document.getElementById('ceil');
const dotButton = document.getElementById('dot');
const msButton = document.getElementById('ms');
const mrButton = document.getElementById('mr');
const mcButton = document.getElementById('mc');
const mPlusButton = document.getElementById('mplus');
const mMinusButton = document.getElementById('mminus');
const memoryEl = document.getElementById('memoryValue');
const historyList = document.getElementById('historyList');
const toggleAngleButton = document.getElementById('toggleAngleMode');
const clearHistoryBtn = document.getElementById('clear-history');





// Function to find factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}


// Function for reset after eval

function resetAfterEval(value) {

    console.log("flag", flag);
    // if (flag) {
    //     if (operators.includes(value)) {
    //         flag = 0;
    //     }
    //     else {
    //         console.log("here");

    //         display.textContent = '0';
    //         flag = 0;
    //     }
    // }

    if (flag) {
        const currentExpr = display.textContent;

        if (operators.includes(value)) {
            flag = 0; // allow chaining operators after result
        } else if (
            currentExpr.endsWith('**') ||
            currentExpr.endsWith('Math.pow(')
            // currentExpr.endsWith('PI')
        ) {
            console.log("here in flag");
            // flag=0;
            // do nothing: user is continuing the power operation
        } else {
            display.textContent = '0';
            flag = 0;
        }
    }

    if (justInsertedRandom) {
        if (!isNaN(value)) {
            // user pressed number -> replace random
            display.textContent = value;
        } else if (value === '(' || value === 'sin' || value === 'cos' || value === 'log' || value === 'ln' || value === 'x²' || value === 'x!' || value === 'π' || value === '√' || value === 'exp' || value === 'xʸ' || value === '1/x' || value === "10^x") {
            // user pressed a function -> multiply with random
            display.textContent += '*';
        }
        justInsertedRandom = false;
    }
}

// function for lastchar;
function getLastChar(expr) {
    return expr.slice(-1);
}

// function for memory value

function updateMemoryDisplay() {
    memoryEl.textContent = memoryValue;
}
// function wrapLast(expr, wrapperFn) {
//     // 1) bracketed expression?
//     if (expr.endsWith(')')) {
//         let balance = 0, openIdx = -1;
//         for (let i = expr.length - 1; i >= 0; i--) {
//             if (expr[i] === ')') balance++;
//             else if (expr[i] === '(') balance--;
//             if (balance === 0) { openIdx = i; break; }
//         }
//         if (openIdx !== -1) {
//             const inside = expr.slice(openIdx);
//             return expr.slice(0, openIdx) + wrapperFn(inside);
//         }
//     }
//     // 2) trailing number?
//     const m = expr.match(/(\d*\.?\d+)(?!.*\d)/);
//     if (m) {
//         const [num] = m;
//         const start = m.index;
//         return expr.slice(0, start) + wrapperFn(num);
//     }
//     return expr;
// }

function applyAndRefresh(fn) {
    const expr = display.textContent;
    display.textContent = fn(expr);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;


        const isNumber = /^[0-9.]$/.test(value); // check if it's a digit or decimal

        // Clear rand-generated number if number is pressed next
        if (randFlag && isNumber) {
            display.textContent = value; // replace with new number
            randFlag = false;
            flag = 0;
            return;
        }

        // If rand is active and operator or function is pressed, treat normally
        if (randFlag && !isNumber) {
            randFlag = false; // reset
        }
        if (value == 'C' || value == '=' || value == '⌫' || value == '+/-' || value == '(' || value == ')' || value == 'ln' || value == 'log' || value == 'x!' || value == 'exp' || value == 'xʸ' || value == '1/x' || value == 'x²' || value == '2√x' || value == "10^x" || value == 'π' || value == 'floor' || value == 'ceil' || value == '|x|' || value == 'sin' || value == 'cos' || value == 'tan' || value == 'cosec' || value == 'sec' || value == 'cot' || value == 'DEG' || value == 'RAD') {
            //Handel LAter
            return;
        }

        const lastChar = display.textContent.slice(-1);
        // const lastTwoChar = display.textContent.slice(-2);
        // console.log(lastTwoChar);
        const operators = ['+', '-', '*', '/', '%', '**'];
        // const operators = ['+', '-', '*', '/', '**'];

        if (lastChar === ')' || lastChar === 'I') {
            console.log("Double *");

            display.textContent += '*';
        }


        // console.log(flag);

        // if (flag) {
        //     if (operators.includes(value)) {
        //         console.log("here");
        //         flag = 0;
        //     }
        //     else {
        //         console.log("Flag==1")  
        //         display.textContent = '0';
        //         flag = 0;
        //     }
        // }

        if (flag) {
            const isOperator = operators.includes(value);
            const isFuncOrBracket = ['(', 'Math.sin(', 'Math.cos(', 'Math.tan(', 'Math.log(', 'Math.ceil(', 'Math.floor(', 'Math.exp(', 'Math.sqrt(', 'Math.exp(', 'π'].some(f => display.textContent.includes(f));

            if (isOperator || isFuncOrBracket || value === '(' || display.textContent != '0') {
                // Continue chaining
                flag = 0;
            }
            else if (
                display.textContent.endsWith('**') ||
                display.textContent.endsWith('Math.pow(')
            ) {
                console.log("here in flag");
                flag = 0;
                // do nothing: user is continuing the power operation
            }
            else {
                // User started a new number or expression — reset
                // console.log("here in 0");
                display.textContent = '0';
                flag = 0;
            }
        }

        // if error is there then clear it
        if (display.textContent === 'Error' || display.textContent === 'NaN') {
            display.textContent = '0';
        }

        // starting with 0 or operator
        if (display.textContent === '0' && operators.includes(value)) {
            if (value !== '-') {
                return;
            }
        }

        if (value === '.') {
            const currentNumber = display.textContent.split(/[\+\-\*\/\%]/).pop();
            // console.log(currentNumber);
            if (currentNumber.includes('.')) {
                return;
            }
        }

        if (display.textContent === '0' && value !== '.') {
            // But allow if previous char is (
            const lastChar = display.textContent.slice(-1);

            // If display is only '0', replace it
            if (display.textContent === '0') {
                display.textContent = value;
            } else {
                display.textContent += value;
                // console.log(display.textContent);
            }
            return;
        }

        //prevent duplicate operators

        if (operators.includes(value) && operators.includes(lastChar)) {
            display.textContent = display.textContent.slice(0, -1) + value;
            console.log("Here", display.textContent);
            return;
        }

        if (!isNaN(lastChar)) {
            if (display.textContent.endsWith('E')) {
                display.textContent += '*';
            }

        }

        if (lastWasFunction) {
            let lastChar = display.textContent.slice(-1);
            const operators = ['+', '-', '*', '/', '%', '**'];
            console.log(value);
            if (lastChar === '(') {

            }
            // else if (!operators.includes(value) || value === ')') {
            else if (!operators.includes(value)) {
                display.textContent += '*';
                console.log("catch");
            }
            lastWasFunction = false;
        }

        if (lastChar == '(') {
            display.textContent += value;
            return;
        }


        display.textContent += value;





        console.log(display.textContent);

    })
})

clearButton.addEventListener('click', () => {
    memoryValue = 0;
    display.textContent = 0;
})

equalsButton.addEventListener('click', () => {
    try {
        let expr = display.textContent;
        const openCount = (display.textContent.match(/\(/g) || []).length;
        const closeCount = (display.textContent.match(/\)/g) || []).length;


        const diff = openCount - closeCount;
        console.log(diff)
        expr += ')'.repeat(diff);
        // Convert sin(x) to sin(x * PI / 180)
        // if (toggleAngleButton.textContent == 'DEG') {
        //     expr = expr.replace(/Math\.sin\(([^()]+)\)/g, 'Math.sin(($1)*Math.PI/180)');
        //     console.log("sin expr", expr);
        //     expr = expr.replace(/Math\.cos\(([^()]+)\)/g, 'Math.cos(($1)*Math.PI/180)');
        //     expr = expr.replace(/Math\.tan\(([^()]+)\)/g, 'Math.tan(($1)*Math.PI/180)');
        //     expr = expr.replace(/1\/Math\.sin\(([^()]+)\)/g, '1/Math.sin(($1)*Math.PI/180)');
        //     expr = expr.replace(/1\/Math\.cos\(([^()]+)\)/g, '1/Math.cos(($1)*Math.PI/180)');
        //     expr = expr.replace(/1\/Math\.tan\(([^()]+)\)/g, '1/Math.tan(($1)*Math.PI/180)');
        // }

        if (angleMode === 'DEG') {
            // Convert degrees to radians
            expr = expr.replace(/Math\.sin\(([^()]+)\)/g, 'Math.sin(($1)*Math.PI/180)');
            expr = expr.replace(/Math\.cos\(([^()]+)\)/g, 'Math.cos(($1)*Math.PI/180)');
            expr = expr.replace(/Math\.tan\(([^()]+)\)/g, 'Math.tan(($1)*Math.PI/180)');

            // Inverse trigonometric (if you implement them later)
            expr = expr.replace(/1\/Math\.sin\(([^()]+)\)/g, '1/Math.sin(($1)*Math.PI/180)');
            expr = expr.replace(/1\/Math\.cos\(([^()]+)\)/g, '1/Math.cos(($1)*Math.PI/180)');
            expr = expr.replace(/1\/Math\.tan\(([^()]+)\)/g, '1/Math.tan(($1)*Math.PI/180)');
        }

        if (display.textContent.includes('/0')) {
            display.textContent = 'Error';
            return;
        }
        const result = eval(expr);
        display.textContent = '';
        display.textContent = result;
        lastResult = result;   // <- store result
        isFE = false;
        console.log(result);
        flag = 1;
        console.log("flag after  = ", flag);

        const entry = document.createElement('li');
        entry.textContent = `${expr} = ${result}`; 9 +
            historyList.prepend(entry); // newest at top

        // (optional) limit history length:
        if (historyList.children.length > 20) {
            historyList.removeChild(historyList.lastChild);
        }
    }
    catch (error) {
        display.textContent = 'Error';
    }
})
backSpaceButton.addEventListener('click', () => {
    const current = display.textContent;

    // console.log(current);

    if (current.length === 1 || current === 'Error') {
        display.textContent = '0';
    }
    else {
        display.textContent = current.slice(0, -1);
    }
});
dotButton.addEventListener('click', () => {
    const expr = display.textContent;

    // Extract last token after last operator or opening parenthesis
    const lastToken = expr.split(/[\+\-\*\/\(\)]/).pop();

    // Allow if no dot already in the last number
    if (!lastToken.includes('.')) {
        display.textContent += '.';
    }
});


openParenButton.addEventListener('click', () => {

    resetAfterEval('(');
    const expr = display.textContent;
    const lastChar = getLastChar(expr);
    console.log(lastChar);
    if (display.textContent === '0') {
        display.textContent = '(';
    }
    else if (operators.includes(lastChar) || lastChar === '(') {
        display.textContent += '(';
    }
    else {
        display.textContent += '*(';
    }
})

closeParenButton.addEventListener('click', () => {

    const openCount = (display.textContent.match(/\(/g) || []).length;
    const closeCount = (display.textContent.match(/\)/g) || []).length;

    // console.log(openCount, closeCount);


    if (openCount > closeCount) {
        display.textContent += ')';
    }

});

lnButton.addEventListener('click', () => {
    resetAfterEval('ln');
    const expr = display.textContent;
    let lastChar = display.textContent.slice(-1);

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.log(';
    }
    else if (lastChar === '(' || lastChar === ',') {
        display.textContent += 'Math.log(';
    } else {
        display.textContent += '*Math.log(';
    }
});

logButton.addEventListener('click', () => {
    resetAfterEval('log');
    let lastChar = display.textContent.slice(-1);

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.log10(';
    }
    else if (lastChar === '(' || lastChar === ',') {
        display.textContent += 'Math.log10(';

    }
    else {
        display.textContent += '*Math.log10(';
    }
});

factorialButton.addEventListener('click', () => {
    resetAfterEval('x!');
    try {
        // console.log('click');
        let expr = display.textContent;
        const match = expr.match(/(\d+)(?!.*\d)/);

        if (!match) return;

        const number = parseInt(match[0]);
        const fact = factorial(number);
        flag = 1;

        display.textContent = expr.slice(0, match.index) + fact;
    } catch (error) {
        display.textContent = 'Error';

    }
});

expButton.addEventListener('click', () => {
    let lastChar = display.textContent.slice(-1);
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.exp(';
    }
    else if (lastChar === '(') {
        display.textContent += 'Math.exp(';

    }
    else {
        display.textContent += '*Math.exp(';
    }
    lastWasFunction = true;
});

// absButton.addEventListener('click', () => {
//     const expr = display.textContent;
//     // console.log("her");
//     console.log(expr);
//     // Try to find last number or expression inside parentheses
//     const match = expr.match(/(\(?[-+]?\d*\.?\d+\)?)(?!.*\d)/);
//     // console.log(match);

//     if (expr === '0') {
//         display.textContent = '0';
//     }

//     if (match) {
//         const start = match.index;
//         const length = match[0].length;
//         const absWrapped = `Math.abs(${match[0]})`;

//         if (match[0][0] == '-') {
//             display.textContent = expr.slice(0, start) + '+' + absWrapped;
//         }
//         else if (match[0][0] !== '+' && match[0][0] !== '-') {
//             display.textContent = expr.slice(0, start) + absWrapped;
//         }

//         else {
//             display.textContent = expr.slice(0, start) + match[0][0] + absWrapped;
//         }

//     }
// });

absButton.addEventListener('click', () => {
    const expr = display.textContent;

    if (expr === '0' || expr === 'Error') {
        display.textContent = 'Math.abs(';
        return;
    }

    const match = expr.match(/(\(?[-+]?\d*\.?\d+\)?)(?!.*\d)/);

    if (match) {
        const start = match.index;
        const matchedValue = match[0];
        const beforeMatch = expr[start - 1];
        let absWrapped = `Math.abs(${matchedValue})`;

        // If there's a digit, closing bracket or π before the match, prepend '*'
        if (beforeMatch && (/\d|\)|π/.test(beforeMatch))) {
            absWrapped = `*${absWrapped}`;
        }

        // Now rebuild expression
        const newExpr = expr.slice(0, start) + absWrapped;
        display.textContent = newExpr;
    }
});


powerButton.addEventListener('click', () => {
    const expr = display.textContent;
    // console.log(expr);
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = '0';
    }
    else if (display.textContent.slice(-2) == '**') {

    }
    else {

        display.textContent += '**';
    }
});

reciprocalButton.addEventListener('click', () => {
    const expr = display.textContent;

    // Try to find the last valid number or expression
    const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);


    // console.log(match);

    if (match) {
        const start = match.index;
        const length = match[0].length;
        const wrapped = `1/(${match[0]})`;

        display.textContent = expr.slice(0, start) + wrapped;
    }



});

squareButton.addEventListener('click', () => {
    const expr = display.textContent;
    let lastChar = display.textContent.slice(-1);

    const match = expr.match(/([a-zA-Z0-9\)\]]+)(?!.*[a-zA-Z0-9\)\]])/);

    if (lastChar === '(' || expr === '' || expr === 'Error') {
        console.log("IN SQUARE");
        return;
    }
    else {
        display.textContent += '**';
    }
    // console.log("match", match);
    // if (match) {
    //     const start = match.index;
    //     const original = match[0];
    //     const squared = `(${original})**2`;

    //     display.textContent = expr.slice(start, match.length + 1) + squared;

    // }
});

sqrtButton.addEventListener('click', () => {
    const expr = display.textContent;
    let lastChar = display.textContent.slice(-1);

    const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);
    console.log(match);

    if (match) {
        const start = match.index;
        const number = match[0];
        // const newExpr = expr.slice(start, match.length) + `Math.sqrt(${number})`;
        // display.textContent = newExpr;
        if (display.textContent === '0' || display.textContent === 'Error') {
            display.textContent = 'Math.sqrt(';
        }
        else {
            // display.textContent += '*Math.sqrt(';
            display.textContent += '*Math.sqrt(';
        }
    }
    else {
        if (lastChar === '(') {
            display.textContent += 'Math.sqrt(';
        }
    }
});

tenPowerButton.addEventListener('click', () => {
    const expr = display.textContent;
    let lastChar = display.textContent.slice(-1);

    const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);
    if (match) {
        const start = match.index;
        const number = match[0];
        const newExpr = expr.slice(0, start) + `Math.pow(10,${number})`;
        // display.textContent = newExpr;

        if (display.textContent === '0' || display.textContent === 'Error') {
            display.textContent = 'Math.pow(10,';
        }
        else if (lastChar === ',') {
            display.textContent += 'Math.pow(10,'
        }
        else {
            display.textContent += '*Math.pow(10,';
        }
    }
});

piButton.addEventListener('click', () => {
    const expr = display.textContent;
    console.log(expr);

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.PI';
        return;
    }
    // If expression ends in a number or closing bracket — auto-insert multiplication
    if (expr && /[\d\)]$/.test(expr) || expr.endsWith('Math.PI')) {
        display.textContent += '*Math.PI';
    }

    else {
        display.textContent += 'Math.PI';
    }
});

floorButton.addEventListener('click', () => {
    const expr = display.textContent;
    const lastChar = display.textContent.slice(-1);


    const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);
    // if (match) {
    //     const start = match.index;
    //     const number = match[0];
    //     const newExpr = expr.slice(0, start) + `Math.${fnName}(${number})`;
    //     // display.textContent = newExpr;

    //     if (display.textContent === '0' || display.textContent === 'Error') {
    //         display.textContent = 'Math.floor(';
    //     } else {
    //         display.textContent += 'Math.floor(';
    //     }
    // }
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.floor(';
    } else if (lastChar === '(') {
        display.textContent += 'Math.floor(';
    }
    else {
        display.textContent += '*Math.floor(';
    }
});

ceilButton.addEventListener('click', () => {
    // const expr = display.textContent;
    const lastChar = display.textContent.slice(-1);


    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.ceil(';
    }
    else if (lastChar === '(') {
        display.textContent += 'Math.ceil(';
    }
    else {
        display.textContent += '*Math.ceil(';
    }
})

// Memory Store MS
msButton.addEventListener('click', () => {
    try {
        memoryValue = eval(display.textContent);
        updateMemoryDisplay();


        // 2) Add to history
        const entry = document.createElement('li');
        entry.textContent = `MS → ${memoryValue}`;
        historyList.prepend(entry);

        // 3) Optional: keep only last 20 entries
        if (historyList.children.length > 20) {
            historyList.removeChild(historyList.lastChild);
        }
    } catch (error) {
        display.textContent = 'Error';
    }
    updateMemoryDisplay();
})

// Memory Recall (MR); // MR → Recall (replace display)
mrButton.addEventListener('click', () => {


    console.log('mv', memoryValue);
    // display.textContent += String(memoryValue);
    display.textContent = String(memoryValue);
    // display.textContent += '*';

});

// Memory Clear (MC)
mcButton.addEventListener('click', () => {
    memoryValue = 0;
    updateMemoryDisplay();
})

// Memory Add (M+)
mPlusButton.addEventListener('click', () => {
    try {
        memoryValue += eval(display.textContent);
        display.textContent = '0';
    } catch (error) {

        display.textContent = 'Error';

    }

    updateMemoryDisplay();
})

// Memory Subtract (M-)
mMinusButton.addEventListener('click', () => {
    try {
        memoryValue -= eval(display.textContent);
        display.textContent = '0';

    } catch (error) {
        display.textContent = 'Error';

    }
    updateMemoryDisplay();
})



// sin
document.getElementById('sin').addEventListener('click', () => {
    // if (display.textContent === '0' || display.textContent === 'Error') {
    //     display.textContent = 'Math.sin(';
    // } else {
    //     display.textContent += '*Math.sin(';
    // }
    resetAfterEval('sin');

    if (
        display.textContent === '0' ||
        display.textContent === 'Error' ||
        display.textContent === ''
    ) {
        display.textContent = 'Math.sin(';
    } else {
        const lastChar = display.textContent.slice(-1);

        // If last char is a number, variable, or closing parenthesis, assume multiplication
        if (/\d|\)|\w/.test(lastChar)) {
            display.textContent += '*Math.sin(';
            console.log(display.textContent);
        } else {
            display.textContent += 'Math.sin(';
        }
    }
});

document.getElementById('cos').addEventListener('click', () => {
        resetAfterEval('cos');

    if (
        display.textContent === '0' ||
        display.textContent === 'Error' ||
        display.textContent === ''
    ) {
        display.textContent = 'Math.cos(';
    } else {
        const lastChar = display.textContent.slice(-1);

        // If last char is a number, variable, or closing parenthesis, assume multiplication
        if (/\d|\)|\w/.test(lastChar)) {
            display.textContent += '*Math.cos(';
            console.log(display.textContent);
        } else {
            display.textContent += 'Math.cos(';
        }
    }
});


document.getElementById('tan').addEventListener('click', () => {
        resetAfterEval('tan');

    if (
        display.textContent === '0' ||
        display.textContent === 'Error' ||
        display.textContent === ''
    ) {
        display.textContent = 'Math.tan(';
    } else {
        const lastChar = display.textContent.slice(-1);

        // If last char is a number, variable, or closing parenthesis, assume multiplication
        if (/\d|\)|\w/.test(lastChar)) {
            display.textContent += '*Math.tan(';
            console.log(display.textContent);
        } else {
            display.textContent += 'Math.tan(';
        }
    }
});


document.getElementById('cosec').addEventListener('click', () => {
        resetAfterEval('cosec');

    if (
        display.textContent === '0' ||
        display.textContent === 'Error' ||
        display.textContent === ''
    ) {
        display.textContent = 'Math.cosec(';
    } else {
        const lastChar = display.textContent.slice(-1);

        // If last char is a number, variable, or closing parenthesis, assume multiplication
        if (/\d|\)|\w/.test(lastChar)) {
            display.textContent += '*Math.cosec(';
            console.log(display.textContent);
        } else {
            display.textContent += 'Math.cosec(';
        }
    }
});


document.getElementById('sec').addEventListener('click', () => {
        resetAfterEval('sec');

    if (
        display.textContent === '0' ||
        display.textContent === 'Error' ||
        display.textContent === ''
    ) {
        display.textContent = 'Math.sec(';
    } else {
        const lastChar = display.textContent.slice(-1);

        // If last char is a number, variable, or closing parenthesis, assume multiplication
        if (/\d|\)|\w/.test(lastChar)) {
            display.textContent += '*Math.sec(';
            console.log(display.textContent);
        } else {
            display.textContent += 'Math.sec(';
        }
    }
});


// document.getElementById('cot').addEventListener('click', () => {
        // resetAfterEval('cot');
// 
//     if (
//         display.textContent === '0' ||
//         display.textContent === 'Error' ||
//         display.textContent === ''
//     ) {
//         display.textContent = 'Math.cot(';
//     } else {
//         const lastChar = display.textContent.slice(-1);

//         // If last char is a number, variable, or closing parenthesis, assume multiplication
//         if (/\d|\)|\w/.test(lastChar)) {
//             display.textContent += '*Math.cot(';
//             console.log(display.textContent);
//         } else {
//             display.textContent += 'Math.cot(';
//         }
//     }
// });

toggleAngleButton.addEventListener('click', () => {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    toggleAngleButton.textContent = angleMode;
});

document.getElementById('feButton').addEventListener('click', () => {
    if (lastResult === null) return;

    isFE = !isFE;

    if (isFE) {
        display.textContent = Number(lastResult).toExponential(8); // e.g., 1.23456789e+7
    } else {
        display.textContent = String(lastResult);
    }
});

// document.getElementById('randButton').addEventListener('click', () => {
//     const randValue = Math.random();  // generates 0 to 1
//     display.textContent = String(randValue);
//     justInsertedRandom = true;
//     flag = 0;
// });

randButton.addEventListener('click', () => {
    const randVal = Math.random();  // or use a custom range if needed
    display.textContent = randVal;
    flag = 1; // so we handle correctly on next input
    randFlag = true; // set the special flag
});

clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
        historyList.innerHTML = '';
    }
});












///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






toggleSignButton.addEventListener('click', () => {

    let expression = display.textContent;
    const operators = ['*', '/'];

    const parts = expression.split(/([\*\/])/);
    const last = parts[parts.length - 1];

    // console.log(parts);

    //toggle the sign

    if (!isNaN(last) && last !== '') {

        if (last.startsWith('-')) {
            parts[parts.length - 1] = last.slice(1);

        }
        else if (last.startsWith('+')) {
            parts[parts.length - 1] = '-' + last;
        }

    }

    display.textContent = parts.join('');
})

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
    if (validKeys.includes(key)) {
        const lastChar = display.textContent.slice(-1);
        const operators = ['+', '-', '*', '/'];

        if (key === '.' && display.textContent.split(/[\+\-\*\/]/).pop().includes('.')) {
            return;
        }
        if (display.textContent === '0' && operators.includes(key)) {
            if (key !== '-') {
                return;
            }
        }

        if (display.textContent === '0' && key !== '.') {
            display.textContent = key;
            return;
        }

        if (operators.includes(key) && operators.includes(lastChar)) {
            display.textContent = display.textContent.slice(0, -1) + key;
            return;
        }

        display.textContent += key;
    }


    //  Enter
    if (key === 'Enter') {
        console.log("key");
        console.log(display.textContent);
        try {
            if (display.textContent.includes('/0')) {
                display.textContent = 'Error';
                return;
            }
            const result = eval(display.textContent);
            // console.log(result);
            // display.textContent = result;

            // display.textContent = '';
            display.textContent = result;
            console.log(result);
            console.log(display.textContent);
            flag = 1;


        } catch (error) {
            display.textContent = 'Error';

        }
    }

    if (key === 'Backspace') {
        if (display.textContent.length === 1 || display.textContent === 'Error') {
            display.textContent = '0';
        }
        else {
            display.textContent = display.textContent.slice(0, -1);
        }
    }
})

