import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const DeleteWindow = ({
  onHide, show, postId, shouldGetPosts, error, deletePost
}) => {
  const [loadingState, setLoadingState] = useState('是的，我要刪除');

  const handleDelete = () => setLoadingState('刪除中........');

  useEffect(() => {
    loadingState === '刪除中........' && deletePost(postId)
  }, [loadingState])

  useEffect(() => {
    shouldGetPosts && setLoadingState('刪除成功！')
  }, [shouldGetPosts])

  useEffect(() => { // 有錯誤的值就顯示出來
    if (error) {
      setLoadingState(`刪除失敗！`)
      setTimeout(() => { setLoadingState('是的，我要刪除') }, 1000);
    };
  }, [error]);

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered {...{ onHide, show }}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          警告！你正在刪除文章
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        你確定要刪除文章嗎？
        <Form.Text className="form__error">
          {error && `刪除失敗：${error}`}
        </Form.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          不了，我不要刪除
        </Button>
        <Button variant="outline-danger" onClick={handleDelete} disabled={loadingState !== '是的，我要刪除'}>
          {loadingState}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteWindow;
