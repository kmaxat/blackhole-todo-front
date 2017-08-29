<template>
  <div>
      <div class="columns" style="background-color: antiquewhite">
        <div class="column is-6 is-offset-3">
          <navbar></navbar>
        </div>
      </div>
      <div class="columns" style="background-color: whitesmoke">
        <div class="column is-2 is-offset-3">
          <sidebar></sidebar>
        </div>
        <div class="column is-4" style="background-color: white">
          <section class="hero is-fullheight">
            <div class="hero-head">
              <child/>
            </div>
          </section>
        </div>
      </div>
  </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'app-layout',
        computed: mapGetters({
            user: 'authUser',
            authenticated: 'authCheck'
        }),
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push({name: 'auth.login'})
                    })
            },
        }
    }
</script>
