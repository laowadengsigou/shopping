<template>
  <div>
    <div style="text-align: center;margin-top: 5px">
      会员中心
    </div>
    <br />
    <div class="dv">
      <div>
        <van-icon
          name="setting-o"
          size="30px"
          color="white"
          style="margin-left:380px"
          @click="sz"
        />
        <div>
          <img src="../assets/1.jpg" alt="" />
        </div>
        <div v-if="user">
          <div style="text-align: center;color: white">
            <span style="font-size: 25px">欢迎你:{{ user.nickname }}</span>
          </div>
          <br />
          <div style="text-align: center;color: white" @click="out">
            退出登陆
          </div>
        </div>
        <div v-else @click="go" style="text-align: center;color: white">
          请登陆
        </div>
        <br /><br />
      </div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">待付款</van-tabbar-item>
        <van-tabbar-item icon="search">待发货</van-tabbar-item>
        <van-tabbar-item icon="friends-o" >待收货</van-tabbar-item>
        <van-tabbar-item icon="setting-o" @click="Pl">评价</van-tabbar-item>
        <van-tabbar-item icon="gem-o">已完成</van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="box" @click="over">
      <van-row>
        <p>
          <van-col span="2"
            ><img
              src="../assets/订单.png"
              alt=""
              style="margin-left:10%;width: 30px;"
          /></van-col>
          <van-col span="20">全部订单</van-col>
          <van-col>
            <van-icon name="arrow"></van-icon>
          </van-col>
        </p>
      </van-row>
    </div>
    <div class="box" @click="collec">
      <van-row>
        <p>
          <van-col span="2"
            ><img
              src="../assets/s.png"
              alt=""
              style="margin-left:10%;width: 30px;"
          /></van-col>
          <van-col span="20">收藏商品</van-col>
          <van-col>
            <van-icon name="arrow"></van-icon>
          </van-col>
        </p>
      </van-row>
    </div>
    <div class="box" @click="Address">
      <van-row>
        <p>
          <van-col span="2"
            ><img
              src="../assets/地址.png"
              alt=""
              style="margin-left:10%;width: 30px;"
          /></van-col>
          <van-col span="20">地址管理</van-col>
          <van-col>
            <van-icon name="arrow"></van-icon>
          </van-col>
        </p>
      </van-row>
    </div>
    <div class="box" @click="look">
      <van-row>
        <p>
          <van-col span="2"
            ><img
              src="../assets/浏览.png"
              alt=""
              style="margin-left:10%;width: 30px;"
          /></van-col>
          <van-col span="20">最近浏览</van-col>
          <van-col>
            <van-icon name="arrow"></van-icon>
          </van-col>
        </p>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      name: "",
      active: 1
    };
  },
  methods: {
    Address(){
      this.$router.push("/address")
    },
    sz(){
      this.$router.push("/grzl")
    },
    out() {
      this.$axios
        .req("api/loginOut", {})
        .then(res => {
          console.log(res);
          localStorage.removeItem("user");
          this.$store.state.user = null;
        })
        .catch(e => {
          console.log(e);
        });
    },
    go() {
      this.$router.push("/land");
    },
    collec(){
      this.$router.push("/collection")
    },
    over(){
      this.$router.push("/over")
    },
    look(){
      this.$router.push("/look")
    },
    Pl(){
      this.$router.push("/pj")
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.van-tabbar {
  position: relative;
}
img {
  border-radius: 50%;
  width: 20%;
  margin-left: 300px;
}
.dv {
  background-color: #e6057f;
}
.box {
  margin: 5% 0;
  border: rgba(175, 175, 175, 0.95) solid 0.3px;
}
</style>
