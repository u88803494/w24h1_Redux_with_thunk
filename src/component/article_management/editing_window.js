import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditingWindow = ({
  show, method, onHide, error, defaultState, createPost, updatePost
}) => {
  const [thisPost, setThisPost] = useState(defaultState.post);
  const [isEmpty, setEmpty] = useState(defaultState.empty); // 為了一開始不偵測
  const [submitType, setSubmitType] = useState(defaultState.submitType); // 一開始先不偵測

  const changePost = (e) => {
    if (!e.target.value) { // 輸入時確認是否為空
      setEmpty({ ...isEmpty, [e.target.name]: true });
    } else {
      setEmpty({ ...isEmpty, [e.target.name]: false });
    }
    setThisPost({ ...thisPost, [e.target.name]: e.target.value });
  };
  // 改成 delete 的偵測形式，來改變按鈕好了。
  const handleSubmit = () => {
    if (!thisPost.title || !thisPost.author || !thisPost.body) {
      setSubmitType({ canSubmit: false, status: '資料不全，無法送出，繼續完成資料才可送出' , button: '無法送出'});
      return;
    }
    // 這邊變成改狀態，另外建立一個 useEffect 監聽該變數，可以試試看能不能用解構，或是傳 obj 的子變數
    method === 'create' ? createPost(thisPost) : updatePost(thisPost);
  }; // 可加上 google CAPTCHA 驗證

  useEffect(() => {
    if (thisPost.title && thisPost.author && thisPost.body) {
      setSubmitType({ canSubmit: true, status: '' });
    } // render 後檢測值是否為空
  }, [thisPost]);

  useEffect(() => { // 有錯誤的值就顯示出來
    error && setSubmitType({ canSubmit: false, status: `發生問題無法送出 ${error}` });
  }, [error]); // 之後試試看把 status 的中文拉出來用變數儲存看看

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {method === 'editing' ? '你正在編輯文章' : '你正在新增文章'}
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
              <Form.Label>
                內文
              </Form.Label>
              <Form.Text className="form__empty">
                {isEmpty.body && '內容不能為空'}
              </Form.Text>
            </div>
            <Form.Control
              name="body"
              as="textarea"
              rows="5"
              placeholder="輸入內文 支援 markdown 格式"
              value={thisPost && thisPost.body}
              onChange={changePost}
            />
          </Form.Group>
          <div className="form__datatype">
            <Form.Text className="form__notice">
              {'支援 markdown 格式'}
            </Form.Text>
            <Form.Text className="form__empty form__empty--submit">
              {submitType.status}
            </Form.Text>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onHide}
            children={'Close'} // 改成這樣省行數
          />
          <Button
            variant="outline-primary"
            onClick={handleSubmit}
            disabled={!submitType.canSubmit}
            children={submitType.button}
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditingWindow;
