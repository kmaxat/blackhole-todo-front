import * as types from '../mutation-types'
import api from '../../api'
// initial state
const state = {
    tasks: [],
}

// mutations
const mutations = {
    [types.SET_TASKS](state, tasks) {
        state.tasks = tasks
    },
    [types.ADD_TASK](state, task) {
        state.tasks.push(task)
    },
    [types.UPDATE_TASK](state, task) {
        let index = state.tasks.findIndex(item => task.id == item.id)
        if (index > -1) {
            for (var k in task)
                state.tasks[index][k] = task[k];
        }
    },
    [types.DELETE_TASK](state, task) {
        let index = state.tasks.findIndex(item => task.id == item.id)
        if (index > -1) {
            state.tasks.splice(index, 1)
        }
    },

}

// actions
const actions = {
    async getTasks({ commit }, range = null) {
        api.getData('api/tasks', { range: range })
            .then(response => {
                commit(types.SET_TASKS, response)
            }).catch(error => {
                console.error(error);
                console.error('Failed to fetch tasks');
            })
    },
    addTask({ commit }, task) {
        commit(types.ADD_TASK, task)
    },
    updateTask({ commit }, task) {
        commit(types.UPDATE_TASK, task)
    },
    deleteTask({ commit }, task) {
        commit(types.DELETE_TASK, task)
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
