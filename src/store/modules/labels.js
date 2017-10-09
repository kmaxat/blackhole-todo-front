import * as types from '../mutation-types'
import api from '../../api'

// initial state
const state = {
    labels: [],
}

// mutations
const mutations = {
    [types.SET_LABELS](state, labels) {
        state.labels = labels
    },
    [types.ADD_LABEL](state, label) {
        state.labels.push(label)
    },
    [types.UPDATE_LABEL](state, label) {
        let index = state.labels.findIndex(item => label.id == item.id)
        if (index > -1) {
            for (var k in label)
                state.labels[index][k] = label[k];
        }
    },
    [types.DELETE_LABEL](state, label) {
        let index = state.labels.findIndex(item => label.id == item.id)
        if (index > -1) {
            state.labels.splice(index, 1)
        }
    },
}

// actions
const actions = {
    async getLabels({ commit }) {
        api.getData('api/labels')
            .then(response => {
                commit(types.SET_LABELS, response)
            }).catch(error => {
                console.error(error);
                console.error('Failed to fetch labels');
            })
    },
    addLabel({ commit }, label) {
        commit(types.ADD_LABEL, label)
    },
    updateLabel({ commit }, label) {
        commit(types.UPDATE_LABEL, label)
    },
    deleteLabel({ commit }, label) {
        commit(types.DELETE_LABEL, label)
    }
}

// getters
const getters = {
    labels: state => state.labels,
}

export default {
    state,
    mutations,
    actions,
    getters
}
