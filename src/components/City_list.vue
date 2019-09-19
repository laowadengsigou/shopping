<template>
  <div>
     <div v-for="(item,index) in goos" :key="index">
         {{item.name}}
     </div>
  </div>
</template>

<script>
export default {
  name: "City_list",
  components: {},
  props: {
      goos:{
          type: Array
      }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
