<template>
    <section>
        <b-container>

            <template v-if="this.loading">
                <b-button variant="primary" disabled>
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </b-button>
            </template>

            <template v-else>
                <b-row class="mb-4">
                    <b-col col>
                        <h5>All Transactions</h5>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col col>
                        <div class="table-responsive-lg">
                            <table class="table">
                                <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Client</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Last update</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="transaction in transactions.data">
                                    <span :key="transaction.id"></span>
                                    <TransactionListItem :transaction="transaction.data"></TransactionListItem>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </b-col>
                </b-row>

                <pagination :data="transactions" @pagination-change-page="getResults"></pagination>
            </template>
        </b-container>
    </section>
</template>

<script>

import TransactionListItem from '../components/TransactionListItem'

export default {
    name: "List",
    components: {TransactionListItem},
    data() {
        return {
            transactions: {},
            'loading': true,
        }
    },
    created() {
        this.getResults();
    },
    methods: {
        getResults(page = 1) {
            this.axios.get(`/api/transactions?page=${page}`)
                .then(response => {
                    this.transactions = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        },
    },
}
</script>
