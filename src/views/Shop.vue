<template>
  <div>
    <div>
      <div style="text-align: center;font-size: 25px">
        购物车
      </div>
      <hr />
      <br />
      <div style="display: flex">
        <div style="width: 70%;">
          <input
            type="checkbox"
            v-model="checkAll"
            style="width: 25px;height: 25px;"
            @change="change"
          />
          <span v-if="checkAll === false">全选</span
          ><span v-else>取消全选</span>
        </div>
        <div>
          <div>合计:{{ sum }}</div>
          <div>请确认订单</div>
        </div>
      </div>
      <hr />
      <div style="margin-left:70%">
        <van-button type="danger" @click="dele">删除</van-button>
        <van-button type="danger" style="margin-left: 10px" @click="settle"
          >去结算</van-button
        >
      </div>
      <br />
      <div v-for="(item, index) in shopList">
        <div class="dv2">
          <div class="dv">
            <input
              type="checkbox"
              class="int"
              v-model="item.checked"
              @change="checkOne(item.checked)"
            />
            <img :src="item.image_path" alt="" class="img" />
          </div>
          <div class="dv1">
            <div>{{ item.name }}</div>
            <div class="mou">
              <span>${{ item.present_price * item.count }}</span>
              <span>
                <van-stepper
                  v-model="item.count"
                  input-width="40px"
                  button-size="32px"
                  style="margin-left:140px"
                ></van-stepper>
              </span>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Shop",
  components: { axios },
  props: {},
  data() {
    return {
      shopList: [],
      result: [],
      value: 1,
      checkAll: false,
      products: [],
      dell: [],
      item:[],
      id:""
    };
  },
  methods: {
    checkOne() {
      //单选按钮
      this.checkAll = this.shopList.every(item => {
        return item.checked;
      });
    },
    change() {
      //全选按钮
      this.shopList.map(item => {
        item.checked = this.checkAll;
      });
    },
    dele() {
      //删除按钮
      this.shopList.map(item => {
        if (item.checked === true) {
          //如果物品前面打了勾勾，就是选中了那一项
          this.dell.push(item.cid); //把选中项的cid添加到dell
        }
      });
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除"
        })
        .then(() => {
          axios
            .post("api/deleteShop", this.dell) //删除接口，把刚刚添加到dell的数据删除
            .then(res => {
              console.log(res);
              this.$toast.success("删除成功");
              this.$axios //删除成功后重新渲染页面，删除项就没有了
                .req(`api/getCard`, {})
                .then(res => {
                  console.log(res);
                  this.shopList = res.data.shopList;
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });
        });
    },
    settle() {
      this.shopList.map(item =>{
        if(item.checked === true){
          this.item.push(item)
        }
      });
      this.$router.push({name:"settle",query:{item:this.item}})
      // console.log(this.item);
      // this.$router.push({
        //   name: "settle",
        //   query: { shopList: this.shopList }
        // });
    }
  },
  mounted() {
    this.$axios
      .req(`api/getCard`, {})
      .then(res => {
        this.shopList = res.data.shopList;
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    sum() {
      let sum = 0;
      this.shopList.map(item => {
        if (item.checked) {
          sum += item.present_price * item.count;
        }
      });
      return sum;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.dv {
  width: 40%;
}
.dv1 {
  color: red;
  position: relative;
  right: 20px;
}
.dv2 {
  display: flex;
  border-bottom: 1px solid silver;
  height: 240px;
}
.int {
  width: 40px;
  height: 40px;
  float: left;
  margin-top: 50px;
}
.img {
  width: 60%;
  border: 1px solid silver;
  display: inline-block;
}
.mou {
  margin-top: 100px;
}
</style>
