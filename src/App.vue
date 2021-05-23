<template>
  <div id="app">
    <notifications group="default"/>
    <vue-confirm-dialog></vue-confirm-dialog>
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {NavBar},
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
    metaInfo() {
        return {
            title: this.$route.meta.title ? this.$route.meta.title : '',
        }
    },
}
</script>
