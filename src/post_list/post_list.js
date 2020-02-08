import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './post_list.css';
import { EditingWindow,  DeleteWindow } from '../editing_window/';

const ControllerButton = ({ post }) => {
  const [editingShow, setEditingShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false); // 之後新處理

  return (
    <div className="blog__controller">
      <Button variant="outline-success" onClick={() => setEditingShow(true)} >編輯</Button>
      <Button variant="outline-danger" onClick={() => setDeleteShow(true)}>刪除</Button>
      {editingShow &&
        <EditingWindow /** 編輯視窗 */
          show={editingShow}
          onHide={() => setEditingShow(false)}
          state="editing"
          post={post}
        />}
      {deleteShow &&
        <DeleteWindow 
          show={deleteShow}
          onHide={() => setDeleteShow(false)}
          state="delete"
          post={post}
        />}
    </div>
  )
}

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
          <ControllerButton handleEditing={handleEditing} post={post} />
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
      isPublish: false,
    }
  }

  handlePublish = (isPublish) => {
    this.setState({ isPublish, })
  }

  componentDidMount() {
    axios.get('https://qootest.com/posts')
      .then(res => {
        this.setState({
          data: res.data.filter(({ title, author }) => title && author),
        }); // 太多無用資料，決定先篩選，才使用。
      });
  }

  /** 之後可以改成兩種呈現方式，條列式格狀顯示 */
  render() {
    const { data, isPublish } = this.state;
    const { history } = this.props;
    return (
      <div className="blog">
        {isPublish &&
          <EditingWindow /* 編輯視窗 */
            show={isPublish}
            onHide={() => this.handlePublish(false)}
            state="publish"
          />}
        <header className="header">
          <div className="header__title">部落格文章</div>
          <div className="header__newpost">
            <Button
              variant="outline-primary"
              onClick={() => this.handlePublish(true)}
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
