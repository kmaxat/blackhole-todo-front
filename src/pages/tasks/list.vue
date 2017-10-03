<template>
    <div class="columns">
        <div class="column">
            <item v-for="task in tasks" :task="task" :key="task.id">
            </item>
        </div>
    </div>
</template>
<script>
import item from './item.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    components: {
        item
    },
    computed: {
        ...mapGetters([
            'tasks',
        ])
    },
    methods: {
        ...mapActions([
            'fetchTasks'
        ])

    },
    created() {
        this.fetchTasks();
    }
}
</script>

