<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link :to="{ path: 'home' }">
        <a class="navbar-item">
          Blackhole
        </a>
      </router-link>

      <div class="navbar-burger burger" data-target="navMenubd-example">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenubd-example" class="navbar-menu">
      <div class="navbar-start">
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <a class="navbar-item" @click="openModal">
            Add task
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>

export default {
  name: 'navbar',
  data() {
    return {

    }
  },
  methods: {
    openModal() {
      this.EventBus.$emit('open-modal');
      this.EventBus.$emit('set-modal-data', {}, 'Task');
    }
  }
}
</script>
<style>

</style>
