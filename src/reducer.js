import { UPDATE_NAV_TEXT, UPDATE_TEST, UPDATE_POSTS_LIST } from './actionTypes';

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
  switch (action.type) {
    case UPDATE_POSTS_LIST:
      return {
        postsListData: action.posts,
      }
    default:
      return globalState;
  }
}

/* export default navReducer; */
export { navReducer, postsReducer }
