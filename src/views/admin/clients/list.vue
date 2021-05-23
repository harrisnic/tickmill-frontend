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
                    <b-col col class="d-flex justify-content-between">
                        <h5>All Clients</h5>
                        <b-button size="sm" @click="$router.push({name: 'admin.add-client'})" variant="success">
                            <b-icon-person-plus-fill></b-icon-person-plus-fill>
                            Add client
                        </b-button>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col col>
                        <div class="table-responsive-lg">
                            <table class="table" style="font-size: 14px;">
                                <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Avatar</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Last updated</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                <template v-for="client in clients.data">
                                    <span :key="client.data.id"></span>
                                    <ClientListItem :client="client.data"></ClientListItem>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </b-col>
                </b-row>

                <pagination :data="clients" @pagination-change-page="getResults"></pagination>
            </template>

        </b-container>
    </section>
</template>

<script>

import ClientListItem from '../components/ClientListItem'

export default {
    name: "List",
    components: {ClientListItem},
    data() {
        return {
            clients: {},
            'loading': true,
        }
    },
    created() {
        this.getResults();
    },
    methods: {
        getResults(page = 1) {
            this.axios.get(`/api/clients?page=${page}`)
                .then(response => {
                    this.clients = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.globalNotification('error', error.response.data.message)
                });
        },
    },
}
</script>
