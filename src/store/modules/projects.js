import * as types from '../mutation-types'
import api from '../../api'

// initial state
const state = {
    projects: [],
}

// mutations
const mutations = {
    [types.SET_PROJECTS](state, projects) {
        state.projects = projects
    },
    [types.ADD_PROJECT](state, project) {
        state.projects.push(project)
    },
    [types.UPDATE_PROJECT](state, project) {
        let index = state.projects.findIndex(item => project.id == item.id)
        if (index > -1) {
            for (var k in project)
                state.projects[index][k] = project[k];
        }
    },
    [types.DELETE_PROJECT](state, project) {
        let index = state.projects.findIndex(item => project.id == item.id)
        if (index > -1) {
            state.projects.splice(index, 1)
        }
    },
}

// actions
const actions = {
    async getProjects({ commit }) {
        api.getData('api/projects')
            .then(response => {
                commit(types.SET_PROJECTS, response)
            }).catch(error => {
                console.error(error);
                console.error('Failed to fetch projects');
            })
    },
    addProject({ commit }, project) {
        commit(types.ADD_PROJECT, project)
    },
    updateProject({ commit }, project) {
        commit(types.UPDATE_PROJECT, project)
    },
    deleteProject({ commit }, project) {
        commit(types.DELETE_PROJECT, project)
    }
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
