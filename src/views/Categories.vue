<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="createNewCategory" />
        <CategoryUpdate
          v-if="categories.length"
          :key="categories.length + updateCount"
          :categories="categories"
          @updated="updateCategory"
        />
        <p v-else class="center">Woops...</p>
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
    this.loading = false;
  },
  methods: {
    createNewCategory(item) {
      this.categories.push(item);
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c => c.id === category.id);
      this.categories[idx].name = category.name;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    }
  }
};
</script>
