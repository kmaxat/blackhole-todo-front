<template>
    <div style="padding-bottom:10px; padding-top:10px">
        <b>Description:</b>
        {{ task.description }}<br>
        <b>Priority:</b>
        {{ task.priority }} <br>
        <b>Due at:</b>
        {{ task.due_at }} <br>
        <label class="checkbox">
            <input type="checkbox" @click="completeTask">
        </label>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
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
        ...mapActions([
            'complete'
        ]),
        completeTask() {
            axios.put('/api/tasks/' + this.task.id, {
                params: {
                    completed: true
                }
            }).then(response => {
                this.complete(this.task);
                console.warn(response)
            }).catch(error => {
                console.warn(error)
            })
        }
    }
}
</script>

