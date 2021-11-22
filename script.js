let eqn = [];
let buttons = document.querySelectorAll(".button");

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
}

// Inserting Numbers
buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        
    });
});
function insert()
{

}