<template>
    <section>

        <b-container>
            <b-row class="mb-3" align-h="center">
                <b-col lg="4" md="6">

                    <div class="mb-4">
                        <b-button size="sm" @click="$router.back()" variant="light">
                            <b-icon-arrow-left-circle></b-icon-arrow-left-circle> Back
                        </b-button>
                    </div>

                    <b-form @submit.prevent="submitForm">
                        <b-card header-tag="header" footer-tag="footer">
                            <template #header>
                                <h5>Add client</h5>
                            </template>

                            <b-form-group label="First name:" label-for="firstname">
                                <b-form-input
                                    id="first_name"
                                    v-model="form.first_name"
                                    :state="firstnameState"
                                    aria-describedby="firstname-help firstname-feedback"
                                    type="text"
                                    placeholder="Enter first name">
                                </b-form-input>
                                <b-form-invalid-feedback id="firstname-feedback">
                                    Required.
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group label="Last name:" label-for="lastname">
                                <b-form-input
                                    id="last_name"
                                    v-model="form.last_name"
                                    :state="lastnameState"
                                    aria-describedby="lastname-help lastname-feedback"
                                    type="text"
                                    placeholder="Enter last name">
                                </b-form-input>
                                <b-form-invalid-feedback id="lastname-feedback">
                                    Required.
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group label="Email:" label-for="email">
                                <b-form-input
                                    id="email"
                                    v-model="form.email"
                                    :state="emailState"
                                    aria-describedby="email-help email-feedback"
                                    type="text"
                                    placeholder="Enter email">
                                </b-form-input>
                                <b-form-invalid-feedback id="email-feedback">
                                    Required.
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <template #footer>
                                <div>
                                    <b-button type="submit" variant="primary">Submit</b-button>
                                </div>
                            </template>
                        </b-card>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>

    </section>
</template>

<script>
export default {
    name: "Form",
    computed: {
        firstnameState() {
            return this.form.first_name.length >= 1;
        },
        lastnameState() {
            return this.form.last_name.length >= 1;
        },
        emailState() {
            return this.form.email.length >= 1;
        }
    },
    data: function () {
        return {
            form: {
                'first_name': '',
                'last_name': '',
                'email': '',
            },
        }
    },
    methods: {
        submitForm: function () {
            this.axios.post(`/api/clients`, this.form)
                .then((response) => {
                    this.globalNotification('success', response.data.status)
                    this.$router.push({name: 'admin.clients'});
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        }
    },
}
</script>
