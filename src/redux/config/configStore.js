import { createStore } from 'redux';
import { combineReducers } from 'redux';
import userLogIn from '../modules/userLogIn';

// store를 만들어 내기
// 중앙데이터관리소
const rootReducer = combineReducers({
  userLogIn: userLogIn,
});

const store = createStore(rootReducer);

export default store;
