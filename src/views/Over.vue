<template>
  <div style="background-color: #cccccc">
    <div class="box">
      <div style="margin-top: 3%" @click="tui">
        <van-icon name="arrow-left" size="40px" />
      </div>
      <div class="dv">我的订单</div>
    </div>
    <hr />
    <div>
      <van-tabs v-model="active">
        <van-tab title="全部"></van-tab>
        <van-tab title="待支付"></van-tab>
        <van-tab title="待发货"></van-tab>
        <van-tab title="待收货"></van-tab>
        <van-tab title="已完成">
          <div>
            <div v-for="(item, index) in list" class="dv1">
              <div>订单编号:{{ item.order_id }}</div>
              <hr />
              <div v-for="(item1, index) in item.order_list">
                <div style="display: flex">
                  <div>
                    <img :src="item1.image_path" alt="" class="img" />
                  </div>
                  <div style="width:100%;">
                    <div>{{ item1.name }}</div>
                    <div style="margin-left: 70%">
                      ￥{{ item1.present_price }}
                    </div>
                    <div style="opacity: .4;margin-left: 70%">
                      X{{ item1.count }}
                    </div>
                  </div>
                </div>
                <hr />

              </div>
                <div>
                    <div style="margin-left: 30%">
                        创建时间:{{ item.add_time }}
                    </div>
                    <br />
                    <div style="margin-left: 30%">
                        收货地址: {{ item.address }}
                    </div>
                    <br />
                    <div style="margin-left: 30%">
                        共{{ item.order_list.length }}件商品 合计:{{ item.mallPrice }}
                    </div>
                </div>
            </div>
          </div>
            <br><br><br>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Over",
  components: {},
  props: {},
  data() {
    return {
      active: 5,
      list: [],
      orderList: []
    };
  },
  methods: {
    tui() {
      this.$router.push("/my");
    }
  },
  mounted() {
    this.$axios
      .req("api/myOrder")
      .then(res => {
        this.list = res.data.list;
        this.orderList = res.data.list.order_list;
        console.log(this.list);
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
    background-color: white;
}
.dv {
  font-size: 40px;
  margin-left: 30%;
}
.dv1 {
  margin-left: 5%;
    margin-top: 5%;
  width: 90%;
  height: 30%;
  border: 1px solid black;
    border-radius:5%;
    background-color: white;
}
.img {
  width: 50%;
  border: 1px solid black;
}
.hi {
}
</style>
