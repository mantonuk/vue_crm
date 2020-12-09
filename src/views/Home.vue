<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <UserBill :rates="currency.rates" fixer_base="EUR" />
      <UserCurrency :rates="currency.rates" />
    </div>
  </div>
</template>

<script>
import UserBill from "@/components/UserBill.vue";
import UserCurrency from "@/components/UserCurrency.vue";

export default {
  name: "Home",
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    UserBill,
    UserCurrency
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  }
};
</script>
