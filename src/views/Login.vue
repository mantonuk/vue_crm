<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{ invalid: $v.email.$dirty && $v.email.$error }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
          >Введите email</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >Неверный email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{ invalid: $v.password.$dirty && $v.password.$error }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Введите Пароль</small
        >
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен быть более
          {{ $v.password.$params.minLength.min }} символов</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: ""
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$router.push("/");
      }
    }
  }
};
</script>
