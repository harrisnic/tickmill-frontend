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
                        <b-button size="sm" @click="this.deleteTransaction" variant="danger">
                            <b-icon-trash></b-icon-trash> Delete
                        </b-button>
                    </div>

                    <b-form @submit.prevent="submitForm">
                        <b-card header-tag="header" footer-tag="footer">
                            <template #header>
                                <h5>Edit Transaction</h5>
                                <p>Client: {{form.client_name}}</p>
                            </template>

                            <b-form-group label="Amount:" label-for="amount">
                                <b-form-input
                                    id="amount"
                                    v-model="form.amount"
                                    :state="amountState"
                                    aria-describedby="amount-help amount-feedback"
                                    type="text"
                                    placeholder="Enter amount">
                                </b-form-input>
                                <b-form-invalid-feedback id="amount-feedback">
                                    Required. You should enter a number 123.55
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
        amountState() {
            return this.form.amount.length >= 1;
        }
    },
    data: function () {
        return {
            form: {
                'amount': '',
                'client_name': '',
            },
            'loading': true,
        }
    },
    created() {
        this.getTransaction();
    },
    methods: {
        getTransaction: function () {
            this.axios.get('/api/transactions/' + this.$route.params.id)
                .then(response => {
                    this.form = response.data.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        },
        submitForm: function () {
            this.axios.put(`/api/transactions/${this.$route.params.id}`, this.form)
                .then((response) => {
                    this.globalNotification('success', response.data.status)
                    this.$router.push({name: 'admin.transactions'});
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        },
        deleteTransaction() {
            this.$confirm({
                message: 'Are your sure you want to delete this transaction?',
                button: {
                    no: 'No',
                    yes: 'Yes',
                },
                callback: confirm => {
                    if (confirm) {
                        this.axios.delete(`/api/transactions/${this.$route.params.id}`)
                            .then((response) => {
                                this.globalNotification('success', response.data.message)
                                this.$router.push({name: 'admin.transactions'});
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
