<template>
  <div style="background-color: whitesmoke;">
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-fullwidth" @click="getTasks">
          Inbox
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-fullwidth" @click="getTasks('today')">
          Today
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-primary is-fullwidth" @click="getTasks('week')">
          Next 7 days
        </a>
      </div>
    </div>
    <tabs :tabs="tabs"></tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Tabs from './Tabs.vue'

export default {
  name: 'sidebar',
  data() {
    return {
      tabs: [
        'Projects', 'Labels', 'Filters'
      ]
    }
  },
  components : {
    Tabs
  },
  created() {
    this.getProjects()
    this.getColors()
    this.getLabels()
  },
  computed: {
    ...mapGetters([
      'tasks', 'projects'
    ])
  },
  methods: {
    ...mapActions([
      'getTasks', 'getProjects', 'getColors', 'getLabels'
    ]),
    addProject() {
      this.EventBus.$emit('open-modal');
      this.EventBus.$emit('set-modal-data', {}, 'Project');
    },
    editProject(project) {
      console.warn(project)
      this.EventBus.$emit('open-modal');
      this.EventBus.$emit('set-modal-data', { project: project }, 'Project');
    }

  },
}
</script>
