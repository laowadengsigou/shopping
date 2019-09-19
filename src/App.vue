<template>
  <div id="app">
    <router-view />
    <div v-if="$route.meta.name">
      <van-tabbar active-color="red" inactive-color="#000" route>
        <van-tabbar-item icon="wap-home" to="/">商城</van-tabbar-item>
        <van-tabbar-item icon="wap-nav" to="/branch">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" to="/shop"
          >购物车</van-tabbar-item
        >
        <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "APP",
  components: {},
  data() {
    return {};
  },
  mounted() {
    //最近浏览
    if (!JSON.parse(localStorage.getItem("arr"))) {
      let arr = [];
      localStorage.setItem("arr", JSON.stringify(arr));
    }
    //历史记录
    if (!JSON.parse(localStorage.getItem("arr1"))) {
      let arr1 = [];
      localStorage.setItem("arr1", JSON.stringify(arr1));
    }
  }
};
</script>

<style lang="scss">
#app {
  font-size: 30px;
}
@import "./style/comment";
</style>
