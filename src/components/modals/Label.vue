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
                <div class="control" v-if="!data.label">
                    <button class="button is-success" @click="submit">
                        Add label
                    </button>
                </div>
                <div class="field is-grouped" v-if="data.label">
                    <p class="control">
                        <a class="button is-success" @click="update">
                            Save changes
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
        if (this.data.label) {
            this.title = 'Edit label'
            this.form.name = this.data.label.name
            this.form.color_id = this.data.label.color_id
        } else {
            this.title = 'Quickly add label'
        }
    },
    computed: {
        ...mapGetters([
            'labels', 'colors'
        ])
    },
    methods: {
        ...mapActions([
            'getLabels', 'addLabel', 'updateLabel', 'deleteLabel'
        ]),
        //TODO: Close modal after Promise.all finishes
        submit() {
            this.form.post('/api/labels')
                .then(response => {
                    alert('Label has been added')
                    this.addLabel(response)
                    this.EventBus.$emit('close-modal');
                })
                .catch(error => {
                    console.error(error)
                })
        },
        update() {
            this.form.put('/api/labels/' + this.data.label.id)
                .then(response => {
                    alert('Label has been updated')
                    this.updateLabel(response)
                    this.EventBus.$emit('close-modal');
                })
                .catch(error => {
                    console.error(error)
                })
        },
        remove() {
            axios.delete('api/labels/' + this.data.label.id)
                .then(response => {
                    this.deleteLabel(this.data.label)
                    this.EventBus.$emit('close-modal');
                }).catch(error => {
                    console.error(error)
                })
        }
    }
}
</script>
