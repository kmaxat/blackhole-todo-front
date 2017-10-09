<template>
    <div>
        <div class="columns">
            <div class="column">
                <div class="tabs is-small">
                    <ul>
                        <li v-for="tab in tabs" :key="tab" :class="{ 'is-active': tab == selectedTab}" @click="selectTab(tab)">
                            <a>{{ tab }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <component :is="component"></component>
    </div>
</template>
<script>
import Projects from './tabs/Projects.vue'
import Labels from './tabs/Labels.vue'

export default {
    data() {
        return {
            selectedTab: '',
            component: ''
        }
    },
    created(){
        this.selectTab('Projects')
    },
    components: {
        Projects, Labels
    },
    props: {
        tabs: {
            type: Array,
            required: true
        }
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab
            this.component = tab
        }
    }

}
</script>