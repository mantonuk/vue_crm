<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ userBill | CurrencyFilter("UAH") }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      Категорий нет. <router-link to="/records">Add</router-link>
    </p>

    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.name }}</strong>
          {{ category.outcome }} из {{ category.limit }}
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
    const categories = await this.$store.dispatch("CategoriesFetch");
    const records = await this.$store.dispatch("RecordsFetch");

    categories.map(category => {
      const income = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === "income")
        .reduce((a, b) => a + (b["amount"] || 0), 0);
      const outcome = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === "outcome")
        .reduce((a, b) => a + (b["amount"] || 0), 0);
      /*console.log(income);*/
      /*console.log(outcome);*/
      category.income = income;
      category.outcome = outcome;
    });

    this.categories = categories;
    this.loading = false;
  }
};
</script>
