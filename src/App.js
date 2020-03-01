import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Nav from './containers/NavContainer';
import Home from './containers/HomeContainer';
import PostList from './containers/PostsListContainer';
import EditingWindow from './containers/EditingWindowContainer';
import Posts from './component/posts/';
import About from './component/about/';
import Footer from './component/footer/';

class App extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Router>
        <div className="App">
          <EditingWindow // 共用彈出視窗，但似乎不能包在這層
            show={false}
            onHide={'() => this.handleCreate(false)'}
            status="create"
          />
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
