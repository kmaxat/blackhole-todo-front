import * as types from '../mutation-types'
import axios from '../../utils/interceptors'

// initial state
const state = {
    projects: [],
}

// mutations
const mutations = {
    [types.SET_PROJECTS](state, projects) {
        state.projects = projects
    },
}

// actions
const actions = {
    async fetchProjects({ commit }) {
        const { data } = await axios.get('api/projects')
        commit(types.SET_PROJECTS, data)
    },
}

// getters
const getters = {
    projects: state => state.projects,
}

export default {
    state,
    mutations,
    actions,
    getters
}
