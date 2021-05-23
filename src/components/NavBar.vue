<template>
    <div class="mb-5">
        <b-navbar toggleable="lg" type="light" variant="light">

            <b-navbar-brand><img src="@/assets/images/tickmill-light.svg" height="30" alt="logo"></b-navbar-brand>

            <template v-if="loggedIn">
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item :to="{ name: 'admin.clients' }">Clients</b-nav-item>
                        <b-nav-item :to="{ name: 'admin.transactions' }">Transactions</b-nav-item>
                    </b-navbar-nav>

                    <b-navbar-nav class="ml-auto">
                        <b-nav-item @click="logout">Sign out</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </template>

        </b-navbar>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "NavBar",
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    },
    methods: {
        ...mapActions(["DestroyToken"]),
        logout: async function () {
            try {
                // await this.$store.dispatch('DestroyToken');
                await this.DestroyToken();
                await this.$router.push({name: 'login'});
            } catch (error) {
                this.globalNotification('error', error.response.data.message)
            }
        }
    },
}
</script>
