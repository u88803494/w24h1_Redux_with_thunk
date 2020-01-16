import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Nav from './nav/';
import Home from './home/';
import PostList from './post_list/';
import Posts from './posts/';
import About from './about/';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostList} />
          <Route path="/about" component={About} />
          <Route path="/posts/:postId" component={Posts} />
        </div>
      </Router>
    );
  }
}

export default App;
