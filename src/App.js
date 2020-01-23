import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
import Nav from './nav/';
import Home from './home/';
import PostList from './post_list/';
import Posts from './posts/';
import About from './about/';
import Footer from './footer/';

class BG extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0,
    }
  }

  componentWillMount() {
    const backgroundHieght = document.body.clientHeight;
    console.log(backgroundHieght)
    this.setState({height: backgroundHieght})
  }

  render() {
    const {height} = this.state;
    const style={
      height: height+100
    }
    return (
      <>
        {/*遮罩層*/}
        <div id="cover" style={style} >
        </div>
        {/*彈窗*/}
        <div id="showdiv" >
          {/*標題*/}
          <div id="tips" >
            提示
          </div>
          {/*內容*/}
          <div id="content">
            js彈窗 js彈出DIV,並使整個頁面背景變暗</div>
          {/*按鈕*/}
          <div id="btn">
            確 定
          </div>
        </div>
      </>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  render() {
    const {isEditing} = this.state;
    return (
      <Router>
        <div className="App">
          <Nav />
          <button 
          onClick={()=> this.setState({isEditing: !isEditing})}
          >測試</button>
          {isEditing && <BG />}
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
