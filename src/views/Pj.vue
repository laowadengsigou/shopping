<template>
  <div>
    <div class="box">
      <div style="margin-top: 3%" @click="tui">
        <van-icon name="arrow-left" size="40px" />
      </div>
      <div class="dv">评论中心</div>
    </div>
    <div>
      <img src="../assets/evaluate.jpg" alt="" style="width: 100%;" />
    </div>
    <div>
      <van-tabs v-model="active">
        <van-tab title="待评价">
          <div v-for="(item, index) in list">
            <div class="dpj">
              <div>
                <img :src="item.image_path" alt="" style="width:150px;" />
              </div>
              <div style="margin-right:20%;">
                <div>{{ item.name }}</div>
                <van-button
                  type="danger"
                  style="margin-left: 60%;margin-top: 40%"
                  @click="pl(item)"
                  >评论晒单</van-button
                >
              </div>
            </div>
            <hr />
          </div>
        </van-tab>
        <van-tab title="已评价">
          <div v-for="(item, index) in lists" :key="index">
            <div class="ypj">
              <div>
                <img
                  :src="item.goods[0].image_path"
                  alt=""
                  style="width: 150px;"
                />
              </div>
              <div>
                <div>
                  {{ item.goods[0].name }}
                </div>
                <div style="color: red;margin-top: 40%;" @click="cha(item)">
                  查看评论
                </div>
              </div>
            </div>
            <hr />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pj",
  components: {},
  props: {},
  data() {
    return {
      active: 2,
      list: [],
      lists: []
    };
  },
  methods: {
    tui() {
      this.$router.push("/my");
    },
    pl(item) {
      this.$router.push({name: "pl", params: {item:item}});
    },
    cha(item) {
      this.$router.push({name: "plxq", params: {item:item}});
    },
  },
  mounted() {
    this.$axios
      .req("api/tobeEvaluated")
      .then(res => {
        this.list = res.data.data.list;
        console.log(this.list);
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios
      .req("api/alreadyEvaluated")
      .then(res => {
        this.lists = res.data.data.list;
        console.log(this.lists);
      })
      .catch(e => {
        console.log(e);
      });
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
.dpj {
  display: flex;
  margin-left: 10%;
}
.ypj {
  display: flex;
}
</style>
