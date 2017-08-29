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
                  <span>Login with Facebook</span>
                </a>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <a class="button is-fullwidth is-primary google" @click="getUrl('google')">
                             <span class="icon">
                              <i class="fa fa-google-plus"></i>
                            </span>
                  <span>Login with Google</span>
                </a>
              </div>
            </div>
            <hr>
          </div>
        </div>

        <div class="columns">
            <div class="column is-4 is-offset-4">
                <form method="POST" @submit.prevent="login">
                    <div class="field">
                        <p class="control">
                            <input class="input" type="email"
                                   placeholder="Email"
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
                                Login
                            </button>
                        </p>
                    </div>
                </form>
            </div>

        </div>
        <div class="columns">
            <div class="column has-text-centered">
                <h5>Not registered?
                    <router-link :to="{ name: 'auth.register' }">Sign Up
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
        name: 'login',
        layout: 'default',
        data() {
            return {
                title: 'Login',
                isLoading: false,
                form: new Form({
                    email: '',
                    password: '',
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
            login() {
                this.isLoading = true;
                this.form.post('/api/login')
                    .then(response => {
                        this.isLoading = false;
                        this.$store.dispatch('saveToken', {
                            token: response.token,
                        })
                        this.$store.dispatch('fetchUser').then(() => {
                            this.$router.push({name: 'home'})
                        })
                    })
                    .catch(error => {
                        this.isLoading = false;
                        console.error(error);
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
        },
    }
</script>
<style>
    #auth {
        padding-top: 50px;
    }
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
