import React from 'react';
import './editingWindow.css'

class EditingWindow extends React.Component {
  constructor(props) {
    const backgroundHieght = document.body.clientHeight;
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
    console.log('willMount');
  }

  componentWillUnmount() {
    /** 考慮在這裡送出更新資料的指令，
     * 但需要確認是是不是回傳 true 才繼續，
     * 如果 flase 就可以停止摧毀
     * 或是另外找尋方式，
     * 又或是直接使用 redux 的 action 的方式發送？
     * 總之就是需要看看有沒有辦法確認成功與否
     * 但仔細想想，這次的 api 沒這功能 */
    console.log('WillUnmonut');
  }

  render() {
    const { height } = this.state;
    const style = {
      height: height + 100
    };
    const { bgOut } = this.props;
    
    return (
      <>
        <div id="cover" style={style}>
        </div>

        <div id="showdiv">

          <div id="tips">
            提示
          </div>

          <div id="content">
            js彈窗 js彈出DIV,並使整個頁面背景變暗</div>

          <button id="btn" onClick={bgOut}>
            確 定
          </button>
        </div>
      </>);
  }
}

export default EditingWindow;