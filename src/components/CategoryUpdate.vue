<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">{{
              c.name
            }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="name"
            :class="{ invalid: $v.name.$dirty && $v.name.$error }"
          />
          <label for="name">Название</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
            >введите название</small
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && $v.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <small
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.required"
            >введите лимит</small
          >
          <small
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            min: {{ $v.limit.$params.minValue.min }}
          </small>
        </div>

        <button
          class="btn waves-effect waves-light"
          :disabled="$v.$dirty && $v.$invalid"
          type="submit"
        >
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  name: "CategoryUpdate",
  data: () => ({
    select: null,
    name: "",
    limit: 100,
    current: null
  }),
  validations: {
    name: {
      required
    },
    limit: {
      required,
      minValue: minValue(100)
    }
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  created() {
    const { id, name, limit } = this.categories[0];
    this.current = id;
    this.name = name;
    this.limit = limit;
  },
  watch: {
    current(catId) {
      const { name, limit } = this.categories.find(c => c.id === catId);
      this.name = name;
      this.limit = limit;
    }
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async handleSubmit() {
      console.log("handleSubmit");
      console.log(this.$v);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const categoryData = {
          id: this.current,
          name: this.name,
          limit: this.limit
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория упешно обновлена");
        this.$emit("updated", categoryData);
      }
    }
  }
};
</script>
