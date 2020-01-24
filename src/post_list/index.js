import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './post_list.css';
import EditingWindow from '../editing_window/';

const ControllerButton = ({ handleEditing }) => (
  <div className="blog__controller">
    <Button variant="outline-success" onClick={() => handleEditing()} >編輯</Button>
    <Button variant="outline-danger">刪除</Button>
  </div>
)

const RenderPosts = ({ data, history, handleEditing }) => (
  <>
    {
      data.map(post => (
        <ListGroup.Item
          key={post.id}
          className="blog__post"
        >
          <div
            className="blog__title"
            onClick={() => history.push("/posts/" + post.id)}
          >
            {post.title}
          </div>
          <ControllerButton handleEditing={handleEditing} />
        </ListGroup.Item>
      ))
    }
  </>
)


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isEditing: false, // 預計之後改成 redux 的形式
      isPublish: false,
    }
  }

  handleEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing })
  }

  handlePublish = () => {
    const { isPublish } = this.state;
    this.setState({ isPublish: !isPublish })
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
    const { data, isEditing, isPublish } = this.state;
    const { history } = this.props;
    return (
      <div className="blog">
        {isEditing && <EditingWindow handleEditing={this.handleEditing} />}
        {isPublish && <EditingWindow handlePublish={this.handlePublish} />}
        <header className="header">
          <div className="header__title">部落格文章</div>
          <div className="header__newpost">
            <Button
              variant="outline-primary"
              onClick={this.handlePublish}
            >
              新增文章
            </Button>
          </div>
        </header>
        <main className="blog__posts">
          {/** 判斷是否讀取中 */
            data.length ?
              <RenderPosts
                data={data}
                history={history}
                handleEditing={this.handleEditing}
              /> :
              <Spinner animation="border" />
          }
        </main>

      </div>
    )
  }
}

export default withRouter(Posts);
