import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import './posts.css';

const ControllerButton = () => (
  <div className="article__controller">
    <Link to="/posts" className="blog__contorller--back">
      <Button variant="outline-dark"> back </Button>
    </Link>
    <Button variant="outline-success">編輯</Button>
    <Button variant="outline-danger">刪除</Button>
  </div>
)

const ArticleContent = ({ post, date }) => (
  <>
    <header className="article__header">
      <h1>{post.title}</h1>
      <div className="article__meta">
        <div className="article__info">
          <div className="article__author">作者：{post.author}</div>
          <div className="article__created-at">發布時間：{date.toString()}</div>
        </div>
        <ControllerButton />
      </div>
    </header>
    <hr />
    <p className="article__body">{post.body}</p>
  </>
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
      <div className="article">
        {
          post.title ?
            <ArticleContent post={post} date={date} /> :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
        }
      </div>
    );

  }
}

export default Post;
