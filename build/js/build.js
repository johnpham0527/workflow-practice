"use strict";

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Redux Code
var _ReactRedux = ReactRedux,
    Provider = _ReactRedux.Provider,
    connect = _ReactRedux.connect;
var _Redux = Redux,
    createStore = _Redux.createStore;
var RANDOM = 'RANDOM';
var quotes = [{
  text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  author: 'Winston S. Churchill'
}, {
  text: 'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.',
  author: 'Lao Tzu'
}, {
  text: 'Everyone has talent. What\'s rare is the courage to follow it to the dark places where it leads.',
  author: 'Erica Jong'
}, {
  text: 'Confront the dark parts of yourself, and work to banish them with illumination and forgiveness. Your willingness to wrestle with your demons will cause your angels to sing.',
  author: 'August Wilson'
}, {
  text: 'Life shrinks or expands in proportion to one\'s courage.',
  author: 'Anais Nin'
}, {
  text: 'Courage is resistance to fear, mastery of fear - not absence of fear.',
  author: 'Mark Twain'
}, {
  text: 'Courage is found in unlikely places.',
  author: 'J.R.R. Tolkien'
}, {
  text: 'I learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.',
  author: 'Nelson Mandela'
}, {
  text: 'All happiness depends on courage and work.',
  author: 'Honoré de Balzac'
}];
var colors = ["#5d6124", "#61245d", "#6155424", "#472461", "#245961", "#4a467b"];
var defaultState = {
  type: '',
  count: 0,
  text: quotes[0].text,
  author: quotes[0].author,
  color: colors[0]
};

var randomCount = function randomCount() {
  return {
    type: RANDOM
  };
}; //Transition Code


var setFadeIn = function setFadeIn() {
  var slide = document.querySelector("#app");
  slide.classList.add("fadeIn");
};

var setFadeOut = function setFadeOut() {
  var slide = document.querySelector("#app");
  slide.classList.remove("fadeIn");
};

var quoteReducer = function quoteReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var new_object = Object.assign({}, state);

  switch (action.type) {
    case RANDOM:
      new_object.count = Math.floor(Math.random() * quotes.length);
      new_object.text = quotes[new_object.count].text;
      new_object.author = quotes[new_object.count].author;
      new_object.color = colors[Math.floor(Math.random() * colors.length)];
      setFadeIn();
      setTimeout(setFadeOut, 500);
      return new_object;

    default:
      return state;
  }
};

var store = Redux.createStore(quoteReducer);

var mapStateToProps = function mapStateToProps(state) {
  return {
    storeState: state
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    submitRandom: function submitRandom() {
      return dispatch(randomCount());
    }
  };
}; //React Code


var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "random", function (event) {
      event.preventDefault();

      _this.props.submitRandom();
    });

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "quote-box",
        style: {
          backgroundColor: this.props.storeState.color
        }
      }, /*#__PURE__*/React.createElement("blockquote", null, /*#__PURE__*/React.createElement(QuoteText, {
        text: this.props.storeState.text
      }), /*#__PURE__*/React.createElement(QuoteAuthor, {
        author: this.props.storeState.author
      }), /*#__PURE__*/React.createElement(DisplayTweetIcon, {
        author: this.props.storeState.author,
        text: this.props.storeState.text
      }), /*#__PURE__*/React.createElement(DisplayRandomButton, {
        random: this.random
      })));
    }
  }]);

  return App;
}(React.Component);

var DisplayRandomButton = function DisplayRandomButton(props) {
  return /*#__PURE__*/React.createElement("button", {
    id: "new-quote",
    type: "submit",
    onClick: props.random
  }, "New Quote");
};

var DisplayTweetIcon = function DisplayTweetIcon(props) {
  var link = 'http://twitter.com/intent/tweet?text=\"' + props.text + '\" -- ' + props.author;
  return /*#__PURE__*/React.createElement("a", {
    href: link,
    target: "_blank",
    id: "tweet-quote"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cdn4.iconfinder.com/data/icons/color-webshop/512/twitter_bird-512.png",
    "class": "tweet"
  }));
};

var QuoteText = function QuoteText(props) {
  return /*#__PURE__*/React.createElement("p", {
    id: "text"
  }, props.text);
};

var QuoteAuthor = function QuoteAuthor(props) {
  return /*#__PURE__*/React.createElement("footer", {
    id: "author"
  }, "\u2014 ", props.author);
};

var Container = connect(mapStateToProps, mapDispatchToProps)(App);

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
      return /*#__PURE__*/React.createElement(Provider, {
        store: store
      }, /*#__PURE__*/React.createElement(Container, null));
    }
  }]);

  return AppWrapper;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('app'));