const currency_settings = {
  access_key: process.env.VUE_APP_FIXER_KEY,
  symbols: "UAH,USD,EUR"
};

export default {
  actions: {
    async fetchCurrency() {
      const data = await fetch(
        `http://data.fixer.io/api/latest?access_key=${currency_settings.access_key}&symbols=${currency_settings.symbols}`
      );
      return await data.json();
    }
  }
};
