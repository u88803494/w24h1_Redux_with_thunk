import React from 'react';
import './editingWindow.css';
import { Button, Modal } from 'react-bootstrap';

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
    this.setState({ height: backgroundHieght });*/
    // console.log('willMount');
  }

  componentWillUnmount() {
    /** 考慮在這裡送出更新資料的指令，
     * 但需要確認是是不是回傳 true 才繼續，
     * 如果 flase 就可以停止摧毀
     * 或是另外找尋方式，
     * 又或是直接使用 redux 的 action 的方式發送？
     * 總之就是需要看看有沒有辦法確認成功與否
     * 但仔細想想，這次的 api 沒這功能 */
   /*  console.log('WillUnmonut'); */
  }

  render() {
    const { height } = this.state;
    const { handleEditing, handlePublish } = this.props;
    const isEditing = handleEditing !== undefined; // 判斷當前視窗是否是編輯
    const style = {
      height: height + 100,
    };

    return (
      <>
        <div id="cover" style={style}>
        </div>
        <div className="editing">
          <div className="editing__tips">
            {isEditing ? "你正在編輯文章" : "你這在新增文章"}
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
            onClick={isEditing ? handleEditing : handlePublish}>
            {isEditing ? "關閉編輯" : "關閉新增文章"}
          </button>
          <Modal.Dialog>
            <Modal.Header
              closeButton
              onClick={isEditing ? handleEditing : handlePublish}
            >
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={isEditing ? handleEditing : handlePublish}
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

export default EditingWindow;
