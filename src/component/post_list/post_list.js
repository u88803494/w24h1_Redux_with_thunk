import React, { Component, useState } from 'react';
// import { withRouter } from 'react-router-dom';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './post_list.css';
import { EditingWindow, DeleteWindow } from '../editing_window/';
import { getPosts } from '../../WebAPI';

const ControllerButton = ({ post, handleChangePosts }) => {
  const [editingShow, setEditingShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const handleEdit = () => setEditingShow(true); // 另外寫出來省資源
  const handleDelete = () => setDeleteShow(true);

  return (
    <div className="blog__controller">
      <Button variant="outline-success" onClick={handleEdit} >編輯</Button>
      {
        editingShow &&
        <EditingWindow /** 編輯視窗 */
          show={editingShow}
          onHide={() => setEditingShow(false)}
          status="editing"
          post={post}
          handleChangePosts={handleChangePosts}
        />
      }

      <Button variant="outline-danger" onClick={handleDelete}>刪除</Button>
      {
        deleteShow &&
        <DeleteWindow
          show={deleteShow}
          onHide={() => setDeleteShow(false)}
          status="delete"
          post={post}
          handleChangePosts={handleChangePosts}
        />
      }
    </div>
  );
};

const RenderPosts = ({ data, history, handleChangePosts }) => (
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
          <ControllerButton handleChangePosts={handleChangePosts} post={post} />
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
      isCreate: false,
    }
    this.id = 1;
  }

  handleCreate = (isCreate) => {
    this.setState({ isCreate, })
  }

  handleChangePosts = (method, changeData) => {
    /** 第一個變數是方式，第二個變更的資料 */
    const { data } = this.state;
    switch (method) {
      case 'create':
        this.setState({
          data: [{
            ...changeData,
            createdAt: new Date().getTime(), // 取得當前的 timestamp，雖然應該會跟伺服器上的不同
            id: this.id,
          },
          ...data, // 放後面才能符合逆排序
          ],
        })
        this.id += 1;
        break;
      case 'editing':
        this.setState({
          data: data.map((post) => {
            if (post.id !== changeData.id) return post;
            return {
              ...post,
              ...changeData,
            };
          })
        });
        break;
      case 'delete':
        this.setState({
          data: data.filter(post => post.id !== changeData.id)
        })
        break;
      default:
        console.log('一定是搞錯了什麼');
    }
  }

  componentDidMount() {
    getPosts() // call api 也許可以改在 RenderPosts 那裡
      .then(res => {
        this.setState({
          data: res.data
            .filter(({ title, author, body }) => title && author && body)
            .sort((a, b) => b.id - a.id),
        }); // 太多無用資料，決定先篩選之後逆排序
        this.id = res.data.length !== 0 ? res.data[res.data.length - 1].id + 1 : 1;
      });
  }

  render() { /** 之後可以改成兩種呈現方式，條列式格狀顯示 */
    const { data, isCreate } = this.state;
    const { history } = this.props;
    return (
      <div className="blog">
        <header className="header">
          <div className="header__title">部落格文章</div>
          <div className="header__newpost">
            <Button
              variant="outline-primary"
              onClick={() => this.handleCreate(true)}
            >
              新增文章
            </Button>
            {
              isCreate &&
              <EditingWindow /* 新增共用編輯視窗 */
                show={isCreate}
                onHide={() => this.handleCreate(false)}
                status="create"
                handleChangePosts={this.handleChangePosts}
              />
            }
          </div>
        </header>
        <main className="blog__posts">
          {/** 判斷是否讀取中 */
            data.length ?
              <RenderPosts
                data={data}
                history={history}
                handleChangePosts={this.handleChangePosts}
              /> :
              <Spinner animation="border" />
          }
        </main>
      </div>
    )
  }
}

export default Posts;
/* export default withRouter(Posts); */
