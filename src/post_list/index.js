import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './post_list.css';

const ControllerButton = () => (
  <div className="blog__controller">
    <Button variant="outline-success">編輯</Button>
    <Button variant="outline-danger">刪除</Button>
  </div>
)

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    axios.get('https://qootest.com/posts')
      .then(res => {
        this.setState({
          data: res.data.filter(({ title, author }) => title && author),
        }); // 太多無用資料，決定先篩選，才使用。
      });
  }

  render() {
    const { data } = this.state;
    const { history } = this.props;
    console.log(data)
    return (
      <div className="blog">
        <h1>部落格文章</h1>
        <div className="blog__posts">
          {data.length ?
            data.map(post => (
              <ListGroup.Item key={post.id}>
                <div
                  className="blog__title"
                  onClick={() => history.push("/posts/" + post.id)}
                >
                  {post.title}
                </div>
                <ControllerButton />
              </ListGroup.Item>
            )) : <Spinner animation="border" />
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Posts);
