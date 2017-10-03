<template>
    <div style="padding-bottom:10px; padding-top:10px">
        <b>Description:</b>
        {{ task.description }}<br>
        <b>Priority:</b>
        {{ task.priority }} <br>
        <b>Due at:</b>
        {{ task.due_at }}
        <div class="field is-grouped" style="padding-top:10px">
            <p class="control">
                <a class="button is-success" @click="updateStatus('completed')">
                    Complete task
                </a>
            </p>
            <p class="control">
                <a class="button is-info" @click="editTask">
                    Edit Task
                </a>
            </p>
            <p class=" control ">
                <a class="button is-warning" @click="updateStatus('archived')">
                    Archive post
                </a>
            </p>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    props: [
        'task'
    ],
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        //TODO: Proper flux data flow. I don't think i should manually update
        //data 
        ...mapActions([
            'updateTask', 'deleteTask'
        ]),
        updateStatus(status) {
            axios.put('/api/tasks/' + this.task.id, {
                status: status
            }).then(response => {
                this.updateTask(response.data)
                this.deleteTask(response.data)
            }).catch(error => {
                console.warn(error)
            })
        },
        editTask() {
            this.EventBus.$emit('open-modal');
            this.EventBus.$emit('set-modal-data', { task: this.task }, 'Task');
        }
    }
}
</script>

