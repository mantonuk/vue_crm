<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="createNewCategory" />
        <CategoryUpdate :categories="categories" />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryUpdate from "@/components/CategoryUpdate";
export default {
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryUpdate
  },
  async mounted() {
    this.categories = await this.$store.dispatch("CategoriesFetch");
    console.log(this.categories);
    this.loading = false;
  },
  methods: {
    createNewCategory(item) {
      console.log("categoryHasBeenCreated");
      this.categories.push(item);
      console.log(this.categories);
    }
  }
};
</script>
