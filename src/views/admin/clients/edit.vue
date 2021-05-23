<template>
    <section>
        <b-container>

            <b-button v-if="this.loading" variant="primary" disabled>
                <b-spinner small type="grow"></b-spinner>
                Loading...
            </b-button>

            <b-row v-else class="mb-3" align-h="center">
                <b-col lg="4" md="6">

                    <div class="mb-4 d-flex justify-content-between">
                        <b-button size="sm" @click="$router.back()" variant="light">
                            <b-icon-arrow-left-circle></b-icon-arrow-left-circle> Back
                        </b-button>
                        <b-button size="sm" @click="this.deleteClient" variant="danger">
                            <b-icon-person-dash-fill></b-icon-person-dash-fill> Delete
                        </b-button>
                    </div>

                    <b-form @submit.prevent="submitForm">
                        <b-card header-tag="header" footer-tag="footer">
                            <template #header>
                                <h5>Edit Client</h5>
                            </template>

                            <b-form-group label="First name:" label-for="first_name">
                                <b-form-input
                                    id="first_name"
                                    v-model="form.first_name"
                                    :state="firstNameState"
                                    aria-describedby="firstname-help firstname-feedback"
                                    type="text"
                                    placeholder="Enter first name">
                                </b-form-input>
                                <b-form-invalid-feedback id="firstname-feedback">
                                    Required field
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group label="Last name:" label-for="last_name">
                                <b-form-input
                                    id="last_name"
                                    v-model="form.last_name"
                                    :state="lastNameState"
                                    aria-describedby="lastname-help lastname-feedback"
                                    type="text"
                                    placeholder="Enter last name">
                                </b-form-input>
                                <b-form-invalid-feedback id="lastname-feedback">
                                    Required field
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
        firstNameState() {
            return this.form.first_name.length >= 1;
        },
        lastNameState() {
            return this.form.last_name.length >= 1;
        },
    },
    data: function () {
        return {
            form: {
                'first_name': '',
                'last_name': '',
            },
            'loading': true,
        }
    },
    created() {
        this.getClient();
    },
    methods: {
        getClient: function () {
            this.axios.get('/api/clients/' + this.$route.params.id)
                .then(response => {
                    this.form = response.data.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        },
        submitForm: function () {
            this.axios.put(`/api/clients/${this.$route.params.id}`, this.form)
                .then((response) => {
                    this.globalNotification('success', response.data.status)
                    this.$router.push({name: 'admin.clients'});
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        },
        deleteClient() {
            this.$confirm({
                message: 'Are your sure you want to delete this client? Also, all the transactions of this client will be deleted.',
                button: {
                    no: 'No',
                    yes: 'Yes',
                },
                callback: confirm => {
                    if (confirm) {
                        this.axios.delete(`/api/clients/${this.$route.params.id}`)
                            .then((response) => {
                                this.globalNotification('success', response.data.message)
                                this.$router.push({name: 'admin.clients'});
                            })
                            .catch(error => {
                                this.globalNotification('error', error.response.data.message)
                            });
                    }
                },
            });
        },
    },
}
</script>
