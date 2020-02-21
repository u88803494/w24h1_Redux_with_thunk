import { UPDATE_NAV_TEXT, UPDATE_TEST } from './actionTypes';

const state = {
  navText: 'home',
}

// [].reduce()
function reducer(globalState = state, action) {
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

export default reducer;
