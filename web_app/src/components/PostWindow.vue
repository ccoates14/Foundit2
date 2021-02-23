<template>
  <v-dialog v-model="$store.state.showPostWindow" max-width="1000">
    <v-container>
      <v-layout row class="text-cs-center">
        <v-container class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Sign In</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-form>
              <v-text-field class="ml-2" label="URL" type="url"> </v-text-field>
              <v-file-input class="ml-2" label="Images and Videos">
              </v-file-input>
              <v-text-field label="Title"></v-text-field>
              <v-text-area label="Description"></v-text-area>
              <!-- chip input -->
              <v-text-field label="Price"></v-text-field>
              <v-text-field label="Discount"></v-text-field>
            </v-form>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
