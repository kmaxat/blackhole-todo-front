<template>
    <div id="auth">
        <div class="columns">
            <div class="column">
                <h2 class="title has-text-centered">{{ title }} </h2>
            </div>
        </div>
        <div class="columns">
            <div class="column is-6 is-offset-3">
                <div class="notification is-success" v-if="isSuccess">
                    <button class="delete" @click="isSuccess = false"></button>
                    Password has changed. Please login
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <form method="POST" @submit.prevent="reset">
                    <div class="field">
                        <label class="label">Email </label>
                        <p class="control has-icons-left">
                            <input class="input" type="email" placeholder="Email"
                                   v-model="form.email">
                            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
                        </p>
                        <p class="help is-danger"
                           v-if="form.errors.has('email')">{{
                            form.errors.get('email') }}</p>

                    </div>

                    <div class="field">
                        <label class="label">Password (min 6 characters)</label>
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
                        <label class="label">Password (confirmation)</label>
                        <p class="control">
                            <input class="input" type="password"
                                   placeholder="Password (confirmation)"
                                   v-model="form.password_confirmation">
                        </p>
                        <p class="help is-danger"
                           v-if="form.errors.has('password')">{{
                            form.errors.get('password_confirmation') }}</p>
                    </div>

                    <div class="field ">
                        <p class="control">
                            <button class="button is-primary" :class="{
                           'is-loading' : isLoading }" type="submit">
                                Reset password
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <div class="columns">
            <div class="column has-text-centered	">
                <h5>
                    <router-link :to="{ name: 'auth.login' }">Login
                    </router-link>
                </h5>
                <h5>Not registered?
                    <router-link :to="{ name: 'auth.register' }">Sign Up
                    </router-link>
                </h5>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'password_reset',
        layout: 'default',
        metaInfo: {title: 'Reset password'},
        data() {
            return {
                title: 'Reset password',
                isLoading: false,
                isSuccess : false,
                form: new Form({
                    email: '',
                    password: '',
                    token : '',
                    password_confirmation : '',
                }),
            };
        },
        methods: {
            reset() {
                this.isLoading = true
                this.isSuccess = false
                this.form.token = this.$route.params.token
                this.form.post('/api/password/reset')
                    .then(response => {
                        console.log(response)
                        this.isLoading = false
                        this.isSuccess = true
                        this.form.reset()
                    })
                    .catch(error => {
                        console.warn(error)
                        this.isLoading = false
                        this.isSuccess = false
                    })
            },
        }
    }
</script>
<style>
    #auth {
        padding-top: 50px;
    }
</style>
