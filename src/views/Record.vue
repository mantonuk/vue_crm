<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий нет. <router-link to="/categories">Add</router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{
            c.name
          }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount" type="number" v-model.number="amount" />
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.required"
          class="helper-text invalid"
        >
          Введите значение
        </span>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
          Минимальная значение {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input id="description" type="text" v-model.trim="description" />
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
          Введите описание
        </span>
      </div>

      <button
        :disabled="$v.$dirty && $v.$invalid"
        class="btn waves-effect waves-light"
        type="submit"
      >
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "Record",
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    type: null,
    category: null,
    amount: null,
    description: null
  }),
  validations: {
    category: {
      required
    },
    type: {
      required
    },
    amount: {
      required,
      minValue: minValue(100)
    },
    description: {
      required
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("CategoriesFetch");
    this.loading = false;
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async handleSubmit() {
      console.log("handleSubmit");
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const data = {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        };

        console.log(data);
        //

        await this.$store.dispatch("RecordCreate", {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        });

      }
    }
  }
};
</script>
