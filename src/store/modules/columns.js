import * as types from '../mutation-types'

// initial state
const state = {
  columns: [],
  selectedColumns: []
}

// mutations
const mutations = {
  [types.SET_COLUMNS] (state, columns) {
    state.columns = columns
  },
  [types.SET_SELECTED_COLUMNS] (state, columns) {
    state.selectedColumns = columns
  },

  [types.REMOVE_COLUMN] (state, column) {
    const index = state.selectedColumns.indexOf(column)
    state.selectedColumns.splice(index, 1)
  },

  [types.ADD_COLUMN] (state, column) {
    const index = state.selectedColumns.findIndex(item => item.name === column.name)
    if (index === -1) {
      state.selectedColumns.push(column)
    }
  }
}

// actions
const actions = {
  setColumns ({ commit }, columns) {
    commit(types.SET_COLUMNS, columns)
  },
  setSelectedColumns ({ commit }, columns) {
    commit(types.SET_SELECTED_COLUMNS, columns)
  },
  addColumn ({ commit }, column) {
    commit(types.ADD_COLUMN, column)
  },
  removeColumn ({ commit }, column) {
    commit(types.REMOVE_COLUMN, column)
  }
}

// getters
const getters = {
  columns: state => state.columns,
  selectedColumns: state => state.selectedColumns
}

export default {
  state,
  mutations,
  actions,
  getters
}
