import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as webAPI from '../WebAPI';

const EditingWindow = ({ onHide, show, post, status, handleChangePosts }) => {
  const newPost = { title: '', author: '', body: '', }
  const [thisPost, setThisPost] = useState(post ? post : newPost)

  const changePost = (e) => {
    setThisPost({
      ...thisPost,
      [e.target.name]: e.target.value,
    })
    /** 後續可以實作偵測空值，也就是說當空值得時候，
     * 送出按鈕不能使用，或是跳出紅色警告字 */
  }

  const handlePost = () => {
    (status === 'create' ?
      webAPI.createPost(thisPost) : webAPI.updatePost(thisPost)) // 多個括號共用 .then
      .then(res => res.status <= 300 && onHide())
      .catch(err => console.log(err)) // .then .catch 是否會自己判斷 status?

    handleChangePosts(status, thisPost); // 改變畫面上的資料
    /** 可以在優化確認到伺服器上的資料之後，才改變畫面上的資料，但這似乎必做才對XD */
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
    webAPI.deletePost(postId) // 改變伺服器
      .then(res => res.state < 300 && console.log('成功'))
      .catch(res => res.state !== 200 && console.log('失敗'))
    handleChangePosts(status, post) // 改變父狀態
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

export { EditingWindow, DeleteWindow };