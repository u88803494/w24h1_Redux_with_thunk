import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    }
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    axios.get('https://qootest.com/posts/' + postId)
      .then(res => {
        this.setState({
          post: res.data,
        })
      })
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <h1>POST</h1>
        <Link to="/posts"><Button variant="outline-dark"> back </Button> </Link>
        <div> {/** 預計把讀取跟文字分開，可能要另外寫 component */}
          <h1>{post.title ? post.title : 'Loading'}</h1>
          <div className="blog__author">作者：{post.author}</div>
          <div className="blog__created-at">創造時間：{post.createdAt}</div>
          <hr />
          <p className="blog__article">{post.body}</p>
        </div>
      </div>
    );

  }
}

export default Post;
