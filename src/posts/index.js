import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ControllerButton = () => (
  <div className="blog__controller">
    <Link to="/posts" className="blog__contorller--back">
      <Button variant="outline-dark"> back </Button>
    </Link>
    <Button variant="outline-success">編輯</Button>
    <Button variant="outline-danger">刪除</Button>
  </div>
)
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
    const date = new Date(post.createdAt);
    return (
      <div>
        <h1>POST</h1>
        <div> {/** 預計把讀取跟文字分開，可能要另外寫 component */}
          <div className="blog__controller">
            <h1>{post.title ? post.title : 'Loading'}</h1>
            <ControllerButton />
          </div>
          <div className="blog__author">作者：{post.author}</div>
          <div className="blog__created-at">發布時間：{date.toString()}</div>
          <hr />
          <p className="blog__article">{post.body}</p>
        </div>
      </div>
    );

  }
}

export default Post;
