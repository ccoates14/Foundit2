<template>
  <div>
    <v-row class="ml-3">
      <h1>
        Foundit
      </h1>
      <div class="ml-5 mt-1 ">
        <v-text-field
          clearable
          flat
          solo-inverted
          hide-details
          label="Search"
          dense
          v-model="searchTerm"
        ></v-text-field>
      </div>
      <v-btn class="ml-3 mt-1">Search</v-btn>
      <v-btn class="ml-3 mt-1">Home</v-btn>
      <v-btn class="ml-3 mt-1" @click="$store.commit('setShowSignInForm', true)">Sign In</v-btn>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    searchTerm: ''
  }),
};
</script>
