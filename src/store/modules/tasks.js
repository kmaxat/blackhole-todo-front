import * as types from '../mutation-types'
import axios from '../../utils/interceptors'

// initial state
const state = {
    tasks: [],
}

// mutations
const mutations = {
    [types.SET_TASKS](state, tasks) {
        state.tasks = tasks
    },
    [types.DELETE_TASK](state, index) {
        if (index >= 0) {
            state.tasks.splice(index, 1);
        }
    },
}

// actions
const actions = {
    async fetchTasks({ commit }, range = null) {
        const { data } = await axios.get('api/tasks', {
            params: {
                range: range
            }
        })
        commit(types.SET_TASKS, data)
    },
    complete({ commit }, task) {
        var index = state.tasks.indexOf(task);
        commit(types.DELETE_TASK, index)
    }
}

// getters
const getters = {
    tasks: state => state.tasks,
}

export default {
    state,
    mutations,
    actions,
    getters
}
