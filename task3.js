//=================================================DROP DOWN LIST=====================================================================
//I'm using the document.getElementById to find the <select> element with the "select" Id and storing it in the variable dropdownList
let dropdownList = document.getElementById('select');

//I will be using a for loop to create numbers from 1-20 
for (a = 1; a <= 20; a++) {
        //I have also created the <option> with the document.createElement which will be stored under the Items variable
        let Items = document.createElement('option');

    Items.innerHTML = a;
    /* I then return the HTML content for each <option> element using the innerHTML property.
    also each of these items will be allocated a value of a */
    dropdownList.appendChild(Items);
    /* then I use the appendChild method to add/append each <option> element to the <select> - element that I 
    stored in a variable dropdownList */
}
      
//=================================================CALCULATOR=====================================================================
/*I create a class to store information on the output container such as the current and previous numbers.
The constructor is used to get inputs and functions for the calculator
this. keyword wil be used to call the current object in my code */
class Calculator {
  //here the properties are set for my calculator class
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()    
  }
  
  //Bellow the properties there will be Methods which are like "specialized functions" that don't use the function keyword
  updateDisplay() {
    /* Update what will be displayed on the screen and the values for current and previous Operands will be stored in the  
    current and previous OperandTextElements variables which also use the .innerText to append the values to the HTML elements*/
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand 
  }
  
  clear() {
  //function will display all current and previous operands with empty strings and the operation to an undefined value.
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  clearCurrent() {
      //function will display all current operand with empty strings 
        this.currentOperand = ''
      }

  percent() {
      //setting the current operand to this.currentOperand(float/integer) divided by 100
      this.currentOperand = parseFloat(this.currentOperand)/100  
  } 

  delete() {
    /* set current operand to be converted to string and use the slice method to get rid of character/number
    stored in the string "currentOperand" from index 0 to 1 from the end. Essentially getting rid of one last
    'number' displayed on the calculator screen (on the current operand) every time the function is called*/
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  //append to add numbers on screen every time user selects number
  appendNumber(number) {
    //The conditional statement: if the number is a "." and the current operand includes "." then the number can't be appended again and will be 
    if (number === "." && this.currentOperand.includes(".")) return
    //variable that will add other numbers to the entered number as strings so Javascript doesn't try to sum them up but append them instead
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  //Function chooses operation selected by user
  chooseOperation(operation) {
    //A conditional statement is added to prevent the operations from being casted when there is no current value set for the current operand
    if (this.currentOperand === "") return
    //This conditional statement states that if the previous operand is not equal to and empty string then the function compute will be executed 
    //storing the operation which needs to be computed in the operation variable
    if (this.previousOperand !== "") {
      this.compute()
    }
    this.operation = operation
    //current number will be contained in the previous operand container
    this.previousOperand = this.currentOperand
    //the new current operand will be cleared
    this.currentOperand = ""
  }
  

    /* In the compute function:
    -The computation variable is created to store the result of compute function
    -variables that convert the previous and current operand to float/number values
    -if there is no prev value or current value the function will not be computed
    -The switch statement which is like a group of if statements but condensed into one is used
    -the keyword case is like if statement condition and has the conditions that determine when each computation should be used.
    -Looking at the first case, when this.operation is "+" then the code will be executed inside the case. Then it's set to not 
      follow any of the other case statements with the break keyword.
    -the default is like else where the operation is invalid and will not be executed */ 
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
        case '%':
          computation = prev % current
          break
      default:
        return
    }
    //The result of the computation will be stored in the current operand variable
    this.currentOperand = computation
    /* After the computation is done the values for this.operation and this.previousOperand
    will be set to undefined and an empty string respectively*/
    this.operation = undefined
    this.previousOperand = ''
  } 
}
  
//getting our constant values for the mathematical computations
const numberButtons = document.querySelectorAll('[data-number]')
//using the querySelectorAll to select all elements that match a certain string and have to be typed inside the following characters:'[]' 
const operationButtons = document.querySelectorAll('[data-operation]')
//using the querySelector To select the buttons which are not grouped and will have unique functions
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const clearButton = document.querySelector('[data-clear]')
const percentageButton = document.querySelector('[data-percent]')
//using the querySelector To select the buttons which are not grouped and will have unique functions
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//linking variables above to the calculator variable
//new is used to define classes and we will pass everything from our constructor
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


//======================================Buttons=====================================
/* addEventListener is used so that whenever buttons are clicked an action takes place. 
Also the calculator.updateDisplay() function will be called that updates the values of 
the current and previous operands.
-Also note that I have made use of the arrow function"=>" which replaces the keyword 
"function" to declare anonymous functions which will be used as arguments"*/

//for each is used to select all number buttons stored in the variable numberButtons
numberButtons.forEach(button => {
button.addEventListener('click', () => {
    /* appendNumber(number) function called where the value of the button determined by 
    (.innerText) will be computed in the method */
    calculator.appendNumber(button.innerText)
    //update display on the screen
    calculator.updateDisplay()
})
})
  
//for each is used to select all operation buttons stored in the variable operationButtons
operationButtons.forEach(button => {
button.addEventListener('click', () => {
    /* appendNumber(number) method called where the value of the button determined by 
    (.innerText) will be computed in the method */
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
})
})
  
//equalsButton variable calls the compute() method from our constructor
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
  
//allClearButton variable calls the clear() method from our constructor
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//clearButton variable calls the clearCurrent() method from our constructor
clearButton.addEventListener('click', button => {
    calculator.clearCurrent()
    calculator.updateDisplay()
})

//deleteButton variable calls the delete() method from our constructor
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

//percentageButton variable calls the percent() method from our constructor
percentageButton.addEventListener('click', button => {
    calculator.percent()
    calculator.updateDisplay()
})


//=================================================Clicked Button Function=====================================================================
/* A variable clicked is created to store the number 0 which will have one added to it
be added every time the function clickStatus() is called.
The button with the "click" Id will be stored in the variable buttonClick*/
let clicked = 0;
let buttonClick = document.getElementById('click');

function clickStatus() {
    /* the buttonClick variable uses the .textContent property to return the text content which is the strings 
    and the most recent value of the clicked variable*/
    buttonClick.textContent = 'This Button Has been clicked ' + ++clicked + ' times';
}


//=================================================Currency Converter=====================================================================
/* For each of the computations bellow the input value will first be 
fetched using the getElementById method. Then it will be converted 
into a float so we can execute a mathematical computation that 
divides the value by the currency exchange rate. 
These computations are stored in a specific variable (usd/eur/gbp) 
created. If the value of the specific variable is not NaN(not a number) the 
result of the computation is stored in the label tag with the #amount id. 
.innerHTML is used to append/return the result inside the specified label tag*/
//===========================USD==============================
function calcUSD(){
  const rand = document.getElementById("rands").value;
  let usd = parseFloat(rand)/14.96;
  
  if(!isNaN(usd)) {
      document.getElementById("amount").innerHTML ="$" + usd;
  }
}

//===========================EUR==============================
function calcEUR(){
  const rand = document.getElementById("rands").value;
  let eur = parseFloat(rand)/17.92;
  
  if(!isNaN(eur)) {
      document.getElementById("amount").innerHTML ="€" + eur;
  }
}

//===========================GBP==============================
function calcGBP(){
  const rand = document.getElementById("rands").value;
  let gbp = parseFloat(rand)/20.48;
  
  if(!isNaN(gbp)) {
      document.getElementById("amount").innerHTML ="£" + gbp;
  }
}


