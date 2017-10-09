<template>
    <div>
        <div class="columns" v-for="label in labels" :key="label.id">
            <div class="column">
                <div class="field is-grouped" style="padding-top:10px">
                    <p class="control">
                        <a class="button">
                            {{ label.name }}
                        </a>
                    </p>
                    <p class="control">
                        <a class="button has-icons" @click="editLabel(label)">
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
                <a class="button is-success" @click="addLabel">
                    Add label
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'labels',
    data() {
        return {
        }
    },
    created() {
        this.getLabels()
    },
    computed: {
        ...mapGetters([
            'labels'
        ])
    },
    methods: {
        ...mapActions([
            'getLabels', 'fetchColors'
        ]),
        addLabel() {
            this.EventBus.$emit('open-modal');
            this.EventBus.$emit('set-modal-data', {}, 'CustomLabel');
        },
        editLabel(label) {
            this.EventBus.$emit('open-modal');
            this.EventBus.$emit('set-modal-data', { label: label }, 'CustomLabel');
        }
    },
}

</script>
