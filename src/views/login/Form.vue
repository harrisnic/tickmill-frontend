<template>
    <section>
        <b-container>
            <b-row align-h="center">
                <b-col lg="4" md="6">
                    <b-form @submit.prevent="submit">
                        <b-form-group label="Email address:" label-for="email">
                            <b-form-input id="email" v-model="form.email" type="text" placeholder="Enter email"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Password:" label-for="password">
                            <b-form-input id="password" v-model="form.password" placeholder="Enter password" type="password"></b-form-input>
                        </b-form-group>

                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "Form",
    data: function () {
        return {
            form: {
                'email': '',
                'password': '',
            },
        }
    },
    methods: {
        ...mapActions(["LogIn"]),
        submit: async function () {
            try {
                await this.LogIn(this.form);
                await this.$router.push({name: 'admin.clients'});
            } catch (error) {
                this.globalNotification('error', error.response.data.message);
                await this.$router.push({name: 'login'});
            }
        }
    }
}
</script>
