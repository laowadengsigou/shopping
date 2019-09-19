<template>
  <div>
    <div>
      <img :src="list.image" alt="" class="img" v-if="list" />
    </div>
    <div>
      <div v-if="list">{{ list.name }}</div>
      <div class="mou" v-if="list">￥{{ list.present_price }}</div>
    </div>
    <div>
      <br />
      <van-row>
        <van-col span="8" style="margin-top: 13px;opacity: .4" v-if="list"
          >运费:{{ list.__v }}</van-col
        >
        <van-col span="8" style="margin-top: 13px;opacity: .4" v-if="list"
          >剩余:{{ list.amount }}</van-col
        >
        <span v-if="flag === false">
          <van-col span="8" style=";opacity: .4"
            >收藏:<van-icon
              name="like-o"
              size="30px"
              style="margin-left: 10px;"
              @click="shou"
          /></van-col>
        </span>
        <span v-else>
          <van-col span="8" style=";opacity: .4"
            >取消收藏:<van-icon
              name="like-o"
              color="red"
              size="30px"
              style="margin-left: 10px;"
              @click="shous"
          /></van-col>
        </span>
      </van-row>
    </div>
    <hr />
    <hr />
    <div>
      <div style="float: left">
        <img src="../assets/店铺.png" alt="" style="width: 30px;float: left" />
        <span style="margin-left: 5px">有赞的店</span>
        <van-button type="danger" style="margin-left: 5px">官方</van-button>
      </div>
      <div style="float: right">
        <span>进入店铺</span>
        <span>></span>
      </div>
    </div>
    <br />
    <br />
    <hr />
    <hr />
    <div class="flx">
      <van-tabs v-model="active">
        <van-tab title="商品评论">
          <div v-for="(item, index) in comment">
            <div style="display: flex">
              <div>
                <img :src="item.user[0].avatar" alt="" style="width: 100px;" />
              </div>
              <div>
                <div>
                  {{ item.user[0].nickname }}
                </div>
                <div>
                  <van-rate v-model="item.rate" />
                </div>
                <div>评论:{{ item.content }}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="商品详情">
          <div v-html="list.detail"></div>
        </van-tab>
      </van-tabs>
    </div>
    <br />
    <div class="re">
      <div style="background-color: white">
        <div>
          <img src="../assets/xin.png" alt="" style="width: 30px;" />
          <img
            src="../assets/购物车.png"
            alt=""
            style="width: 30px;margin-left:30px"
          />
        </div>
        <div>
          <span>客服</span>
          <span style="margin-left: 20px;">购物车</span>
        </div>
      </div>
      <div style="width:45%;">
        <van-button
          style="height:100%;width:80%;background-color: #d2591b;color: white;float: left"
          @click="shop"
        >
          加入购物车
        </van-button>
        <van-button
          style="height:100%;width:80%;background-color:red;color: white;margin-right:-100%"
          type="primary"
          @click="showPopup"
        >
          立即购买
        </van-button>
        <van-popup  v-model="show"
                    position="bottom"
                    :style="{ height: '40%' }">
          <div style="display: flex">
            <div>
              <img :src="list.image" alt="" style="width: 120px;">
            </div>
            <div style="margin-top: 10%">
              <div v-if="list">{{ list.name }}</div>
              <div class="mou" v-if="list">￥{{ list.present_price }}</div>
            </div>
            <van-icon name="cross" style="position: fixed;right: 0px" @click="xi"/>
          </div>
          <hr>
          <div style="display: flex">
            <div style="width: 60%;">购买数量:
              <div style="margin-top: 5%">
                <span>剩余100000件</span>
                <span style="color: red;margin-left: 3%">每人限购50件</span>
              </div>
            </div>
            <div style="margin-left: 5%">
              <van-stepper v-model="value" button-size="50px"/>
            </div>
          </div>
          <hr>
          <van-button type="danger" size="large" style="position: fixed;bottom: 0px" @click="gm">立即购买</van-button>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  components: {
    axios
  },
  props: {},
  data() {
    return {
      id: "",
      list: "",
      active: 2,
      flag: false,
      arr: [],
      item: [],
      comment: {},
      show: false,
      value:1
    };
  },
  methods: {
    gm(){
      this.list.cid = this.list.id
      this.list.count = this.value
      this.$router.push({name:"settle",query:{item:[this.list]}})
    },
    shop() {
      this.$axios
        .req("api/addShop", {
          id: this.id
        })
        .then(res => {
          console.log(res);
          if (res.data.code === -1) {
            this.$toast.fail("请登陆");
            this.$router.push("/my");
          }
          if (res.data.code === 200) {
            this.$toast.success("加入购物车成功");
            // this.$router.push({name:"shop",query:{id:this.id}})
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    shou() {
      this.flag = true;
      axios
        .post("api/collection", this.list)
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success("收藏成功");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    shous() {
      this.flag = false;
      axios
        .post("api/cancelCollection", {
          id: this.id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success("成功取消收藏");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    showPopup() {
      this.show = true;
    },
    xi(){
      this.show = false;
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$axios
      .req("api/goods/one?id=" + this.id)
      .then(res => {
        console.log(res);
        this.comment = res.data.goods.comment;
        this.list = res.data.goods.goodsOne;
        this.item = res.data.goods;
        console.log(res.data.goods.goodsOne);
        (this.arr = JSON.parse(localStorage.getItem("arr"))),
          this.arr.push(this.item);
        localStorage.setItem("arr", JSON.stringify(this.arr));
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios
      .req("api/isCollection", {
        id: this.id
      })
      .then(res => {
        console.log(res);
        if (res.data.isCollection === 1) {
          this.flag = true;
        } else {
          this.flag = false;
        }
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
.img {
  width: 100%;
}
.mou {
  color: red;
}
.flx {
}
.re {
  bottom: 0px;
  display: flex;
}
</style>
