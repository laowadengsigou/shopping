<template>
  <div>
    <div class="box">
      <div style="margin-top: 3%" @click="tui">
        <van-icon name="arrow-left" size="40px" />
      </div>
      <div class="dv">订单结算</div>
    </div>
    <hr />
    <div style="display: flex">
      <div style="margin-top: 10%">
        <van-icon name="location-o" size="40" />
      </div>
      <div style="margin-top: 3%;margin-left: 5%">
        <div>
          <span>收货人:{{ list.name }}</span>
          <span style="margin-left: 30%">{{ list.tel }}</span>
        </div>
        <br />
        <div style="width: 80%;">收货地址: {{ list.address }}</div>
      </div>
    </div>
    <div style="float: right;" @click="click">
      <van-icon name="arrow" size="30px" />
    </div>
    <br />
    <div><img src="../assets/caitiao.jpg" alt="" style="width: 100%;" /></div>
    <div v-for="(item, index) in items">
      <div>
        <div>
          <img :src="item.image_path" alt="" class="img" />
        </div>
        <div>
          <div style="color: red">
            {{ item.name }}
          </div>
          <span style="color: red"> ￥{{ item.present_price }} </span>
          <span style="margin-left: 70%"> X{{ item.count }} </span>
        </div>
      </div>
    </div>
    <div style="float: right;margin-top: 30%">
      <div>
        <span>合计:{{ sum }}</span>
        <van-button type="danger" @click="ti">提交订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Settle",
  components: {},
  props: {},
  data() {
    return {
      items: [],
      list: {},
      arr: {
        orderId: []
      },
      idDirect: ""
    };
  },
  methods: {
    click() {
      this.$router.push("/address");
    },
    ti() {
      this.items.forEach(item => {
        this.arr.orderId.push(item.cid);
      });
      this.arr.count = this.num;
      this.arr.address = this.list.address;
      this.arr.tel = this.list.tel;
      this.arr.totalPrice = this.sum;
      this.arr.idDirect = this.idDirect;
      axios
        .post("api/order", this.arr)
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success(res.data.msg);
            this.$router.push("/");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    tui(){
      this.$router.push("/shop")
    }
  },
  mounted() {
    this.items = this.$route.query.item;
    console.log(this.items);
    this.$axios
      .req("api/getDefaultAddress")
      .then(res => {
        this.list = res.data.defaultAdd;
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    sum() {//计算总价
      let sum = 0;
      this.items.map(item => {
        sum += item.present_price * item.count;
      });
      return sum;
    },
    num() {//计算总件数
      let num = 0;
      this.items.forEach(item => {
        num += item.count;
      });
      return num;
    }
  },
  watch: {},
  directives: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === "/shop") {
        vm.idDirect = false;

      } else if (from.path === "/details") {
        vm.idDirect = true;

      }
    });
  }



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
  width: 25%;
  border: 1px solid black;
  margin-top: 5%;
  margin-left: 5%;
}
</style>
