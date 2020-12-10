<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ userBill | CurrencyFilter('UAH') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий нет. <router-link to="/records">Add</router-link>
    </p>

    <section v-else>
      <div>
        <p>
          <strong>Девушка:</strong>
          12 122 из 14 0000
        </p>
        <div class="progress">
          <div class="determinate green" style="width:40%"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Planing",
  data: () => ({
    categories: [],
    records: [],
    loading: true
  }),
  computed: {
    ...mapGetters(["user_info"]),
    userBill() {
      return this.user_info.bill;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("CategoriesFetch");
    this.records = await this.$store.dispatch("RecordsFetch");
    console.log(this.categories);
    console.log(this.records);
    this.loading = false;
  }
};
</script>
