<template>
    <div>
        <div class="field">
            <label class="label">{{ name }}</label>
            <div class="control">
                <div class="select">
                    <select @input="selectValues">
                        <option>Select value</option>
                        <option v-for="item in values" :key="item.id" :value="item.id">
                            {{ item[label] }}
                        </option>
                    </select>
                </div>
            </div>
            <p class="help is-danger" v-if="error">{{ error }}</p>
        </div>
        <div class="columns" style="padding-bottom:20px">
            <div class="column">
                <div class="field is-grouped is-grouped-multiline">
                    <div class="control" v-for="item in selected" :key="item.id">
                        <div class=" tags has-addons ">
                            <span class="tag is-info ">{{ item[label] }}</span>
                            <a class="tag is-delete " @click="removeItem(item)"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'custom-select',
    data() {
        return {
            selected: [],
        }
    },
    created(){
        this.selected = this.selectedValues.slice()
    },
    props: {
        values: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        selectedValues: {
            type: Array,
            required: true
        },
        error: {
            type: String
        },
        name: {
            type: String,
            required: true
        }

    },
    methods: {
        selectValues(event) {
            var item = this.values[event.target.selectedIndex-1]
            let index = this.selected.findIndex(toDeleteItem => toDeleteItem.id == item.id)
            if (index == -1)
                this.selected.push(item)
            this.$emit('selected', this.selected);
        },
        removeItem(item) {
            let index = this.selected.findIndex(toDeleteItem => toDeleteItem.id == item.id)
            if (index > -1) {
                this.selected.splice(index, 1)
            }
            this.$emit('selected', this.selected);
        }
    }
}
</script>