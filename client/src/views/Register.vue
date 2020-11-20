<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <Loader v-if="loading"/>
          <v-col cols="12" sm="8" md="5" v-else>
            <v-card class="elevation-12">
              <v-window>
                <v-window-item>
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Добрый день!</h1>
                        <h5 class="text-center">
                          Тут где-то должен быть логотип компании
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark to="/login">Sign In</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Создание нового пользователя
                        </h1>
                        <h4 class="text-center mt-4">
                          Введите необходимые данные
                        </h4>
                        <v-form>
                          <v-text-field
                            v-model="name"
                            label="Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                            :error-messages="nameErrors"
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            required
                          />
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
                          <v-select
                            v-model="department"
                            single-line
                            :items="departments"
                            item-text="name"
                            item-value="_id"
                            prepend-icon="person"
                            clearable
                            label="Choose your department"
                            color="teal accent-3"
                            :error-messages="departmentSelectErrors"
                            @change="$v.department.$touch()"
                            @blue="$v.department.$touch()"
                            required
                          >
                          </v-select>
                          <v-select
                            v-model="position"
                            single-line
                            :items="positions"
                            item-text="name"
                            item-value="_id"
                            prepend-icon="person"
                            clearable
                            label="Choose your position"
                            color="teal accent-3"
                            :error-messages="positionSelectErrors"
                            @change="$v.position.$touch()"
                            @blue="$v.position.$touch()"
                            required
                          >
                          </v-select>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          rounded
                          color="teal accent-3"
                          dark
                          @click="submitHandler"
                        >
                        Sign Up</v-btn>
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
import { email, required, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    name: '',
    department: '',
    position: null,
    departments: [],
    positions: [],
    loading: false
  }),
  mixins: [validationMixin],
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    name: {
      required
    },
    department: {
      required
    },
    position: {
      required
    }
  },
  computed: {
    departmentSelectErrors () {
      const errors = []
      if (!this.$v.department.$dirty) return errors
      !this.$v.department.required && errors.push('Department is required')
      return errors
    },
    positionSelectErrors () {
      const errors = []
      if (!this.$v.position.$dirty) return errors
      !this.$v.position.required && errors.push('Position is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
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
  async mounted () {
    this.loading = true
    this.departments = await this.$store.dispatch('fetchDepartments')
    this.positions = await this.$store.dispatch('fetchPositions')
    this.loading = false
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
        password: this.password,
        name: this.name,
        position: this.position,
        department: this.department
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/login')
      } catch (e) {}
    }
  }
}
</script>
