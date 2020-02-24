import React, { useState, useEffect } from 'react';
import * as webAPI from '../../WebAPI';
import { Button, Modal, Form } from 'react-bootstrap';
import './editing_window.css';

const EditingWindow = ({ onHide, show, post, status, handleChangePosts }) => {
  const newPost = { title: '', author: '', body: '', };
  const defaultEmpty = { title: false, author: false, body: false, };
  const defaultSubmitType = { canSubmit: true, status: '', };

  const [thisPost, setThisPost] = useState(post ? post : newPost);
  const [isEmpty, setEmpty] = useState(defaultEmpty); // 為了一開始不偵測
  const [submitType, setSubmitType] = useState(defaultSubmitType);
  // 一開始先不偵測，因為本身載入的都是有內容的。

  const changePost = (e) => {
    if (!e.target.value) { // 輸入時確認是否為空
      setEmpty({ ...isEmpty, [e.target.name]: true, })
    } else {
      setEmpty({ ...isEmpty, [e.target.name]: false, })
    }

    setThisPost({ ...thisPost, [e.target.name]: e.target.value, })
  }

  const handleSubmit = () => {
    if (!thisPost.title || !thisPost.author || !thisPost.body) {
      setSubmitType({ canSubmit: false, status: '資料不全，無法送出，繼續完成資料才可送出', });
      return;
    }

    const whichAPI = (thisPost, status) => status === 'create' ?
      webAPI.createPost(thisPost) : webAPI.updatePost(thisPost)

    const submitPost = (status, thisPost) => { // 像這個想詢問一下，可以往上獲取資料，我還需要特別傳入嗎？
      handleChangePosts(status, thisPost); // 改變畫面上的資料
      onHide(); /** 進一步可優化顯示傳送中，成功後顯示成功 */
    }

    const onError = (err) => {
      setSubmitType({ canSubmit: false, status: `發生問題無法送出 ${err}`, });
    }

    whichAPI(thisPost, status)
      .then(res => res.status <= 300 && submitPost(status, thisPost))
      .catch(err => onError(err)) // .then .catch 是否會自己判斷 status?
  }

  useEffect(() => {
    if (thisPost.title && thisPost.author && thisPost.body) {
      setSubmitType({ canSubmit: true, status: '', });
    } // render 檢測值是否為空
  }, [thisPost])

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
          <Form.Group>
            <div className="form__datatype">
              <Form.Label>標題</Form.Label>
              <Form.Text className="form__empty">
                {isEmpty.title && '標題不能為空'}
              </Form.Text>
            </div>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter title"
              value={thisPost && thisPost.title}
              onChange={changePost}
            />
          </Form.Group>
          <Form.Group>
            <div className="form__datatype">
              <Form.Label>作者</Form.Label>
              <Form.Text className="form__empty">
                {isEmpty.author && '作者不能為空'}
              </Form.Text>
            </div>
            <Form.Control
              name="author"
              type="text"
              placeholder="author/作者"
              value={thisPost && thisPost.author}
              onChange={changePost}
            />
          </Form.Group>
          <Form.Group>
            <div className="form__datatype">
              <Form.Label>內文</Form.Label>
              <Form.Text className="form__empty">
                {isEmpty.body && '內容不能為空'}
              </Form.Text>
            </div>
            <Form.Control
              name="body"
              as="textarea"
              rows="5"
              placeholder="輸入內文"
              value={thisPost && thisPost.body}
              onChange={changePost}
            />
          </Form.Group>
          <Form.Text className="form__empty form__empty--submit">
            {submitType.status}
          </Form.Text>
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
            onClick={handleSubmit}
            disabled={!submitType.canSubmit}
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
  const [loadingState, setLoadingState] = useState('是的，我要刪除');

  useEffect(() => {
    const finalExecution = (success) => { // 根據成功與否改變按鈕的內容
      success ? setLoadingState('刪除成功！') : setLoadingState('刪除失敗！')
      setTimeout(() => {
        success ? handleChangePosts(status, post) : setLoadingState('是的，我要刪除')
      }, 1000)
    } /** 放內部就不用使用 useCallback */

    if (loadingState === '刪除中........') {
      webAPI.deletePost(post.id) // 改變伺服器
        .then(res => res.status < 300 && finalExecution(true) /* 改變父狀態 */)
        .catch(() => finalExecution(false))
    }
  }, [loadingState, handleChangePosts, post, status]); /* 待研究為什麼需要加入後三者才不報錯 */

  const handleDelete = () => {
    setLoadingState('刪除中........')
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
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          disabled={loadingState !== '是的，我要刪除'}
        >
          {loadingState}
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export { EditingWindow, DeleteWindow };
