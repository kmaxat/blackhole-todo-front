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
        <div class="field is-grouped" style="padding-top:10px">
          <p class="control">
            <a class="button">
              {{ project.name }}
            </a>
          </p>
          <p class="control">
            <a class="button has-icons" @click="editProject(project)">
              <span class="icon">
                <i class="fa fa-edit"></i>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <a class="button is-success" @click="addProject">
          Add project
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
    this.getProjects()
    this.fetchColors()
  },
  computed: {
    ...mapGetters([
      'tasks', 'projects'
    ])
  },
  methods: {
    ...mapActions([
      'getTasks', 'getProjects', 'fetchColors'
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
