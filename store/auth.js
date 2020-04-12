export const state = () => ({
  isLoggedIn: false,
  token: "",
  user: {}
});

export const mutations = {
  SET_AUTHENTICATE(state, payload) {
    state.isLoggedIn = true;
    state.token = payload.token;
    state.user = payload.user;
  },
  SET_USER(state, { payload }) {
    state.user = payload;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
    state.user = {};
  }
};
