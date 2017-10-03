<template>
  <div style="background-color: whitesmoke;">
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-fullwidth" @click="fetchTasks">
          Inbox
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-fullwidth" @click="fetchTasks('today')">
          Today
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-fullwidth" @click="fetchTasks('week')">
          Next 7 days
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="tabs is-small">
          <ul>
            <li class="is-active">
              <a>Projects</a>
            </li>
            <li>
              <a>Labels</a>
            </li>
            <li>
              <a>Filters</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="columns" v-for="project in projects" :key="project.id">
      <div class="column">
        <a class="button">
          {{ project.name }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sidebar',
  data() {
    return {

    }
  },
  created() {
    this.fetchProjects()
  },
  computed: {
    ...mapGetters([
      'tasks', 'projects'
    ])
  },
  methods: {
    ...mapActions([
      'fetchTasks', 'fetchProjects'
    ])

  },
}
</script>
