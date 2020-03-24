import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const DeleteWindow = ({
  onHide, show, postId, shouldGetPosts, error, deletePost, defaultState, errorDeletePost
}) => {
  const [submitType, setSubmitType] = useState(defaultState.submitType);

  const handleDelete = () => setSubmitType({ canSubmit: false, status: '', button: '刪除中' });
  const handleErrorDelete = () => setSubmitType({ canSubmit: false, status: '', button: '刪除中.' });

  useEffect(() => {
    submitType.button === '刪除中' && deletePost(postId);
    submitType.button === '刪除中.' && errorDeletePost(postId);
  }, [submitType.button, deletePost, postId, errorDeletePost])

  useEffect(() => {
    shouldGetPosts && setSubmitType({ ...submitType, button: '刪除成功' })
  }, [shouldGetPosts, setSubmitType, submitType])

  useEffect(() => { // 有錯誤的值就顯示出來
    if (error) {
      setSubmitType({ canSubmit: false, status: `發生問題無法送出 ${error}`, button: '刪除失敗' })
      setTimeout(() => { setSubmitType(defaultState.submitType) }, 2000);
    };
  }, [error, defaultState.submitType]);

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...{ onHide, show }}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" children={'警告！你正在刪除文章'} />
      </Modal.Header>
      <Modal.Body>
        你確定要刪除文章嗎？
        <Form.Text className="form__error" children={submitType.status} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide} children={'不刪除了'} />
        <Button
          variant="outline-danger"
          onClick={handleDelete}
          disabled={!submitType.canSubmit}
          children={submitType.button}
        />
        <Button
          variant="outline-danger"
          onClick={handleErrorDelete}
          disabled={!submitType.canSubmit}
          children={`${submitType.button === '送出' ? '錯誤' : ""}` + submitType.button}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteWindow;
