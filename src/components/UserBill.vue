<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p class="currency-line" v-for="(item, index) in rates" :key="index">
          <span>{{ getCurrency(index) | CurrencyFilter(index) }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserBill",
  props: ["rates", "fixer_base"],
  computed: {
    base() {
      return (
        this.$store.getters.user_info.bill /
        (this.rates["UAH"] / this.rates["EUR"])
      );
    }
  },
  methods: {
    getCurrency(currency) {
      console.log(currency);
      return Math.floor(this.base * this.rates[currency], 2);
    }
  }
};
</script>
