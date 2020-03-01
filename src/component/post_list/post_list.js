import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import DeleteWindow from '../../containers/DeleteWindowContainer';
import EditingWindow from '../../containers/EditingWindowContainer';
import { getPosts } from '../../WebAPI';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './post_list.css';

const ControllerButton = ({ postId }) => {
  const [editingShow, setEditingShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const handleEdit = () => setEditingShow(true); // 另外寫出來省資源
  const handleDelete = () => setDeleteShow(true);

  return (
    <div className="blog__controller">
      <Button variant="outline-success" onClick={handleEdit}>編輯</Button>
      {
        editingShow &&
        <EditingWindow /** 編輯視窗 */
          show={editingShow}
          onHide={() => setEditingShow(false)}
          status="editing"
          postId={postId}
        />
      }

      <Button variant="outline-danger" onClick={handleDelete}>刪除</Button>
      {
        deleteShow &&
        <DeleteWindow
          show={deleteShow}
          onHide={() => setDeleteShow(false)}
          status="delete"
          postId={postId}
        />
      }
    </div>
  );
};

const RenderPosts = ({ data, history }) => (
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
          <ControllerButton postId={post.id} />
        </ListGroup.Item>
      ))
    }
  </>
)

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false, // 之後改成 redux 增加可用範圍
    }
  }

  handleCreate = (isCreate) => {
    this.setState({ isCreate, })
  }

  handleShowWindows = () => {
    const { showWindows } = this.props;
    const showData = {
      isShow: true,
      state: 'create', // 考慮之後改成 method
      show: true, // 是否顯現的值
      onHide: () => { console.log('onHide func.') } // 關閉視窗的 function // 似乎沒必要傳入，由 redux 管理即可
    }
    showWindows(showData)
  }

  componentDidMount() {
    getPosts() // call api 也許可以改在 RenderPosts 那裡
      .then(res => {
        const result = res.data // 篩選無用資料
          .filter(({ title, author, body }) => title && author && body);
        this.props.updatePosts(result); // 傳給 Redux
      })
  }

  render() { /** 之後可以改成兩種呈現方式，條列式格狀顯示 */
    const { isCreate } = this.state;
    const { history, postsListData, showWindows } = this.props; // 從 Redux 抓資料了

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
            <Button
              variant="outline-primary"
              onClick={this.handleShowWindows}
            >
              redux 彈出測試
            </Button>
            {
              isCreate &&
              <EditingWindow /* 新增共用編輯視窗 */
                show={isCreate}
                onHide={() => this.handleCreate(false)}
                status="create"
              />
            }
          </div>
        </header>
        <main className="blog__posts">
          {/** 判斷是否讀取中 */
            postsListData.length ?
              <RenderPosts
                data={postsListData}
                history={history}
              /> :
              <Spinner animation="border" />
          }
        </main>
      </div>
    )
  }
}

export default withRouter(Posts);
