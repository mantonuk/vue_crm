<template>
  <div class="app-main-layout">
    <NavBar click="isOpen = !isOpen" />

    <SidebarMenu v-model="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  name: "LeftSidebar",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  components: {
    NavBar,
    SidebarMenu
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.user_info).length) {
      await this.$store.dispatch("fetchUserInfo");
    }

    this.loading = false;
  }
};
</script>
