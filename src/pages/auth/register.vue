<template>
    <div id="auth">
        <div class="columns">
            <div class="column">
                <h2 class="title has-text-centered">{{ title }} </h2>
            </div>
        </div>
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <div class="columns">
              <div class="column">
                <a class="button is-fullwidth is-primary facebook" @click="getUrl('facebook')">
                             <span class="icon">
                              <i class="fa fa-facebook-square"></i>
                            </span>
                  <span>Register with Facebook</span>
                </a>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <a class="button is-fullwidth is-primary google" @click="getUrl('google')">
                             <span class="icon">
                              <i class="fa fa-google-plus"></i>
                            </span>
                  <span>Register with Google</span>
                </a>
              </div>
            </div>
            <hr>
          </div>
        </div>
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <form method="POST" @submit.prevent="register">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="text" placeholder="Name"
                             v-model="form.name">
                    </p>
                    <p class="help is-danger"
                       v-if="form.errors.has('name')">{{
                      form.errors.get('name') }}</p>
                  </div>
                <div class="field">
                    <p class="control">
                        <input class="input" type="email" placeholder="Email"
                               v-model="form.email">
                    </p>
                    <p class="help is-danger"
                       v-if="form.errors.has('email')">{{
                        form.errors.get('email') }}</p>
                </div>
                <div class="field">
                    <p class="control">
                        <input class="input" type="password"
                               placeholder="Password"
                               v-model="form.password">
                    </p>
                    <p class="help is-danger"
                       v-if="form.errors.has('password')">{{
                        form.errors.get('password') }}</p>

                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary is-fullwidth" :class="{
                           'is-loading' : isLoading }" type="submit">
                            Submit
                        </button>
                    </p>
                </div>
                </form>
            </div>

        </div>
        <div class="columns">
            <div class="column has-text-centered	">
                <h5>Registered?
                    <router-link :to="{ name: 'auth.login' }">Login
                    </router-link>
                </h5>
                <h5>
                    <router-link :to="{ name: 'password_email' }">
                        Forgot Password?
                    </router-link>
                </h5>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'register',
        layout: 'default',
        data() {
            return {
                title: 'Register',
                isLoading: false,
                form: new Form({
                    email: '',
                    password: '',
                    name : '',
                }),
                url: '',
            };
        },
        created(){
            if(this.$route.query.provider) {
                axios.get('/api/auth/' + this.$route.query.provider + '/callback',
                    { params : { code : this.$route.query.code }})
                    .then((response)=>{
                        this.$store.dispatch('saveToken', {
                            token: response.data.token,
                        })
                        this.$store.dispatch('fetchUser').then(() => {
                            this.$router.push({ name: 'home'})
                        })
                    })
                    .catch((error)=>{
                        console.warn(error)
                    })
            }
        },
        methods: {
            register() {
                this.isLoading = true;
                this.form.post('/api/register')
                    .then(response => {
                        this.isLoading = false
                        this.login()
                    })
                    .catch(error => {
                        this.isLoading = false
                    })
            },
            login() {
                this.form.post('/api/login')
                    .then(response => {
                        this.$store.dispatch('saveToken', {
                            token: response.token,
                        })
                        this.$store.dispatch('fetchUser').then(() => {
                            this.$router.push({name: 'home'})
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            getUrl(provider) {
                axios.get('/api/auth/'+provider)
                    .then((response)=>{
                        this.url = response.data.url
                        window.location.href = this.url
                    }).catch((error) => {
                    console.warn(error)
                })
            }

        }
    }
</script>
<style>
    .facebook {
        background-color: #3b5998 !important;
    }
    .google {
        background-color: #d9534f !important;
    }
    .vk {
        background-color: #4c75a3 !important;
    }
</style>
