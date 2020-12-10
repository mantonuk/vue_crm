<template>
  <div>
    <div class="col s12 m6">
      <div>
        <div class="page-subtitle">
          <h4>Создать</h4>
        </div>

        <form @submit.prevent="handleSubmit()">
          <div class="input-field">
            <input
              id="name"
              type="text"
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
              v-model="limit"
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
            type="submit"
            :disabled="$v.$invalid"
          >
            Создать
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  name: "CategoryCreate",
  data: () => ({
    name: null,
    limit: null
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
  methods: {
    async handleSubmit() {
      console.log("handleSubmit");
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          const category = await this.$store.dispatch("CategoryCreate", {
            name: this.name,
            limit: this.limit
          });
          this.name = "";
          this.limit = 100;
          this.$v.$reset();
          this.$message("Категория была создана");
          this.$emit("created", category);
        } catch (error) {
          /*console.log(error);*/
        }
      }
    }
  },
  mounted() {
    window.M.updateTextFields();
  }
};
</script>
