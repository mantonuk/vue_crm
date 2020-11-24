<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="item in links"
      :key="item.href"
      tag="li"
      active-class="active"
      :to="item.href"
      :exact="item.exact"
      >
      <a href="#" class="waves-effect waves-orange pointer">{{ item.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props : [ 'value' ],
  name: "SidebarMenu",
  data: () => ({
    links : [
      {
        title: "Счет",
        href: "/",
        exact: true
      },
      {
        title: "История",
        href: "/history"
      },
      {
        title: "Планирование",
        href: "/planning"
      },
      {
        title: "Новая запись",
        href: "/record"
      },
      {
        title: "Категории",
        href: "/categories"
      }
    ]
  })
};
</script>
