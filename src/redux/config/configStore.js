import { createStore } from 'redux';
import { combineReducers } from 'redux';

// store를 만들어 내기
// 중앙데이터관리소
const rootReducer = combineReducers({});

const store = createStore(rootReducer);

export default store;
