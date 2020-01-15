import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';


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

  // 待刪除
  post = (data, page) => (
    <div className="blog__post">
      <ul className="blog__title">{data[page]['title']}</ul>
      <hr />
      <div className="blog__article">{data[page]['body']}</div>
    </div>
  )

  render() {
    const { data } = this.state;
    const { history } = this.props;
    return (
      <div className="blog">部落格文章
          <div className="blog__posts">
          {
            data.map(post => (
              <ListGroup.Item
                key={post.id}
                onClick={() => history.push("/posts/" + post.id)}>
                {post.title}
              </ListGroup.Item>
            ))
          }

          {/*
            <ListGroup>
              data.map()
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          */ }

        </div>
      </div>
    )
  }
}

export default withRouter(Posts);
