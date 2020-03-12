import * as actionTypes from './actionTypes';

const postsState = {
  postsListData: [],
  isLoadingGetPosts: false, // 是否取讀資料中
  isProcessing: null,
};

const windowState = {
  method: '', // 研究一下是否改為一個動作一個 action 之後就不需要 method
  show: false, // 是否顯現的值
  postId: null,
};

const postsReducer = (globalState = postsState, action) => {
  const handleChangePosts = ({ method, thisPost, postId }) => {
    /** 第一個變數是方式，第二個之後是變更的資料 */
    const { postsListData } = globalState;
    switch (method) {
      case 'create': {
        const id = postsListData.length !== 0 ? postsListData[0].id + 1 : 1;
        return {
          postsListData: [{
            ...thisPost,
            createdAt: new Date().getTime(), // 取得當前的 timestamp，有很大的機會跟伺服器上的不同
            id, // 取得資料已經逆排序，所以取 index 0 的就是最後 id
          },
          ...postsListData, // 放後面才能符合逆排序
          ],
        };
      }
      case 'editing':
        return {
          postsListData: postsListData.map((post) => {
            if (post.id !== thisPost.id) return post;
            return {
              ...post,
              ...thisPost,
            };
          }),
        };
      case 'delete':
        return {
          postsListData: postsListData.filter(post => post.id !== postId),
        };
      default:
        return null;
    }
    /** 把 call API 一種改成一個 action，然後也不必自己改資料，因為每次都是取得最新 */
  };

  switch (action.type) {
    case `${actionTypes.GET_POSTS}_PENDING`:
      return {
        ...globalState,
        isLoadingGetPosts: true,
      };
    case `${actionTypes.GET_POSTS}_FULFILLED`:
      return {
        ...globalState,
        isLoadingGetPosts: false,
        postsListData: action.payload.data // 篩選資料
          .filter(({ title, author, body }) => title && author && body),
      };
    case actionTypes.UPDATE_POSTS_LIST:
      return {
        postsListData: action.posts,
      };
    case actionTypes.CHANGE_POSTS: // 待刪除
      return handleChangePosts(action.post);
    case `${actionTypes.CREATE_POST}_PENDING`:
      console.log('創造_PENDING')
      return null;
    case `${actionTypes.CREATE_POST}_FULFILLED`:
      console.log('創造_FULFILLED')
      return null;

    case actionTypes.DELETE_POST:
      console.log('刪除', globalState, action)
      return {
        ...globalState,
        // postsListData: globalState.postsListData.filter(post => post.id !== postId),
      };
    case `${actionTypes.DELETE_POST}_PENDING`:
      console.log('刪除_PENDING', globalState, action)
      return {
        ...globalState,
        isProcessing: 'delete',
      };
    case `${actionTypes.DELETE_POST}_FULFILLED`:
      console.log('刪除_FULFILLED', globalState, action)
      return {
        ...globalState,
        isProcessing: null,
        // postsListData: globalState.postsListData.filter(post => post.id !== postId),
      };
    default:
      return globalState;
  }
};
/** 除此之外還要多寫 reject 的反應 
 * 然後是有兩種方式一種是傳送成功之後呼叫改值的 action 
 * 另外一種就是修改了，會比較麻煩一點
*/

const wnidowReducer = (globalState = windowState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ARTICLE_MANAGEMENT_WINDOW:
      return {
        ...action.postState,
        show: true,
      };
    case actionTypes.HIDE_ARTICLE_MANAGEMENT_WINDOW:
      return {
        ...windowState, // 把狀態還原
      };
    default:
      return globalState;
  }
};

export { postsReducer, wnidowReducer };
