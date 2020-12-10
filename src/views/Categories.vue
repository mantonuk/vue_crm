<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="createNewCategory" />
        <CategoryUpdate />
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
    categories: []
  }),
  components: {
    CategoryCreate,
    CategoryUpdate
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
