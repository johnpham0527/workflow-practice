'use strict';

//Redux Code
const { Provider, connect } = ReactRedux;
const { createStore } = Redux;

//JavaScript calculator
const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const MULTIPLY = "MULTIPLY";
const DIVIDE = "DIVIDE";
const EQUAL = "EQUAL";
const DIGIT = "DIGIT";
const DECIMAL = "DECIMAL";
const PLUSMINUS = "PLUSMINUS";
const CE = "CE";
const CLEARALL = "CLEARALL";
const DEL = "DEL";

const defaultCalcState = {
    queue: [], //this is the expression queue
    result: 0, //this number will be calculated after the equal button is pressed
    display: "0", //outputs will be strings
    operatorPressed: false, //this variable helps keep track of whether an operator was just pressed
    isNegative: false, //this variable keeps track of whether the plus/minus sign or the minus/negative sign has been pressed
}

const add = () => {
    return {
        type: ADD,
    }
}

const subtract = () => {
    return {
        type: SUBTRACT,
    }
}

const multiply = () => {
    return {
        type: MULTIPLY,
    }
}

const divide = () => {
    return {
        type: DIVIDE,
    }
}

const equal = () => {
    return {
        type: EQUAL,
    }
}

const digit = (number) => {
    return {
        type: DIGIT,
        num: number
    }
}

const decimal = () => {
    return {
        type: DECIMAL,
    }
}

const plusminus = () => {
    return {
        type: PLUSMINUS
    }
}

const ce = () => {
    return {
        type: CE
    }
}

const clearall = () => {
    return {
        type: CLEARALL
    }
}

const del = () => {
    return {
        type: DEL
    }
}

const evaluate = (leftHand, operator, rightHand) => {
    switch (operator) {
        case ADD:
            return leftHand + rightHand;
        case SUBTRACT:
            return leftHand - rightHand;
        case MULTIPLY:
            return leftHand * rightHand;
        case DIVIDE:
            return leftHand / rightHand;
        default:
            return -1;
   } 
} 

const isDigit = (char) => {
    switch (char) {
        case ONE:
        case TWO: 
        case THREE: 
        case FOUR: 
        case FIVE: 
        case SIX: 
        case SEVEN: 
        case EIGHT: 
        case NINE: 
        case ZERO: 
            return true;
        default:
            return false;
    } 
}

const isOperator = (char) => {
  switch (char) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY: 
    case DIVIDE:
      return true;
    default:
      return false;
  } 
}

const hasDecimal = (numString) => {
    for (let i = 0; i < numString.length; i++) {
        if (numString[i] === '.') {
            return true;
        }
    }
    return false;
}

const hasNegative = (numString) => {
    return numString[0] === '-';
}

const calcReducer = (state = defaultCalcState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case DIGIT:
            if (newState.operatorPressed === true) {
                newState.operatorPressed = false;
                newState.display = "0";
            }
            if (newState.display == "0.") {
                newState.display = newState.display + action.num;
                if (newState.isNegative) {
                    newState.display = -1 * parseFloat(newState.display,10);
                }
                return newState;
            }
            else if (newState.display == 0) {
                if (action.num == 0) {
                    return newState;
                }
                else {
                    newState.display = action.num;
                    if (newState.isNegative) {
                        newState.display = -1 * parseFloat(newState.display,10);
                    }
                    return newState;
                }
            }
            else {
                newState.display = newState.display + action.num;
                return newState;
            }
        case ADD:
        case SUBTRACT:
        case MULTIPLY:
        case DIVIDE:
            newState.isNegative = false; //reset the plus/minus sign to positive
            if (newState.queue.length === 0) {
                newState.queue.push(newState.display);
                newState.queue.push(action.type);
                newState.operatorPressed = true;
            }
            else if (newState.operatorPressed === false) {
                newState.queue.push(newState.display);
                newState.queue.push(action.type);
                newState.operatorPressed = true;
            }
            else if (action.type == SUBTRACT) { //instead of replacing previously pushed operator, change the plus/minus sign
                newState.isNegative = !newState.isNegative; //reverse true to false, or false to true
                return newState;
            }
            else { //replace previously pushed operator with this new operator
                newState.queue.pop();
                newState.queue.push(action.type);
            }
            return newState;
        case EQUAL:
            if (newState.queue.length === 0) { //empty queue, a number may be displayed, and equal button pressed
                newState.result = newState.display;
                newState.operatorPressed = true;
                return newState;
            }
            else if (newState.operatorPressed === true) { //equal operator pressed immediately after another operator
                newState.queue.pop(); //remove the last operator and continue executing the code
            }
            
            newState.queue.push(newState.display); //add the last displayed number into the queue

            let leftHand = parseFloat(newState.queue.shift(),10);
            let operator = newState.queue.shift();
            let rightHand = parseFloat(newState.queue.shift(),10);
            let result = evaluate(leftHand, operator, rightHand) //evaluate the result
            result = Math.round(result * 1e8) / 1e8; //max decimal places: 8
            newState.queue.unshift(result); //add result back into the front of the queue
            
            while (newState.queue.length >= 3) { //process the rest of the queue
                leftHand = parseFloat(newState.queue.shift(),10);
                operator = newState.queue.shift();
                rightHand = parseFloat(newState.queue.shift(),10);
                result = evaluate(leftHand, operator, rightHand);
                result = Math.round(result * 1e8) / 1e8; //max decimal places: 8
                newState.queue.unshift(result);
            }
            
            newState.result = result;
            newState.display = String(newState.result);
            //the following code resets the rest of the state to their default values
            newState.queue = [];
            newState.operatorPressed = true;
            newState.isNegative = false;
            return newState;

        case DECIMAL:
            if (newState.operatorPressed === true) { //this handles the case where a decimal is placed immediately after an operator
                newState.operatorPressed = false;
                newState.display = "0";
            }
            if (!hasDecimal(newState.display)) { // check if display variable already has a decimal
                newState.display = newState.display + '.';
            }
            return newState;
        case DEL:
            newState.display = newState.display.substring(0, newState.display.length-1);
            if (newState.display.length == 0) {
                newState.display = "0";
            }
            return newState;
        case CLEARALL:
            newState.queue = [];
            newState.display = "0";
            newState.result = 0;
            newState.operatorPressed = false;
            return newState;
        case CE:
            newState.display = "0";
            return newState; 
        case PLUSMINUS:
            newState.isNegative = !newState.isNegative; //reverse true to false, or false to true
            if (newState.display != 0) { //don't multiply 0 by -1, or else a bug is introduced
                newState.display = -1 * parseFloat(newState.display,10);
            }
            return newState;
         default:
            return state;
    }
}
  
//const store = Redux.createStore(countReducer);
const store = Redux.createStore(calcReducer);

//React Redux Code
const mapStateToProps = state => {
    return {
        storeState: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitIncrement: () => {
            return dispatch(incrementCount())
        },
        submitDecrement: () => {
            return dispatch(decrementCount())
        },
        submitReset: () => {
            return dispatch(resetCount())
        },
        submitAdd: () => {
            return dispatch(add())
        },
        submitSubtract: () => {
            return dispatch(subtract())
        },
        submitMultiply: () => {
            return dispatch(multiply())
        },
        submitDivide: () => {
            return dispatch(divide())
        },
        submitEqual: () => {
            return dispatch(equal())
        },
        submitDigit: (number) => {
            return dispatch(digit(number))
        },
        submitDecimal: () => {
            return dispatch(decimal())
        },
        submitPlusMinus: () => {
            return dispatch(plusminus())
        },
        submitClearAll: () => {
            return dispatch(clearall())
        },
        submitCE: () => {
            return dispatch(ce())
        },
        submitDel: () => {
            return dispatch(del())
        }
    }
}


//React Code
const br = React.createElement(
    "br",
    null,
    null
);

const CalcButton = (buttonName, properties) => {  //Stateless component for calculator buttons
    return React.createElement(
        "button",
        {
            ...properties, //using the spread operator here so that I can add additional properties
            className: "calcBtn", //all CalcButtons will have a class name of calcBtn. A CSS stylesheet will use this hook to style the buttons
        },
        buttonName
    );
}


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleCalcButton = this.handleCalcButton.bind(this);

        this.calculatorContainerStyle = {
            border: "1px solid black",
            width: "280px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            fontSize: "2em",
            backgroundColor: "#282461",
            display: "grid",
            gridTemplateRows: "2.5em repeat(5, 1fr)"
        };

        this.calculatorDisplayStyle = {
            border: "1px solid black",
            width: "256px",
            minHeight: "2em",
            padding: "10px",
            textAlign: "right",
            marginTop: "5px",
            marginBottom: "50px",
            backgroundColor: "#eeeeee",
            borderRadius: "10px"
        }
        
    }

    handleCalcButton(buttonValue) {
        switch (buttonValue) {
            case "Del":
                this.props.submitDel();
                break;
            case "CE":
                this.props.submitCE();
                break;
            case "plusMinus":
                this.props.submitPlusMinus();
                break;
            case "add":
               this.props.submitAdd();
                break;
            case "subtract":
                this.props.submitSubtract();
                break;
            case "multiply":
                this.props.submitMultiply();
                break;
            case "divide":
                this.props.submitDivide();
                break;
            case "equal":
                this.props.submitEqual();
                break;
            case "decimal":
                this.props.submitDecimal();
                break;
            case "clearAll":
                this.props.submitClearAll();
                break;
            default: //the default case is a digit
                this.props.submitDigit(buttonValue);
        }
    }

    render() {
        return(
            React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    {
                        id: "main",
                        style: this.calculatorContainerStyle
                    },
                    React.createElement(
                        "div",
                        {
                            id: "display",
                            style: {
                                ...this.calculatorDisplayStyle,
                                gridRow: "1",
                            }
                        },
                        this.props.storeState.display
                    ),
                    /* Button Row 1 */
                    React.createElement(
                        "div",
                        {
                            id: "buttonRow1",
                            gridRow: "2",
                        },
                        CalcButton("CE", {onClick: () => this.handleCalcButton("CE")}),
                        CalcButton("C", {id: "clear", onClick: () => this.handleCalcButton("clearAll")}),
                        CalcButton("Del", {onClick: () => this.handleCalcButton("Del")}),
                        CalcButton("/", {id: "divide", onClick: () => this.handleCalcButton("divide")}),
                    ),
                    /* Button Row 2 */
                    React.createElement(
                        "div",
                        {
                            id: "buttonRow2",
                            gridRow: "3"
                        },
                        CalcButton("7", {id: "seven", onClick: () => this.handleCalcButton("7")}),
                        CalcButton("8", {id: "eight", onClick: () => this.handleCalcButton("8")}),
                        CalcButton("9", {id: "nine", onClick: () => this.handleCalcButton("9")}),
                        CalcButton( "*", {id: "multiply", onClick: () => this.handleCalcButton("multiply")}),
                    ),
                    /* Button Row 3 */
                    React.createElement(
                        "div",
                        {
                            id: "buttonRow3",
                            gridRow: "4"
                        },
                        CalcButton("4", {id: "four", onClick: () => this.handleCalcButton("4")}),
                        CalcButton("5", {id: "five", onClick: () => this.handleCalcButton("5")}),
                        CalcButton("6", {id: "six", onClick: () => this.handleCalcButton("6")}),
                        CalcButton("-", {id: "subtract", onClick: () => this.handleCalcButton("subtract")}),
                    ),
                    /* Button Row 4 */
                    React.createElement(
                        "div",
                        {
                            id: "buttonRow4",
                            gridRow: "5"
                        },
                        CalcButton("1", {id: "one", onClick: () => this.handleCalcButton("1")}),
                        CalcButton("2", {id: "two", onClick: () => this.handleCalcButton("2")}),
                        CalcButton("3", {id: "three", onClick: () => this.handleCalcButton("3")}),
                        CalcButton("+", {id: "add", onClick: () => this.handleCalcButton("add")}),
                    ),
                    /* Button Row 5 */
                    React.createElement(
                        "div",
                        {
                            id: "buttonRow5",
                            gridRow: "6"
                        },
                        CalcButton("+|-", {onClick: () => this.handleCalcButton("plusMinus")}),
                        CalcButton("0", {id: "zero", onClick: () => this.handleCalcButton("0")}),
                        CalcButton(".", {id: "decimal", onClick: () => this.handleCalcButton("decimal")}),
                        CalcButton("=", {id: "equals", onClick: () => this.handleCalcButton("equal")}),
                    ),
                )
            )
        )
    }
}

const Container = connect(mapStateToProps,mapDispatchToProps)(MyComponent);

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            React.createElement(
                Provider,
                {store: store},
                React.createElement(Container, null, null)
            )
        )
    }
}

ReactDOM.render(
    React.createElement(AppWrapper),
    document.querySelector("#app")
)