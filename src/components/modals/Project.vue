<template>
    <div class="box">
        <h2 class="title">{{ title }}</h2>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Name" v-model="form.name">
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('name')">{{ form.errors.get('name') }}</p>
                </div>
                <div class="field">
                    <label class="label">Color</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="form.color_id">
                                <option v-for="color in colors" :key="color.id" :value="color.id">
                                    {{ color.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <p class="help is-danger" v-if="form.errors.has('color_id')">{{ form.errors.get('color_id') }}</p>
                </div>
                <div class="control" v-if="!data.project">
                    <button class="button is-success" @click="submit">
                        Add project
                    </button>
                </div>
                <div class="field is-grouped" v-if="data.project">
                    <p class="control">
                        <a class="button is-success" @click="update">
                            Save changes
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-warning" @click="archive">
                            Archive
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-danger" @click="remove">
                            Delete
                        </a>
                    </p>

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
                name: '',
                color_id: '',
            })
        }
    },
    props: ['data'],
    created() {
        if (this.data.project) {
            this.title = 'Edit project'
            this.form.name = this.data.project.name
            this.form.color_id = this.data.project.color_id
        } else {
            this.title = 'Quickly add project'
        }
    },
    computed: {
        ...mapGetters([
            'projects', 'colors'
        ])
    },
    methods: {
        ...mapActions([
            'getProjects', 'addProject', 'updateProject', 'deleteProject'
        ]),
        //TODO: Close modal after Promise.all finishes
        submit() {
            this.form.post('/api/projects')
                .then(response => {
                    alert('Project has been added')
                    this.addProject(response)
                    this.EventBus.$emit('close-modal');
                })
                .catch(error => {
                    console.error(error)
                })
        },
        archive() {
            //TODO: Sometimes I have to add data, and sometimes I don't have. 
            //Fix inconsistency with response.data
            axios.put('/api/projects/' + this.data.project.id, {
                status: 'archived'
            }).then(response => {
                this.deleteProject(this.data.project)
                this.EventBus.$emit('close-modal');
            }).catch(error => {
                console.error(error)
            })
        },
        update() {
            this.form.put('/api/projects/' + this.data.project.id)
                .then(response => {
                    alert('Project has been updated')
                    this.updateProject(response)
                    this.EventBus.$emit('close-modal');
                })
                .catch(error => {
                    console.error(error)
                })
        },
        remove() {
            axios.delete('api/projects/' + this.data.project.id)
                .then(response => {
                    this.deleteProject(this.data.project)
                    this.EventBus.$emit('close-modal');
                }).catch(error => {
                    console.error(error)
                })
        }
    }
}
</script>
