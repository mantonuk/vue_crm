<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate />
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
  components: {
    CategoryCreate,
    CategoryUpdate
  }
};
</script>
