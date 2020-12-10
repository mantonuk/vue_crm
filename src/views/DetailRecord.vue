<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb">
          Расход
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card red">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | CurrencyFilter("UAH") }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small> {{ record.date | DateFilter("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">
      something went wrong
    </p>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("RecordFetchById", id);
    const category = await this.$store.dispatch(
      "CategoryFetchById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.name
    };
    this.loading = false;
  }
};
</script>
