<template>
  <v-app>
    <v-app-bar app color="white" >
      <the-header></the-header>
    </v-app-bar>

    <v-main>
      <sign-in-form></sign-in-form>
      <grid></grid>
    </v-main>
  </v-app>
</template>

<script>
import grid from './components/Grid';
import theHeader from './components/Header';
import signInForm from './components/SignInForm.vue';
export default {
  name: 'App',

  components: {
    theHeader,
    grid,
    signInForm
  },

  data: () => ({
   
  }),

  created(){
     this.$store.dispatch('init');
  }
};
</script>
