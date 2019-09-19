<template>
  <div>
    <div class="box">
      <div style="margin-top: 3%">
        <van-icon name="arrow-left" size="40px" @click="tui" />
      </div>
      <div class="dv">最近浏览</div>
    </div>
    <hr />
    <div v-if="this.arr.length === 0">你还没有浏览记录</div>
    <div>
      <div v-for="(item, index) in arr">
        <div style="display: flex">
          <div>
            <img :src="item.goodsOne.image_path" alt="" class="img" />
          </div>
          <div style="width: 100%;">
            <div>{{ item.goodsOne.name }}</div>
            <div>
              <span style="color: red">
                ${{ item.goodsOne.present_price }}
              </span>
              <span>
                <s>{{ item.goodsOne.orl_price }}</s>
              </span>
            </div>
          </div>
          <div style="margin-top:25%">
            <van-icon name="close" @click="dele(index)" />
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Look",
  components: {},
  props: {},
  data() {
    return {
      arr: []
    };
  },
  methods: {
    dele(index) {
      let list = JSON.parse(localStorage.getItem("arr")); //定义一个变量list接收locaIStorage里面arr的数据
      list.splice(index, 1); //设置一个假删除来删除当前点击项
      this.arr = list; //然后把页面当前还剩的几项重新附给arr
      localStorage.setItem("arr", JSON.stringify(this.arr)); //然后把当前页面还剩的几项的数据重新覆盖前面在locaIStorage存的数据
    },
    tui() {
      this.$router.push("/my");
    }
  },
  mounted() {
    this.arr = JSON.parse(localStorage.getItem("arr"));
    console.log(this.arr);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  height: 100px;
  line-height: 100px;
}
.dv {
  font-size: 40px;
  margin-left: 30%;
}
.img {
  width: 80%;
  border: 1px solid black;
  margin-left: 5%;
}
</style>
