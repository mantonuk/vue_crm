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
          >введите email</small
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
          :class="{ invalid: $v.password.$dirty && $v.password.$error }"
          v-model.trim="password"
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
      <div class="input-field">
        <input
          id="name"
          type="text"
          :class="{ invalid: $v.name.$dirty && $v.name.$error }"
          v-model.trim="name"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >Введите Имя</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" :checked="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          :disabled="!agree || $v.$invalid"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/">Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    name: {
      required
    }
  },
  methods: {
    handleSubmit() {
      console.log("handleSUbmit");
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$router.push("/");
      }
    }
  }
};
</script>
