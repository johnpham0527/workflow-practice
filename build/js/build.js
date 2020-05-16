'use strict'; //Redux Code

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ReactRedux = ReactRedux,
    Provider = _ReactRedux.Provider,
    connect = _ReactRedux.connect;
var _Redux = Redux,
    createStore = _Redux.createStore; //JavaScript calculator

var ADD = "ADD";
var SUBTRACT = "SUBTRACT";
var MULTIPLY = "MULTIPLY";
var DIVIDE = "DIVIDE";
var EQUAL = "EQUAL";
var DIGIT = "DIGIT";
var DECIMAL = "DECIMAL";
var PLUSMINUS = "PLUSMINUS";
var CE = "CE";
var CLEARALL = "CLEARALL";
var DEL = "DEL";
var defaultCalcState = {
  queue: [],
  //this is the expression queue
  result: 0,
  //this number will be calculated after the equal button is pressed
  display: "0",
  //outputs will be strings
  operatorPressed: false,
  //this variable helps keep track of whether an operator was just pressed
  isNegative: false //this variable keeps track of whether the plus/minus sign or the minus/negative sign has been pressed

};

var add = function add() {
  return {
    type: ADD
  };
};

var subtract = function subtract() {
  return {
    type: SUBTRACT
  };
};

var multiply = function multiply() {
  return {
    type: MULTIPLY
  };
};

var divide = function divide() {
  return {
    type: DIVIDE
  };
};

var equal = function equal() {
  return {
    type: EQUAL
  };
};

var digit = function digit(number) {
  return {
    type: DIGIT,
    num: number
  };
};

var decimal = function decimal() {
  return {
    type: DECIMAL
  };
};

var plusminus = function plusminus() {
  return {
    type: PLUSMINUS
  };
};

var ce = function ce() {
  return {
    type: CE
  };
};

var clearall = function clearall() {
  return {
    type: CLEARALL
  };
};

var del = function del() {
  return {
    type: DEL
  };
};

var evaluate = function evaluate(leftHand, operator, rightHand) {
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
};

var isDigit = function isDigit(_char) {
  switch (_char) {
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
};

var isOperator = function isOperator(_char2) {
  switch (_char2) {
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE:
      return true;

    default:
      return false;
  }
};

var hasDecimal = function hasDecimal(numString) {
  for (var i = 0; i < numString.length; i++) {
    if (numString[i] === '.') {
      return true;
    }
  }

  return false;
};

var hasNegative = function hasNegative(numString) {
  return numString[0] === '-';
};

var calcReducer = function calcReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCalcState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newState = Object.assign({}, state);

  switch (action.type) {
    case DIGIT:
      if (newState.operatorPressed === true) {
        newState.operatorPressed = false;
        newState.display = "0";
      }

      if (newState.display == "0.") {
        newState.display = newState.display + action.num;

        if (newState.isNegative) {
          newState.display = -1 * parseFloat(newState.display, 10);
        }

        return newState;
      } else if (newState.display == 0) {
        if (action.num == 0) {
          return newState;
        } else {
          newState.display = action.num;

          if (newState.isNegative) {
            newState.display = -1 * parseFloat(newState.display, 10);
          }

          return newState;
        }
      } else {
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
      } else if (newState.operatorPressed === false) {
        newState.queue.push(newState.display);
        newState.queue.push(action.type);
        newState.operatorPressed = true;
      } else if (action.type == SUBTRACT) {
        //instead of replacing previously pushed operator, change the plus/minus sign
        newState.isNegative = !newState.isNegative; //reverse true to false, or false to true

        return newState;
      } else {
        //replace previously pushed operator with this new operator
        newState.queue.pop();
        newState.queue.push(action.type);
      }

      return newState;

    case EQUAL:
      if (newState.queue.length === 0) {
        //empty queue, a number may be displayed, and equal button pressed
        newState.result = newState.display;
        newState.operatorPressed = true;
        return newState;
      } else if (newState.operatorPressed === true) {
        //equal operator pressed immediately after another operator
        newState.queue.pop(); //remove the last operator and continue executing the code
      }

      newState.queue.push(newState.display); //add the last displayed number into the queue

      var leftHand = parseFloat(newState.queue.shift(), 10);
      var operator = newState.queue.shift();
      var rightHand = parseFloat(newState.queue.shift(), 10);
      var result = evaluate(leftHand, operator, rightHand); //evaluate the result

      result = Math.round(result * 1e8) / 1e8; //max decimal places: 8

      newState.queue.unshift(result); //add result back into the front of the queue

      while (newState.queue.length >= 3) {
        //process the rest of the queue
        leftHand = parseFloat(newState.queue.shift(), 10);
        operator = newState.queue.shift();
        rightHand = parseFloat(newState.queue.shift(), 10);
        result = evaluate(leftHand, operator, rightHand);
        result = Math.round(result * 1e8) / 1e8; //max decimal places: 8

        newState.queue.unshift(result);
      }

      newState.result = result;
      newState.display = String(newState.result); //the following code resets the rest of the state to their default values

      newState.queue = [];
      newState.operatorPressed = true;
      newState.isNegative = false;
      return newState;

    case DECIMAL:
      if (newState.operatorPressed === true) {
        //this handles the case where a decimal is placed immediately after an operator
        newState.operatorPressed = false;
        newState.display = "0";
      }

      if (!hasDecimal(newState.display)) {
        // check if display variable already has a decimal
        newState.display = newState.display + '.';
      }

      return newState;

    case DEL:
      newState.display = newState.display.substring(0, newState.display.length - 1);

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

      if (newState.display != 0) {
        //don't multiply 0 by -1, or else a bug is introduced
        newState.display = -1 * parseFloat(newState.display, 10);
      }

      return newState;

    default:
      return state;
  }
}; //const store = Redux.createStore(countReducer);


var store = Redux.createStore(calcReducer); //React Redux Code

var mapStateToProps = function mapStateToProps(state) {
  return {
    storeState: state
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitIncrement: function submitIncrement() {
      return dispatch(incrementCount());
    },
    submitDecrement: function submitDecrement() {
      return dispatch(decrementCount());
    },
    submitReset: function submitReset() {
      return dispatch(resetCount());
    },
    submitAdd: function submitAdd() {
      return dispatch(add());
    },
    submitSubtract: function submitSubtract() {
      return dispatch(subtract());
    },
    submitMultiply: function submitMultiply() {
      return dispatch(multiply());
    },
    submitDivide: function submitDivide() {
      return dispatch(divide());
    },
    submitEqual: function submitEqual() {
      return dispatch(equal());
    },
    submitDigit: function submitDigit(number) {
      return dispatch(digit(number));
    },
    submitDecimal: function submitDecimal() {
      return dispatch(decimal());
    },
    submitPlusMinus: function submitPlusMinus() {
      return dispatch(plusminus());
    },
    submitClearAll: function submitClearAll() {
      return dispatch(clearall());
    },
    submitCE: function submitCE() {
      return dispatch(ce());
    },
    submitDel: function submitDel() {
      return dispatch(del());
    }
  };
}; //React Code


var br = React.createElement("br", null, null);

var CalcButton = function CalcButton(buttonName, properties) {
  //Stateless component for calculator buttons
  return React.createElement("button", _objectSpread(_objectSpread({}, properties), {}, {
    //using the spread operator here so that I can add additional properties
    className: "calcBtn" //all CalcButtons will have a class name of calcBtn. A CSS stylesheet will use this hook to style the buttons

  }), buttonName);
};

var MyComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(MyComponent, _React$Component);

  var _super = _createSuper(MyComponent);

  function MyComponent(props) {
    var _this;

    _classCallCheck(this, MyComponent);

    _this = _super.call(this, props);
    _this.handleCalcButton = _this.handleCalcButton.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MyComponent, [{
    key: "handleCalcButton",
    value: function handleCalcButton(buttonValue) {
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

        default:
          //the default case is a digit
          this.props.submitDigit(buttonValue);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", null, React.createElement("div", {
        id: "main"
      }, React.createElement("div", {
        id: "display"
      }, this.props.storeState.display), CalcButton("CE", {
        onClick: function onClick() {
          return _this2.handleCalcButton("CE");
        }
      }), CalcButton("C", {
        id: "clear",
        onClick: function onClick() {
          return _this2.handleCalcButton("clearAll");
        }
      }), CalcButton("Del", {
        onClick: function onClick() {
          return _this2.handleCalcButton("Del");
        }
      }), CalcButton("/", {
        id: "divide",
        onClick: function onClick() {
          return _this2.handleCalcButton("divide");
        }
      }), CalcButton("7", {
        id: "seven",
        onClick: function onClick() {
          return _this2.handleCalcButton("7");
        }
      }), CalcButton("8", {
        id: "eight",
        onClick: function onClick() {
          return _this2.handleCalcButton("8");
        }
      }), CalcButton("9", {
        id: "nine",
        onClick: function onClick() {
          return _this2.handleCalcButton("9");
        }
      }), CalcButton("*", {
        id: "multiply",
        onClick: function onClick() {
          return _this2.handleCalcButton("multiply");
        }
      }), CalcButton("4", {
        id: "four",
        onClick: function onClick() {
          return _this2.handleCalcButton("4");
        }
      }), CalcButton("5", {
        id: "five",
        onClick: function onClick() {
          return _this2.handleCalcButton("5");
        }
      }), CalcButton("6", {
        id: "six",
        onClick: function onClick() {
          return _this2.handleCalcButton("6");
        }
      }), CalcButton("-", {
        id: "subtract",
        onClick: function onClick() {
          return _this2.handleCalcButton("subtract");
        }
      }), CalcButton("1", {
        id: "one",
        onClick: function onClick() {
          return _this2.handleCalcButton("1");
        }
      }), CalcButton("2", {
        id: "two",
        onClick: function onClick() {
          return _this2.handleCalcButton("2");
        }
      }), CalcButton("3", {
        id: "three",
        onClick: function onClick() {
          return _this2.handleCalcButton("3");
        }
      }), CalcButton("+", {
        id: "add",
        onClick: function onClick() {
          return _this2.handleCalcButton("add");
        }
      }), CalcButton("+|-", {
        onClick: function onClick() {
          return _this2.handleCalcButton("plusMinus");
        }
      }), CalcButton("0", {
        id: "zero",
        onClick: function onClick() {
          return _this2.handleCalcButton("0");
        }
      }), CalcButton(".", {
        id: "decimal",
        onClick: function onClick() {
          return _this2.handleCalcButton("decimal");
        }
      }), CalcButton("=", {
        id: "equals",
        onClick: function onClick() {
          return _this2.handleCalcButton("equal");
        }
      })));
    }
  }]);

  return MyComponent;
}(React.Component);

var Container = connect(mapStateToProps, mapDispatchToProps)(MyComponent);

var AppWrapper = /*#__PURE__*/function (_React$Component2) {
  _inherits(AppWrapper, _React$Component2);

  var _super2 = _createSuper(AppWrapper);

  function AppWrapper(props) {
    _classCallCheck(this, AppWrapper);

    return _super2.call(this, props);
  }

  _createClass(AppWrapper, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        store: store
      }, React.createElement(Container, null, null));
    }
  }]);

  return AppWrapper;
}(React.Component);

ReactDOM.render(React.createElement(AppWrapper), document.querySelector("#app"));