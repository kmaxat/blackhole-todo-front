<template>
    <div class="modal" :class="{ 'is-active' : active }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <component :is="component" :data="data"></component>
        </div>
        <button class="modal-close is-large" @click="close"></button>
    </div>
</template>
<script>
import Task from './modals/Task.vue'
import Project from './modals/Project.vue'
//CustomLabel to suppress Vue warning about using HTML tags
import CustomLabel from './modals/Label.vue'

export default {
    name: 'modal',
    data() {
        return {
            active: false,
            data: {},
            component: ''
        }
    },
    components: {
        Task, Project, CustomLabel
    },
    destroyed() {
        this.EventBus.$off('set-modal-data', this.set);
        this.EventBus.$off('open-modal', this.open);
        this.EventBus.$off('close-modal', this.close);
    },
    methods: {
        close() {
            this.active = false;
            this.data = null;
            this.component = null
        },

        open() {
            this.active = true;
        },

        set(data, component) {
            this.data = data;
            this.component = component
        }
    },

    mounted() {
        this.$nextTick(function() {
            this.EventBus.$on('set-modal-data', this.set);
            this.EventBus.$on('open-modal', this.open);
            this.EventBus.$on('close-modal', this.close);
        }.bind(this));
    }
}
</script>
