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
      <p v-if="$v.type.$dirty && !$v.type.required">
        <span class="helper-text invalid">
          Введите тип
        </span>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && $v.amount.$error }"
        />
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
        <input
          id="description"
          type="text"
          v-model.trim="description"
          :class="{ invalid: $v.description.$dirty && $v.description.$error }"
        />
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
import { mapGetters } from "vuex";

export default {
  name: "Record",
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    type: "outcome",
    category: null,
    amount: null,
    description: null
  }),
  computed: {
    ...mapGetters(["user_info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.user_info.bill >= this.amount;
    }
  },
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

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

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

        if (this.canCreateRecord) {
          await this.$store.dispatch("RecordCreate", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });

          const bill =
            this.type === "income"
              ? this.user_info.bill + this.amount
              : this.user_info.bill - this.amount;

          await this.$store.dispatch("updateUserInfo", { bill });
          this.$message("Запись успешно создана");
          this.$v.$reset();
          this.type = "outcome";
          this.amount = "";
          this.description = "";
          if (this.categories.length) {
            this.category = this.categories[0].id;
          }
        } else {
          this.$message(
            `Недостаточно средств на счете (${this.amount -
              this.user_info.bill})`
          );
        }
      }
    }
  }
};
</script>
