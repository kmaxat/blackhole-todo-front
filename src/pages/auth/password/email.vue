<template>
    <div id="auth">
        <div class="columns">
            <div class="column has-text-centered">
                <h2 class="title">{{ title }} </h2>
            </div>
        </div>
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <div class="notification is-success" v-if="isSuccess">
                    <button class="delete" @click="isSuccess = false"></button>
                   Reset link has been sent
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column"></div>
            <div class="column is-3 ">
                <form method="POST" @submit.prevent="login">
                    <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" type="email"
                                   placeholder="Email"
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
                        <p class="has-text-centered">
                        <button class="button is-primary is-fullwidth" :class="{
                                   'is-loading' : isLoading }" type="submit">
                            Send reset link
                        </button>
                        </p>
                    </div>
                </form>
            </div>
            <div class="column"></div>
        </div>
        <div class="columns">
            <div class="column has-text-centered">
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
        name: 'password_email',
        metaInfo: {title: 'Reset password'},
        layout: 'default',

        data() {
            return {
                title: 'Reset password',
                isLoading: false,
                isSuccess : false,
                form: new Form({
                    email: '',
                }),
            };
        },
        methods: {
            login() {
                this.isLoading = true;
                this.isSuccess = false;
                this.form.post('/api/password/email')
                    .then(response => {
                        this.isLoading = false;
                        this.isSuccess = true;
                        this.status = status
                    })
                    .catch(error => {
                        this.isLoading = false;
                        this.isSuccess = false;
                        console.error(error);
                    })
            }
        }
    }
</script>
<style>
    #auth {
        padding-top: 50px;
    }
</style>
