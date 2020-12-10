<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      Записай нет. <router-link to="/record">Add</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "History",
  components: {
    HistoryTable
  },
  data: () => ({
    categories: [],
    records: [],
    loading: true
  }),
  async mounted() {
    const categories = await this.$store.dispatch("CategoriesFetch");
    const records = await this.$store.dispatch("RecordsFetch");

    this.records = records.map(record => {
      const categoryName = categories.find(
        category => category.id === record.categoryId
      ).name;
      const typeCss = record.type === "income" ? "green" : "red";
      const typeText = record.type === "income" ? "Доход" : "Расход";
      return {
        ...record,
        categoryName,
        typeCss,
        typeText
      };
    });

    console.log(this.records);
    this.loading = false;
  }
};
</script>
