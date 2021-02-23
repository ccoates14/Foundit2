<template>
  <v-app>
    <v-app-bar app color="white">
      <the-header></the-header>
    </v-app-bar>

    <v-main>
      <v-btn color="pink" v-show="true" dark fixed bottom right fab @click="$store.commit('setShowPostWindow', true)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <sign-in-form></sign-in-form>
      <post-window></post-window>
      <grid> </grid>
    </v-main>
  </v-app>
</template>

<script>
import grid from './components/Grid';
import theHeader from './components/Header';
import signInForm from './components/SignInForm.vue';
import postWindow from './components/PostWindow';
export default {
  name: 'App',

  components: {
    theHeader,
    grid,
    signInForm,
    postWindow
  },

  data: () => ({}),

  created() {
    this.$store.dispatch('init');
  },
};
</script>
