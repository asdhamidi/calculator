// eqn represents the eqn. Max possible length = 3.
// eqn[0] and eqn[2] will contain the operands,
// while eqn[1] will contain the operator.
let eqn = [];

let buttons = document.querySelectorAll(".button");
let mainButtons = document.querySelectorAll(".main-button");

let scr = document.querySelector(".screen-current");
let scrPast = document.querySelector(".screen-past");
let current = "";

// Basic Math Operations Functions
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;


// Operate function. 
// To be executed when = is pressed or more than 2 operands are present.
function operate()
{
    let result;
    switch (eqn[1]){
        case "+":
            result = add(eqn[0], eqn[2]);
            break;
        case "-":
            result = subtract(eqn[0], eqn[2]);
            break;
        case "*":
            result = multiply(eqn[0], eqn[2]);
            break;
        case "/":
            result = divide(eqn[0], eqn[2]);
            break;
    }

    eqn = [];
    eqn.push(result);
    sizeCheck();
    scr.textContent = result;
    current = result.toString();
}

// Button Pressing Processing.
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Equal Button Press
        if(btn.id == "equals")
            evaluate();
        // Number (containing only 1 class i.e. button) Button Press.
        else if(btn.classList.length == 1)
            appendNumber(btn.textContent);   
        // Operator (containing 2 classes i.e. button & operator) Button Press
        else if(btn.classList.length == 2) 
            addOperator(btn.id);
        sizeCheck();
    });
});

function evaluate()
{
    if(eqn.length == 3 && failsafe()) {
        scrPast.textContent = `${eqn[0]} ${eqn[1]} ${eqn[2]} = `;
        operate();
    }
}

function appendNumber(key)
{
    console.log("Check");
    if(current == 0)
    current = key;
    else
    current += key;
    
    if(eqn.length == 0 || eqn.length == 1)
    eqn[0] = parseInt(current);
    else
    eqn[2] = parseInt(current);
    
    display();
}

function addOperator(operator)
{
    // If only the first number has been entered.
    // And then the operator is entered.
    if(eqn.length == 1)
    {
        eqn[1] = operator;
        scrPast.textContent = `${eqn[0]} ${eqn[1]}`;
        clear();
    }
    // If some operation has been done, 
    // and new operation is being done on the result.
    // OR
    // Operator is to be changed.
    else if((eqn.length == 1) || (eqn.length == 2 && current.length == 0)) {
        eqn[1] = operator;
        scrPast.textContent = `${eqn[0]} ${eqn[1]}`;
        clear();
    }
    // If some number and operator has been inserted.
    // and new operation is to be done on their result.
    // eg: 2 + 2 * => * is the new operator in this case.
    else if(eqn.length == 2 && current.length != 0 && failsafe())
    {
        operate();
        eqn[1] = operator;
        scrPast.textContent = `${eqn[0]} ${eqn[1]}`;
        current = "0";
        display();
    }
}

//Altering screen
mainButtons.forEach(mb => {
    mb.addEventListener("click", () => {
        if(mb.id == "Clear")
        {
            clearAll();
        }
        else 
        {
            deleteNumber();
        }
        sizeCheck();
    });
});

// Displaying Numbers Function.
function display()
{
    sizeCheck();
    scr.textContent = current;
}

// Font Size Checking function
function sizeCheck()
{
    if(current.length >= 12)
    scr.style.fontSize = "1rem";
    else
    scr.style.fontSize = "1.75rem";
}

// Clearing Current Screen Function.
function clear() {
    current = "";
    scr.textContent = 0;
}

// Clearing All Screens Function.
function clearAll() {
    eqn = [];
    clear();
    scrPast.textContent = "";
}

// Delete digit 
function deleteNumber()
{
    // Turning the number to zero if only one digit is present.
    if(current.length == 1 || current == "")
    {
        current = "0";
        display();
    }
    else
    {
        current = current.slice(0, current.length - 1);
        display();  
    }

    if(eqn.length == 1)
    eqn[0] = parseInt(current);
}

// Failsafe function
// Checks if division by zero is not happening or
// if operation with nothing (empty input) is not happening.
function failsafe()
{
    if(eqn.length == 3)
    {
        if((!isNaN(parseInt(eqn[0])) && isNaN(parseInt(eqn[1]))) 
            && !(eqn[1] === "/" && eqn[2] === 0)) 
        return true;
    }
    alert("Don't act smart!");
    current = "";
    return false;
}

//Keyboard Support
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) 
    appendNumber(e.key);

    if (e.key === '=' || e.key === 'Enter') 
    evaluate();

    if (e.key === 'Backspace') 
    deleteNumber();

    if (e.key === 'Delete') 
    clearAll();

    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    addOperator(e.key);
});