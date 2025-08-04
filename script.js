
let flag = 0;
const operators = ['+', '-', '*', '/', '%', '**'];
let memoryValue = 0;

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


// Functio for reset after eval

function resetAfterEval(value) {
    console.log(flag);
    if (flag) {
        if (operators.includes(value)) {
            flag = 0;
        }
        else {
            console.log("here");

            display.textContent = '0';
            flag = 0;
        }
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

function wrapLast(expr, wrapperFn) {
    // 1) bracketed expression?
    if (expr.endsWith(')')) {
        let balance = 0, openIdx = -1;
        for (let i = expr.length - 1; i >= 0; i--) {
            if (expr[i] === ')') balance++;
            else if (expr[i] === '(') balance--;
            if (balance === 0) { openIdx = i; break; }
        }
        if (openIdx !== -1) {
            const inside = expr.slice(openIdx);
            return expr.slice(0, openIdx) + wrapperFn(inside);
        }
    }
    // 2) trailing number?
    const m = expr.match(/(\d*\.?\d+)(?!.*\d)/);
    if (m) {
        const [num] = m;
        const start = m.index;
        return expr.slice(0, start) + wrapperFn(num);
    }
    return expr;
}

function applyAndRefresh(fn) {
    const expr = display.textContent;
    display.textContent = fn(expr);
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;



        if (value == 'C' || value == '=' || value == '⌫' || value == '+/-' || value == '(' || value == ')' || value == 'ln' || value == 'log' || value == 'x!' || value == 'exp' || value == 'xʸ' || value == '1/x' || value == 'x²' || value == '2√x' || value == "10^x" || value == 'π' || value == 'floor' || value == 'ceil' || value == '|x|' || value == 'sin' || value == 'cos' || value == 'tan' || value == 'cosec' || value == 'sec' || value == 'cot') {
            //Handel LAter
            return;
        }

        const lastChar = display.textContent.slice(-1);
        const lastTwoChar = display.textContent.slice(-2);
        // console.log(lastTwoChar);
        const operators = ['+', '-', '*', '/', '%', '**'];
        // console.log(flag);

        if (flag) {
            if (operators.includes(value)) {
                console.log("here");
                flag = 0;
            }
            else {

                display.textContent = '0';
                flag = 0;
            }
        }

        // if error is there then clear it
        if (display.textContent == 'Error') {
            display.textContent = '0';
        }


        // starting with 0 or operator
        if (display.textContent == '0' && operators.includes(value)) {
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


        if (display.textContent == '0' && value !== '.') {
            display.textContent = value;
            return;
        }


        //prevent duplicate operators

        if (operators.includes(value) && operators.includes(lastChar)) {
            display.textContent = display.textContent.slice(0, -1) + value;
            console.log(display.textContent);
            return;
        }

        if (!isNaN(lastChar)) {
            if (display.textContent.endsWith('E')) {
                display.textContent += '*';
            }

        }




        display.textContent += value;



    })
})

clearButton.addEventListener('click', () => {
    memoryValue = 0;
    display.textContent = 0;
})

equalsButton.addEventListener('click', () => {
    try {

        let expr = display.textContent;

        // Convert sin(x) to sin(x * PI / 180)
        expr = expr.replace(/Math\.sin\(([^()]+)\)/g, 'Math.sin(($1)*Math.PI/180)');
        expr = expr.replace(/Math\.cos\(([^()]+)\)/g, 'Math.cos(($1)*Math.PI/180)');
        expr = expr.replace(/Math\.tan\(([^()]+)\)/g, 'Math.tan(($1)*Math.PI/180)');
        expr = expr.replace(/1\/Math\.sin\(([^()]+)\)/g, '1/Math.sin(($1)*Math.PI/180)');
        expr = expr.replace(/1\/Math\.cos\(([^()]+)\)/g, '1/Math.cos(($1)*Math.PI/180)');
        expr = expr.replace(/1\/Math\.tan\(([^()]+)\)/g, '1/Math.tan(($1)*Math.PI/180)');

        if (display.textContent.includes('/0')) {
            display.textContent = 'Error';
            return;
        }
        const result = eval(expr);
        display.textContent = '';
        display.textContent = result;
        console.log(result);
        flag = 1;

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
    else if (operators.includes(lastChar)) {
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

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.log(';
    } else {
        display.textContent += '*Math.log(';
    }
});

logButton.addEventListener('click', () => {
    resetAfterEval('log');

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.log10(';
    } else {
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
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.E';
    }
    else {
        display.textContent += '*Math.E'
    }
});

absButton.addEventListener('click', () => {
    const expr = display.textContent;
    // console.log("her");
    console.log(expr);
    // Try to find last number or expression inside parentheses
    const match = expr.match(/(\(?[-+]?\d*\.?\d+\)?)(?!.*\d)/);
    // console.log(match);

    if (expr === '0') {
        display.textContent = '0';
    }

    if (match) {
        const start = match.index;
        const length = match[0].length;
        const absWrapped = `Math.abs(${match[0]})`;

        if (match[0][0] == '-') {
            display.textContent = expr.slice(0, start) + '+' + absWrapped;
        }
        else if (match[0][0] !== '+' && match[0][0] !== '-') {
            display.textContent = expr.slice(0, start) + absWrapped;
        }

        else {
            display.textContent = expr.slice(0, start) + match[0][0] + absWrapped;
        }

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

    const match = expr.match(/([a-zA-Z0-9\)\]]+)(?!.*[a-zA-Z0-9\)\]])/);

    console.log(match);
    if (match) {
        const start = match.index;
        const original = match[0];
        const squared = `(${original})**2`;

        display.textContent = expr.slice(0, start) + squared;

    }


});

sqrtButton.addEventListener('click', () => {
    const expr = display.textContent;

    const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);

    if (match) {
        const start = match.index;
        const number = match[0];
        const newExpr = expr.slice(0, start) + `Math.sqrt(${number})`;
        // display.textContent = newExpr;
        if (display.textContent === '0' || display.textContent === 'Error') {
            display.textContent = 'Math.sqrt(';
        } else {
            display.textContent += 'Math.sqrt(';
        }
    }




})

tenPowerButton.addEventListener('click', () => {
    const expr = display.textContent;

    const match = expr.match(/(\d*\.?\d+)(?!.*\d)/);
    if (match) {
        const start = match.index;
        const number = match[0];
        const newExpr = expr.slice(0, start) + `Math.pow(10,${number})`;
        // display.textContent = newExpr;

        if (display.textContent === '0' || display.textContent === 'Error') {
            display.textContent = 'Math.pow(10,';
        } else {
            display.textContent += 'Math.pow(10,';
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
    } else {
        display.textContent += '*Math.floor(';
    }
});

ceilButton.addEventListener('click', () => {
    // const expr = display.textContent;

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.ceil(';
    } else {
        display.textContent += '*Math.ceil(';
    }


})

// Memory Store MS
msButton.addEventListener('click', () => {
    try {
        memoryValue = eval(display.textContent);
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
    } catch (error) {

        // display.textContent = 'Error';

    }

    updateMemoryDisplay();
})

// Memory Subtract (M-)
mMinusButton.addEventListener('click', () => {
    try {
        memoryValue -= eval(display.textContent);
    } catch (error) {
        // display.textContent = 'Error';

    }
    updateMemoryDisplay();
})



// sin
document.getElementById('sin').addEventListener('click', () => {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.sin(';
    } else {
        display.textContent += '*Math.sin(';
    }
});

document.getElementById('cos').addEventListener('click', () => {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.cos(';
    } else {
        display.textContent += '*Math.cos(';
    }
});


document.getElementById('tan').addEventListener('click', () => {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.tan(';
    } else {
        display.textContent += '*Math.tan(';
    }
});


document.getElementById('cosec').addEventListener('click', () => {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.cosec(';
    } else {
        display.textContent += '*Math.cosec(';
    }
});


document.getElementById('sec').addEventListener('click', () => {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.sec(';
    } else {
        display.textContent += '*Math.sec(';
    }
});


document.getElementById('cot').addEventListener('click', () => {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = 'Math.cot(';
    } else {
        display.textContent += '*Math.cot(';
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