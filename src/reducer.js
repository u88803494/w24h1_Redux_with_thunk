import { UPDATE_NAV_TEXT, UPDATE_TEST, UPDATE_POSTS_LIST, CHANGE_POSTS } from './actionTypes';

const navState = {
  navText: 1,
}

const postsState = {
  postsListData: []
}

function navReducer(globalState = navState, action) {
  switch (action.type) {
    case UPDATE_NAV_TEXT:
      return {
        ...globalState,
        navText: action.value,
      };
    case UPDATE_TEST:
      return {
        ...globalState,
        test: action.value,
      };
    default:
      return globalState;
  }
}

const postsReducer = (globalState = postsState, action) => {
  const handleChangePosts = ({ status, thisPost, postId }) => {
    /** 第一個變數是方式，第二個變更的資料 */
    const { postsListData } = globalState;
    switch (status) {
      case 'create':
        const id = postsListData.length !== 0 ? postsListData[0].id + 1 : 1;
        return {
          postsListData: [{
            ...thisPost,
            createdAt: new Date().getTime(), // 取得當前的 timestamp，雖然應該會跟伺服器上的不同
            id, // 取得資料已經逆排序，所以取 index 0 的就是最後 id
          },
          ...postsListData,  // 放後面才能符合逆排序
          ],
        }
      case 'editing':
        return {
          postsListData: postsListData.map((post) => {
            if (post.id !== thisPost.id) return post;
            return {
              ...post,
              ...thisPost,
            };
          })
        };
      case 'delete':
        return {
          postsListData: postsListData.filter(post => post.id !== postId)
        }
      default:
        console.log('一定是搞錯了什麼');
    }
  }

  switch (action.type) {
    case UPDATE_POSTS_LIST:
      return {
        postsListData: action.posts,
      }
    case CHANGE_POSTS:
      return handleChangePosts(action.post)
    default:
      return globalState;
  }
}

/* export default navReducer; */
export { navReducer, postsReducer };
