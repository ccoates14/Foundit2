<template>
  <div>
    <v-card
      class="mx-auto mt-3 ml-3"
      max-width="400"
      color="blue-grey lighten-5"
    >
      <v-container max-width="390">
        <v-row max-width="390">
          <v-card
            color="secondary"
            height="60"
            max-width="380"
            width="380"
          >
            <v-row class="mt-1 mr-3">
              <v-avatar class="ml-5 mb-3" size="56">
                <img :src="authorImage" alt="author" />
              </v-avatar>
              <v-spacer></v-spacer>
              <div class="ml-3 font-weight-medium text-text-xl-body-1">
                {{ price }}
              </div>
              <div
                class="ml-3 mr-3 red--text font-weight-medium  text-text-xl-body-1"
              >
                -{{ discountPercent }}%
              </div>
              <div>
                {{ authorUsername }}
              </div>
            </v-row>
          </v-card>
        </v-row>
      </v-container>
      <v-carousel
        v-model="currentImage"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
      >
        <v-carousel-item v-for="(i, index) in images" :key="index">
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-col>
                <v-img :src="i"> </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
      </v-carousel>
      <div class="mt-2 ml-3 ">
        <v-btn class="mx-2" fab dark small color="pink">
          <v-icon dark>
            mdi-heart
          </v-icon>
        </v-btn>
        <v-btn @click="openLinkInNewTab(url)">
          Check it out!
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    images: Array,
    authorImage: String,
    authorUsername: String,
    description: String,
    price: Number,
    discountPercent: Number,
    saves: Number,
    url: String,
    saved: Boolean,
  },
  data: () => ({
    saveClicked: false,
    currentImage: 0,
  }),
};
</script>
