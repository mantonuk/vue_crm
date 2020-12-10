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
        <p class="left">
          <strong>{{ category.name }}</strong>
          {{ category.outcome | CurrencyFilter("UAH") }} из
          {{ category.limit | CurrencyFilter("UAH") }}
        </p>
        <div class="progress" v-TooltipDirective="category.tooltip">
          <div
            class="determinate"
            :style="{ width: category.progressPercent + '%' }"
            :class="category.progressColor"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CurrencyFilter from "@/filters/CurrencyFilter";

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

    this.categories = categories.map(category => {
      const outcome = records
        .filter(record => record.categoryId === category.id)
        .filter(record => record.type === "outcome")
        .reduce((total, b) => total + (b.amount || 0), 0);

      const percent = (100 * outcome) / category.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipValue = category.limit - outcome;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на" : "Осталось"
      } ${CurrencyFilter(Math.abs(tooltipValue), "UAH")}`;

      return {
        ...category,
        outcome,
        progressPercent,
        progressColor,
        tooltip
      };
    });

    this.loading = false;
  }
};
</script>
