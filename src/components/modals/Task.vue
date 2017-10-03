<template>
    <div class="box">
        <h2 class="title">Quick add task</h2>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Description</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Description" v-model="form.description">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('description')">{{ form.errors.get('description') }}</p>
                </div>
                <div class="field">
                    <label class="label">Priority</label>
                    <div class="control">
                        <input class="input" type="number" min="1" max="4" placeholder="Priority" v-model="form.priority">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('priority')">{{ form.errors.get('priority') }}</p>
                </div>
                <div class="field">
                    <label class="label">Due at</label>
                    <div class="control">
                        <input class="input" type="date" min="1" max="4" placeholder="Due at" v-model="form.due_at">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('due_at')">{{ form.errors.get('due_at') }}</p>
                </div>
                <div class="field">
                    <label class="label">Project</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="form.project_id">
                                <option v-for="project in projects" :key="project.id" :value="project.id">
                                    {{ project.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('project_id')">{{ form.errors.get('project_id') }}</p>
                </div>
                <div class="control">
                    <button class="button is-primary" @click="submitTask">Add task</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: new Form({
                description: '',
                priority: '',
                due_at: '',
                project_id: ''
            })
        }
    },
    computed: {
        ...mapGetters([
            'projects'
        ])
    },
    methods: {
        //TODO: Close modal after Promise.all finishes
        submitTask() {
            this.form.post('/api/tasks')
                .then(response => {
                    alert('Task has been added')
                    this.EventBus.$emit('close-modal');
                })
                .catch(error => {
                    console.error(error)
                    this.EventBus.$emit('close-modal');
                })
        }
    }
}
</script>
