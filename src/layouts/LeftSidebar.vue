<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <NavBar click="isOpen = !isOpen" />

      <SidebarMenu v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-TooltipDirective="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SidebarMenu from "@/components/SidebarMenu.vue";

import messages from "@/utils/messages";

export default {
  name: "LeftSidebar",
  data: () => ({
    isOpen: true,
    loading: true
  }),
  computed: {
    error() {
      return this.$store.getters.getError;
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Something went wrong");
    }
  },
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
