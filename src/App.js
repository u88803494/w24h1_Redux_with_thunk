import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Nav from './nav/';
import Home from './home/';
import PostList from './post_list/';
import Posts from './posts/';
import About from './about/';
import Footer from './footer/';
import EditingWindow from './editing_window/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  bgOut = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing })
  }

  render() {
    const { isEditing } = this.state;
    return (
      <Router>
        <div className="App">
          <Nav />
          <button
            onClick={this.bgOut}
          >測試</button>
          {isEditing && <EditingWindow bgOut={this.bgOut} />}
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostList} />
          <Route path="/about" component={About} />
          <Route path="/posts/:postId" component={Posts} />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
