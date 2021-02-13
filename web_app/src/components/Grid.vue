<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters v-if="$store.state.cards.length > 0">
        <v-col v-for="(c, index) in $store.state.cards" :key="c.url + index" cols="12" sm="4">
          <card
            :title="c.title"
            :images="c.images"
            :authorImage="c.authorImage"
            :description="c.description"
            :price="c.price"
            :discountPercent="c.discountPercent"
            :saves="c.saves"
            :url="c.url"
            :saved="c.saved"
            :authorUsername="c.authorUsername"
          ></card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Card from './Card';

export default {
  components: {
    Card,
  },
};
</script>
