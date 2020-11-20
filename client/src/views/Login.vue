<template>
<v-app>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="4" class="teal accent-3">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">Тут должен быть логотип</h1>
                      <h5 class="text-center">Зарегистрироваться</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark to="/register">Sign Up</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-2 teal--text text-accent-3">Вход в систему</h1>
                      <v-form class="mt-12">
                        <v-text-field
                          v-model="email"
                          label="Email"
                          name="Email"
                          prepend-icon="email"
                          type="text"
                          color="teal accent-3"
                          :error-messages="emailErrors"
                          @input="$v.email.$touch()"
                          @blur="$v.email.$touch()"
                          required
                        />
                        <v-text-field
                          v-model="password"
                          id="password"
                          label="Password"
                          name="Password"
                          prepend-icon="lock"
                          type="password"
                          color="teal accent-3"
                          :error-messages="passwordErrors"
                          @input="$v.password.$touch()"
                          @blur="$v.password.$touch()"
                          required
                          />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3">
                      <v-btn
                        rounded
                        color="teal accent-3"
                        dark
                        @click="submitHandler"
                      >
                      Войти
                      </v-btn>
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
import {
  email, required, minLength
} from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'login',
  props: {
    source: String
  },
  mixins: [validationMixin],
  data: () => ({
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
  computed: {
    alertMessage () {
      if (this.$route.query.message === 'login') return this.$store.commit('snackbar/setSnack', { message: 'Войдите в систему', color: 'teal accent-3' })
      if (this.$route.query.message === 'logout') return this.$store.commit('snackbar/setSnack', { message: 'Вы вышли из системы', color: 'teal accent-3' })
      return null
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push(`Password must be at least ${this.$v.password.$params.minLength.min} characters long`)
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.commit('snackbar/setSnack', { message: 'Заполните все поля!', color: 'red darken-2' })
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
  }
}
</script>
