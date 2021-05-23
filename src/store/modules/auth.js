import axios from "axios";

const state = {
    token: localStorage.getItem('access_token') || null,
};

const getters = {
    loggedIn(state) {
        return state.token !== null;
    }
};

const actions = {
    async DestroyToken({commit}){
        if (this.getters.loggedIn) {
            await axios.post('/api/logout');
            await localStorage.removeItem('access_token');
            await commit('destroyToken');
        }
    },
    async LogIn({commit}, user) {
        let response = await axios.post('/api/login', user);
        await localStorage.setItem('access_token', response.data.access_token);
        await commit('setToken', response.data.access_token);
    },
};

const mutations = {
    setToken(state, token) {
        state.token = token;
    },
    destroyToken(state) {
        state.token = null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};