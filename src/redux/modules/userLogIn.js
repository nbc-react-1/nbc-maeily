let initialState = {
  sucessUserInfo: {},
  isUserTrue: false,
};

const userLogIn = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCESS_USER_LOGIN':
      return { ...state, sucessUserInfo: { ...action.payload.user }, isUserTrue: true };

    case 'LOGOUT_USER':
      return { ...state, sucessUserInfo: {}, isUserTrue: false };

    default:
      return { ...state };
  }
};

export default userLogIn;
