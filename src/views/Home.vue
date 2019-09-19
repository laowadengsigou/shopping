<template>
  <div style="background-color: #F0F3F6">
    <div class="din">
      <van-row>
        <van-col span="6" class="dv">
          <div @click="di">{{ $store.state.city }}▼</div>
        </van-col>
        <van-col span="16">
          <van-search
            placeholder="请输入搜索关键词"
            v-model="value"
            @click="Search"
          />
        </van-col>
      </van-row>
    </div>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in img" :key="item.image">
          <img :src="item.image" alt="" class="img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <br />
    <van-row type="flex" justify="center">
      <div
        class="box"
        v-for="(item, index) in list"
        :key="item.id"
        @click="fen(item, index)"
      >
        <van-col span="5">
          <img :src="item.image" alt="" style="width: 450%;" />
          <div class="hi">
            {{ item.mallCategoryName }}
          </div>
        </van-col>
      </div>
    </van-row>
    <br />
    <div>
      <img :src="goin.PICTURE_ADDRESS" alt="" style="width:100%;" />
    </div>
    <br />
    <div style="background-color: white">
      <div>商品推荐</div>
      <van-row>
        <div class="wrapper" ref="wrapper">
          <ul class="content">
            <li v-for="item in goto">
              <img
                :src="item.image"
                alt=""
                style="width: 100%;border-left: 1px solid #8a8a8a; border-top: 1px solid #8a8a8a "
              />
              <div class="name">{{ item.goodsName }}</div>
              <div>
                ￥{{ item.mallPrice }}
                <s>￥{{ item.price }}</s>
              </div>
              <div class="dev">
                <div>
                  <van-icon
                    name="cart"
                    size="23px"
                    color="orange"
                    class="shop"
                  />
                </div>
                <div>
                  <van-button type="warning" @click="fo1(item.goodsId)"
                    >点击查看</van-button
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-row>
    </div>
    <br />
    <div>
      <div class="fot">
        <span class="fot1">F1</span>
        <span class="fot2">{{ floorName.floor1 }}</span>
      </div>
      <br />
      <van-row>
        <div class="thing">
          <div
            v-for="(item, index) in hello"
            :key="item.goodsId"
            class="floorgoods"
          >
            <img
              :src="item.image"
              alt=""
              style="width:100%;"
              @click="fo1(item.goodsId)"
            />
          </div>
        </div>
      </van-row>
      <br />
      <div class="fot">
        <span class="fot1">F2</span>
        <span class="fot2">{{ floorName.floor2 }}</span>
      </div>
      <br />
      <van-row>
        <div class="thing">
          <div
            v-for="(item, index) in good"
            :key="item.goodsId"
            class="floorgoods"
          >
            <img
              :src="item.image"
              alt=""
              style="width:100%;"
              @click="fo1(item.goodsId)"
            />
          </div>
        </div>
      </van-row>
      <br />
      <div class="fot">
        <span class="fot1">F3</span>
        <span class="fot2">{{ floorName.floor3 }}</span>
      </div>
      <br />
      <van-row>
        <div class="thing">
          <div
            v-for="(item, index) in goods"
            :key="item.goodsId"
            class="floorgoods"
          >
            <img
              :src="item.image"
              alt=""
              style="width:100%;"
              @click="fo1(item.goodsId)"
            />
          </div>
        </div>
      </van-row>
      <br />
      <div class="fot4">热销商品</div>
      <br />
      <van-row>
        <div class="thing">
          <div
            v-for="item in hotGoods"
            class="hotgoods"
            @click="fo1(item.goodsId)"
          >
            <img :src="item.image" alt="" style="width: 100%;" />
            <p class="hotgoodsname">
              {{ item.name }}
            </p>
            <p class="hotgoodsprice">
              {{ item.mallPrice }}
              <s>{{ item.price }}</s>
            </p>
          </div>
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      img: [],
      list: "",
      goin: "",
      goto: "",
      hello: "",
      floorName: "",
      good: "",
      goods: "",
      hotGoods: ""
    };
  },
  methods: {
    fo1(id) {
      console.log(id);
      this.$router.push({ name: "details", query: { id: id } });
    },
    fen(item, index) {
      this.$router.push({ name: "branch", params: { item, index } });
    },
    Search() {
      this.$router.push("/search");
    },
    di() {
      this.$router.push("/dw");
    }
  },
  mounted() {
    let _this = this;
    this.$axios
      .req("api/recommend")
      .then(res => {
        console.log(res);
        if (res) {
          this.img = res.data.data.slides;
          this.list = res.data.data.category;
          this.goin = res.data.data.advertesPicture;
          this.goto = res.data.data.recommend;
          this.hello = res.data.data.floor1;
          this.good = res.data.data.floor2;
          this.goods = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
          console.log(this.list);
        }
      })
      .catch(e => {
        console.log(e);
      });
    this.$nextTick(() => {
      new BScroll(this.$refs.wrapper, {
        scrollX: true,
        startX: true,
        scrollY: false,
        startY: false
      });
    });
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        _this.$store.state.city = data.addressComponent.city;
        console.log(data);
      }

      function onError(data) {
        // 定位出错
      }
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {

  },
  directives: {}
};
</script>

<style scoped lang="scss">
.thing {
  background-color: white;
}
.floorgoods {
  width: 49%;
  float: left;
  display: flex;
  border: 1px solid #8a8a8a;
}

.dv {
  margin-left: 10px;
  margin-top: 15px;
}
.dv1 {
  margin-left: 10px;
  margin-top: 15px;
}
.img {
  width: 99%;
}
.box {
  width: 90%;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 28px;
}
.wrapper {
  width: 100%;
  overflow: hidden;
}
.content {
  display: flex;
  width: 575%;
}
.name {
  background-color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 130px;
}
.hi {
  width: 120px;
}
.dev {
  display: flex;
}
.shop {
  width: 50px;
  background-color: #d2591b;
  margin-top: 1px;
}
.img1 {
  width: 50%;
  float: left;
}
.fot {
  text-align: center;
}
.fot1 {
  background-color: red;
  border-radius: 50%;
  color: white;
}
.fot2 {
  color: red;
}
.fot4 {
  text-align: center;
  color: red;
}
.hotgoods {
  width: 49%;
  border: 1px solid #e1e1e1;
  float: left;
  background-color: white;
}
.hotgoodsname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #ff3211;
  text-align: center;
  margin: 0;
}
.hotgoodsprice {
  font-size: 30px;
  margin: 0px;
  text-align: center;
  font-weight: bold;
  color: red;
}
</style>
