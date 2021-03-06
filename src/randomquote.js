//Redux Code
const { Provider, connect } = ReactRedux;
const { createStore } = Redux;
const RANDOM = 'RANDOM';

const quotes = [
  {
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston S. Churchill'
  },
  {text: 'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.',
    author: 'Lao Tzu'
  },
  {text: 'Everyone has talent. What\'s rare is the courage to follow it to the dark places where it leads.',
    author: 'Erica Jong'
  },
  {text: 'Confront the dark parts of yourself, and work to banish them with illumination and forgiveness. Your willingness to wrestle with your demons will cause your angels to sing.',
    author: 'August Wilson'  
  },
  {text: 'Life shrinks or expands in proportion to one\'s courage.',
    author: 'Anais Nin'  
  },
  {text: 'Courage is resistance to fear, mastery of fear - not absence of fear.',
    author: 'Mark Twain'  
  },
  {text: 'Courage is found in unlikely places.',
    author: 'J.R.R. Tolkien'  
  },
  {text: 'I learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.',
    author: 'Nelson Mandela'  
  },
  {text: 'All happiness depends on courage and work.',
    author: 'Honoré de Balzac'  
  },
];

const colors = [
  "#5d6124", "#61245d", "#6155424", "#472461", "#245961", "#4a467b"
]

const defaultState = {
  type: '',
  count: 0,
  text: quotes[0].text,
  author: quotes[0].author,
  color: colors[0]
}

const randomCount = () => {
  return {
    type: RANDOM
  }
}


const quoteReducer = (state = defaultState, action) => {
  const new_object = Object.assign({},state);
  switch (action.type) {
    case RANDOM:
      new_object.count = Math.floor(Math.random()*quotes.length);
      new_object.text = quotes[new_object.count].text;
      new_object.author = quotes[new_object.count].author;
      new_object.color = colors[Math.floor(Math.random()*colors.length)];

       return new_object;       
    default:
      return state;
  }
}

const store = Redux.createStore(quoteReducer);

const mapStateToProps = state => {
  return {
    storeState: state
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submitRandom: () => {
      return dispatch(randomCount())
    }
  }
}

//React Code
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  setFadeIn = () => {
    let slide = document.querySelector("#app");
    slide.classList.add("fadeIn");
  }
  
  setFadeOut = () => {
    let slide = document.querySelector("#app");
    slide.classList.remove("fadeIn");
    this.props.submitRandom();
  }

  random = event => {
    event.preventDefault();
    this.setFadeIn();
    setTimeout(this.setFadeOut, 800);
  }
  render() {
    return (
      <div id='quote-box' style={{backgroundColor: this.props.storeState.color}}>
        <blockquote>
          <QuoteText text={this.props.storeState.text}/>
          <QuoteAuthor author={this.props.storeState.author}/>
          <DisplayTweetIcon author={this.props.storeState.author} text={this.props.storeState.text}/>
          <DisplayRandomButton random={this.random}/>
        </blockquote>

      </div>
    );
  }
}

const DisplayRandomButton = (props) => {
    return (
      <button id='new-quote' type='submit' onClick={props.random}>New Quote</button>
    );
}

const DisplayTweetIcon = (props) => {
    const link = 'http://twitter.com/intent/tweet?text=\"'+ props.text +'\" -- '+ props.author;
    return (
      <a href={link} target='_blank' id='tweet-quote'><img src='https://cdn4.iconfinder.com/data/icons/color-webshop/512/twitter_bird-512.png' class='tweet'/></a>
    );
}

const QuoteText = (props) => {
    return (
      <p id='text' className='fadeOut'>{props.text}</p>
    );
}

const QuoteAuthor = (props) => {
    return (
      <footer id='author'>&mdash; {props.author}</footer>
    );
}

const Container = connect(mapStateToProps,mapDispatchToProps)(App);

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}><Container /></Provider>
    );  
  }
}

ReactDOM.render(<AppWrapper />,document.getElementById('app'));