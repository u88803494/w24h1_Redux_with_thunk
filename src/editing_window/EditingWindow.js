import React, { useState } from 'react';
import './editingWindow.css'; // 暫時無用之後確認無用就刪除
import { Button, Modal, Form } from 'react-bootstrap';
import * as webAPI from '../WebAPI';

/** 除了新增編輯功能之外，還要有刪除確認功能
 * 預計統合在一起，可能的話連 component name 都要換掉
 */

const EditingWindow = ({ onHide, show, post, status, handleChangePosts }) => {
  const newPost = { title: '', author: '', body: '', }
  const [thisPost, setThisPost] = useState(post ? post : newPost)

  const changePost = (e) => {
    setThisPost({
      ...thisPost,
      [e.target.name]: e.target.value,
    })
  }

  const handlePost = () => {
    handleChangePosts(status, thisPost);
    (status === 'create' ?
      webAPI.createPost(thisPost) : webAPI.updatePost(thisPost)) // 多個括號共用 .then
      .then(res => res.status <= 300 && onHide())
      .catch(err => console.log(err)) // .then .catch 是否會自己判斷 status?
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...{ onHide, show }
      /* 不太懂為什麼一定要加 ... 直接寫也會出 bug 只知道等同於下面
      onHide={onHide} show={show}，這樣的寫法是另外變成物件，然後傳給子 component 之後解構嗎
      */}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {status === "editing" ? "你正在編輯文章" : "你正在新增文章"}
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>標題</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter title"
              value={thisPost && thisPost.title}
              onChange={changePost}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>作者</Form.Label>
            <Form.Control
              name="author"
              type="text"
              placeholder="author/作者"
              value={thisPost && thisPost.author}
              onChange={changePost}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>內文</Form.Label>
            <Form.Control
              name="body"
              as="textarea"
              rows="5"
              placeholder="輸入內文"
              value={thisPost && thisPost.body}
              onChange={changePost}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onHide}
          >
            Close
          </Button>
          <Button
            variant="outline-primary"
            onClick={handlePost}
          >
            {status === 'editing' ? '儲存文章' : '新增文章'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    /* 編輯送出之後，還要讓整個資料可以改變 */
  );
}

const DeleteWindow = ({ onHide, show, post, status, handleChangePosts }) => {
  const handleDelete = (postId) => {
    handleChangePosts(status, post) // 改變父狀態
    webAPI.deletePost(postId) // 改變伺服器
      .then(res => res.state === 200 && console.log('成功'))
      .catch(res => res.state !== 200 && console.log('失敗'))
    /** 後續改進：
     * loading 畫面寫法，另外開一個狀態是表示送出中，
     * 然後 cdu 的時候就偵測這個值有沒有改變，或是偵測有無按下確認刪除
     * 有的話就發出 Ajax，然後 ajax 的 cb 就放變更成功失敗訊息的 component
     * 並在幾秒後執行關閉彈出視窗
     */
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          警告！你正在刪除文章
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        你確定要刪除文章嗎？
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          不了，我不要刪除
          </Button>
        <Button variant="outline-primary" onClick={() => handleDelete(post.id)} >
          是的，我要刪除
        </Button>
      </Modal.Footer>
    </Modal>

  );
}
/*
class EditingWindow extends React.Component {
  constructor(props) {
    const backgroundHieght = document.body.scrollHeight;
    const windowHeight = document.body.clientWidth;
    // constructor 取代 componentWillMount
    super(props);
    this.state = {
      height: backgroundHieght > windowHeight ? backgroundHieght : windowHeight,
    };
  }

  componentWillMount() {
    /*const backgroundHieght = document.body.clientHeight;
    console.log(backgroundHieght);
    this.setState({ height: backgroundHieght });
    // console.log('willMount');*
  }

  componentWillUnmount() {
    /** 考慮在這裡送出更新資料的指令，
     * 但需要確認是是不是回傳 true 才繼續，
     * 如果 flase 就可以停止摧毀
     * 或是另外找尋方式，
     * 又或是直接使用 redux 的 action 的方式發送？
     * 總之就是需要看看有沒有辦法確認成功與否
     * 但仔細想想，這次的 api 沒這功能 */
/*  console.log('WillUnmonut'); *
}

render() {
 const { height } = this.state;
 const { handleEditing, handlePublish, isEditing } = this.props;
 const isHereEditing = handleEditing !== undefined; // 判斷當前視窗是否是編輯
 const style = {
   height: height + 100,
 };

 return (
   <>
     <div id="cover" style={style}>
     </div>
     <div className="editing">
       <div className="editing__tips">
         {isHereEditing ? "你正在編輯文章" : "你這在新增文章"}
       </div>
       <div className="editing__title">
         標題視窗
         </div>
       <div className="editing__author">
         作者
         </div>

       <div className="editing__content">
         {`輸入內容
         js彈窗 js彈出DIV,並使整個頁面背景變暗`}
       </div>
       <button className="editing__btn"
         onClick={isHereEditing ? handleEditing : handlePublish}>
         {isHereEditing ? "關閉編輯" : "關閉新增文章"}
       </button>
       <Modal.Dialog isEditing={isEditing} onHide={isHereEditing}>
         <Modal.Header
           closeButton
           onClick={isHereEditing ? handleEditing : handlePublish}
         >
           <Modal.Title>Modal title</Modal.Title>
         </Modal.Header>

         <Modal.Body>
           <p>Modal body text goes here.</p>
         </Modal.Body>

         <Modal.Footer>
           <Button
             variant="secondary"
             onClick={isHereEditing ? handleEditing : handlePublish}
           >
             Close
           </Button>
           <Button variant="primary">Save changes</Button>
         </Modal.Footer>
       </Modal.Dialog>
     </div>
   </>
 );
}
}
**/

export { EditingWindow, DeleteWindow };