let initialState = {
  sucessUserInfo: {},
  isUserTrue: false,
  storeInfo: {},
};

const userLogIn = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCESS_USER_LOGIN':
      return { ...state, sucessUserInfo: { ...action.payload.user }, isUserTrue: true, storeInfo: { ...action.payload.store } };

    case 'LOGOUT_USER':
      return { ...state, sucessUserInfo: {}, isUserTrue: false, storeInfo: {} };

    // case 'STORE_INFO':
    //   return { ...state, storeInfo: { ...action.payload.user } };

    // case 'DELETE_STORE':
    //   return { ...state, storeInfo: {}, isUserTrue: false };

    default:
      return { ...state };
  }
};

export default userLogIn;
