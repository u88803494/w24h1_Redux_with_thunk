import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import DeleteWindow from '../../containers/DeleteWindowContainer';
import EditingWindow from '../../containers/EditingWindowContainer';
import { getPosts } from '../../WebAPI';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import './post_list.css';

const ControllerButton = ({ postId, handleChangePosts }) => {
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
          postId={postId}
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
          postId={postId}
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
          <ControllerButton handleChangePosts={handleChangePosts} postId={post.id} />
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

  // handleChangePosts = (method, changeData) => {
  //   /** 第一個變數是方式，第二個變更的資料 */
  //   const { data } = this.state;
  //   switch (method) {
  //     case 'create':
  //       this.setState({
  //         data: [{
  //           ...changeData,
  //           createdAt: new Date().getTime(), // 取得當前的 timestamp，雖然應該會跟伺服器上的不同
  //           id: this.id,
  //         },
  //         ...data, // 放後面才能符合逆排序
  //         ],
  //       })
  //       this.id += 1;
  //       break;
  //     case 'editing':
  //       this.setState({
  //         data: data.map((post) => {
  //           if (post.id !== changeData.id) return post;
  //           return {
  //             ...post,
  //             ...changeData,
  //           };
  //         })
  //       });
  //       break;
  //     case 'delete':
  //       this.setState({
  //         data: data.filter(post => post.id !== changeData.id)
  //       })
  //       break;
  //     default:
  //       console.log('一定是搞錯了什麼');
  //     // 改成做完資歷之後，把資歷料回傳給 store
  //   }
  // }

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
    const { history, postsListData } = this.props; // 從 Redux 抓資料了

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
            postsListData.length ?
              <RenderPosts
                data={postsListData}
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

export default withRouter(Posts);
