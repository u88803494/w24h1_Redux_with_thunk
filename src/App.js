import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Nav from './component/nav/';
import Home from './containers/HomeContainer';
import PostList from './component/post_list/';
import Posts from './component/posts/';
import About from './component/about/';
import Footer from './component/footer/';

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
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
