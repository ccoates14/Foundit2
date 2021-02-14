<template>
  <v-dialog v-model="$store.state.showSignInForm" max-width="600">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-container class="text-xs-center">
          <v-card flat>
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-title primary-title>
                  <h4>Sign In</h4>
                </v-card-title>
                <v-form>
                  <v-text-field
                    class="ml-2"
                    name="Username"
                    label="Username"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    class="ml-2"
                    name="Password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>

                  <v-card-actions>
                    <v-btn primary small @click="signIn">Login</v-btn>
                    <v-btn primary small @click="step++">Sign Up</v-btn>
                    <v-btn primary small @click="$store.commit('setShowSignInForm', false)">Close</v-btn>
                  </v-card-actions>
                </v-form>
              </v-window-item>
              <v-window-item :value="2">
                <v-card-title primary-title>
                  <h4>Sign Up</h4>
                </v-card-title>
                <v-form v-model="isValidForm">
                  <v-text-field
                    class="ml-2"
                    name="Username"
                    :label="label"
                    required
                    :rules="usernameRules"
                    v-model="username"
                    v-click-outside="updateLabel"
                  ></v-text-field>
                  <v-text-field
                    class="ml-2"
                    name="Password"
                    label="Password"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    class="ml-2"
                    name="Password"
                    label="Password"
                    type="password"
                    v-model="password2"
                    :rules="[
                      ...passwordRules,
                      () =>
                        password == password2 || 'Passwords must be the same!',
                    ]"
                    required
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn primary small @click="step--">Back</v-btn>

                    <v-btn
                      primary
                      small
                      :disabled="!isValidForm"
                      @click="submitSignUp"
                      >Sign Up</v-btn
                    >
                    <v-btn primary small @click="$store.commit('setShowSignInForm', false)">Close</v-btn>
                  </v-card-actions>
                </v-form>
              </v-window-item>
            </v-window>
          </v-card>
        </v-container>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>

export default {
  data: () => ({
    label: 'Username',
    username: '',
    password: '',
    password2: '',
    step: 1,
    isValidForm: false,
    usernameRules: [(v => v && v.length > 3) || 'username required!'],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 5) || 'Password must have 5+ characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
      v => /(?=.*\d)/.test(v) || 'Must have one number',
      v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]',
    ],
  }),
  methods: {
    async updateLabel(){
      try{
        if (this.username != null && this.username.length > 3 && await this.checkUserNameTaken(this.username)){
          this.label = "Username already taken!";
          this.username = '';
          this.isValidForm = false;
        }
      }catch (err){
        console.log(err);
        this.label = "Username";
      }
    
    },
    signIn() {
      console.log('sss');
      this.$store.dispatch('signIn', {
        username: this.username,
        password: this.password
      });
    },
    async checkUserNameTaken() {
      const r = await this.$store.dispatch('checkUsernameTaken', this.username);
  
      return r.data;
    },
    submitSignUp() {
      if (this.isValidForm){
          this.$store.dispatch('signUp',{
              username: this.username,
              password: this.password
          });
      }
    },
  },
  created(){
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'setShowSignInForm'){
        if (!mutation.payload){
          this.username = '';
          this.password = '';
          this.password2 = '';
          this.isValidForm = false;
          this.step = 1;
        }
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
