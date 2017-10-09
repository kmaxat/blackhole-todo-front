<template>
    <div>
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
    name: 'projects',
    data() {
        return {
        }
    },
    created() {
        this.getProjects()
        this.getColors()
    },
    computed: {
        ...mapGetters([
            'projects'
        ])
    },
    methods: {
        ...mapActions([
            'getProjects', 'getColors'
        ]),
        addProject() {
            this.EventBus.$emit('open-modal');
            this.EventBus.$emit('set-modal-data', {}, 'Project');
        },
        editProject(project) {
            this.EventBus.$emit('open-modal');
            this.EventBus.$emit('set-modal-data', { project: project }, 'Project');
        }
    },
}

</script>
