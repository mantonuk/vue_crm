<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <UserBill />
      <UserCurrency />
    </div>
  </div>
</template>

<script>
import UserBill from '@/components/UserBill.vue';
import UserCurrency from '@/components/UserCurrency.vue';

export default {
  name: "Home",
  components: {
    UserBill,
    UserCurrency
  }
};
</script>
