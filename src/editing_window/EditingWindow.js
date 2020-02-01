import React from 'react';
import './editingWindow.css';
import { Button, Modal } from 'react-bootstrap';

const EditingWindow = ({ onHide, show, state, post }) => (
  <Modal
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    {...{ onHide, show }
    /* 不太懂為什麼一定要加 ... 直接寫也會出 bug 只知道等同於下面
      onHide={onHide} show={show}，這樣的寫法是另外變成物件，然後傳給子 component 之後解構嗎
    */}

  >
    {console.log(post)}
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {state === "editing" ? "你正在編輯文章" : "你正在新增文章"/* 可改成 post 判斷?但一多就不行 */}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Centered Modal</h4>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
        </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={onHide}>Close</Button>
      <Button variant="outline-primary" onClick={() => console.log('送出')} > Save changes</Button>
    </Modal.Footer>
  </Modal>
);


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

export default EditingWindow;
