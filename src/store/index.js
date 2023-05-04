import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    isAuthenticated: false,
    user: null
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    checkAuth({ commit }) {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return axios.post('http://127.0.0.1:8000/api/me',)
      .then((response) => {
        if (response.data.status == "success") {
          commit('setAuthenticated', true);
          commit('setUser', response.data.user);
        }else{
          alert(response.data.status);
          commit('setAuthenticated', false);
          commit('setUser', null);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.message)
        commit('setAuthenticated', false);
        localStorage.removeItem('Token');
      });
    },
    logout({ commit }) {
      localStorage.removeItem('Token');
      commit('setAuthenticated', false);
      commit('setUser', null);
    }
  },
  modules: {
  }
})
