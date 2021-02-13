import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#E0E0E0', 
            secondary: '#BDBDBD', 
            accent: '#757575',
          },
        },
    }
});
