import * as types from '../mutation-types'
import axios from '../../utils/interceptors'

// initial state
const state = {
    colors: [],
}

// mutations
const mutations = {
    [types.SET_COLORS](state, colors) {
        state.colors = colors
    },
}

// actions
const actions = {
    async fetchColors({ commit }) {
        const { data } = await axios.get('api/colors')
        commit(types.SET_COLORS, data)
    },
}

// getters
const getters = {
    colors: state => state.colors,
}

export default {
    state,
    mutations,
    actions,
    getters
}
