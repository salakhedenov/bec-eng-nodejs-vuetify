<template>
<v-app>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text-accent-3">Sign in</h1>
                      <div class="text-center" mt-4>
                      </div>
                      <h4 class="text-center mlt-4">Ensure your email for registration</h4>
                      <v-form>
                        <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="teal accent-3"
                        />
                        <v-text-field
                          id="password"
                          label="Password"
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="teal accent-3"
                        />
                      </v-form>
                      <h3 class="text-center mt-3">Forget your password ?</h3>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn rounded color="teal accent-3" dark>Sign In</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="teal accent-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Hello Friends !</h1>
                      <h5 class="text-center">Enter your personal details and start</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step++">Sign Up</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="teal accent-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Welcome Back</h1>
                      <h5 class="text-center">To keep connected with us please login with your personal info</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--">Sign In</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text--center display-2 teal--text text--accent-3">Create Account</h1>
                      <div class="text-center mt-4">
                        <v-btn class="mx-2" fab color="black" outlined><v-icon>fab fa-facebook-f</v-icon></v-btn>
                        <v-btn class="mx-2" fab color="black" outlined><v-icon>fab fa-google-plus-g</v-icon></v-btn>
                        <v-btn class="mx-2" fab color="black" outlined><v-icon>fab fa-linkedin-in</v-icon></v-btn>
                      </div>
                      <h4 class="text-center mt-4">Ensure your email for registration</h4>
                      <v-form>
                        <v-text-field
                          label="Name"
                          name="Name"
                          prepend-icon="person"
                          type="text"
                          color="teal accent-3"
                        />
                        <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="teal accent-3"
                        />
                        <v-text-field
                          id="password"
                          label="Password"
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="teal accent-3"
                        />
                        <v-select
                          v-model="value"
                          :items="items"
                          chips
                          attach
                          clearable
                          label="Choose your department"
                          multiple
                          class="ml-8 mr-1">
                        </v-select>
                        <v-select
                          v-model="value"
                          :items="items"
                          chips
                          attach
                          clearable
                          label="Choose your position"
                          multiple
                          class="ml-8 mr-1">
                        </v-select>
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-n5">
                      <v-btn rounded color="teal accent-3" dark>Sign Up</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</v-app>
</template>

<script>
// import messages from '@/utils/messages'
import {
  email, required, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  props: {
    source: String
  },
  data: () => ({
    step: 1,
    email: '',
    password: ''
  }),
  validations: {
    email: {
      email, required
    },
    password: {
      required, minLength: minLength(6)
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },
  mounted () {
    // if (messages[this.$route.query.message]) {
    //   this.$message(messages[this.$route.query.message])
    // }
  }
}
</script>
