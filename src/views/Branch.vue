<template>
  <div>
    <div style="text-align: center;">商品分类</div>
    <hr />
    <div class="box">
      <div
        v-for="(item, index) in list"
        :key="item.index"
        class="dv"
        :class="{ cl: ind === index }"
        @click="ba(item, index)"
      >
        {{ item.mallCategoryName }}
      </div>
    </div>
    <div style="float: left;width: 80%;">
      <van-tabs @change="change">
        <van-tab
          v-for="(item, index) in lists"
          :key="item.id"
          :title="item.mallSubName"
        >
          <div v-for="(item, index) in dataList" :key="item.id" @click="good(item)">
            <van-row style="color: red">
              <van-col span="8"
                ><img :src="item.image" alt="" style="width: 100px;"
              /></van-col>
              <van-col span="16">{{ item.name }}</van-col>
              <span
                >${{ item.present_price }}
                <s style="color: #7d7e80">{{ item.orl_price }}</s>
              </span>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Branch",
  components: {},
  props: {},
  data() {
    return {
      item: {},
      index: "",
      list: "",
      activeKey: 0,
      ind: 0,
      active: 2,
      lists: [],
      dataList: "",
      id: ""
    };
  },
  methods: {
    ba(item, index) {
      this.ind = index;
      this.$axios
        .req("api/recommend")
        .then(res => {
          this.lists = res.data.data.category[index].bxMallSubDto;
          console.log(res);
          this.id = this.lists[0].mallSubId;
          this.$axios
            .req(`api/classification?mallSubId=${this.id}`)
            .then(res => {
              console.log(res);
              this.dataList = res.data.dataList;
              console.log(this.dataList);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },
    change(index) {
      this.id = this.lists[index].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.id}`)
        .then(res => {
          this.dataList = res.data.dataList;
          console.log(this.dataList);
        })
        .catch(e => {
          console.log(e);
        });
    },
    good(item){
      this.$router.push({name:"details",query:{id:item.id}})
    }
  },
  mounted() {
    this.item = this.$route.params.item;//首页传过来的值
    this.index = this.$route.params.index;//首页传过来的值
    // console.log(this.index);
    this.$axios
      .req("api/recommend")
      .then(res => {
        this.list = res.data.data.category;
        console.log(res.data.data.category);
      })
      .catch(e => {
        console.log(e);
      });
    if (this.index === undefined) {
      this.$axios
        .req("api/recommend")
        .then(res => {
          this.list = res.data.data.category;
          this.lists = this.list[0].bxMallSubDto;
          this.id = this.lists[0].mallSubId;
          this.$axios
            .req(`api/classification?mallSubId=${this.id}`)
            .then(res => {
              this.dataList = res.data.dataList;
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.ind = this.index;
      this.$axios.req("api/recommend").then(res => {
        this.list = res.data.data.category; //左边五个
        this.lists = this.list[this.index].bxMallSubDto; //上边的
        this.id = this.lists[0].mallSubId; //上边的第一个
        this.$axios
          .req(`api/classification?mallSubId=${this.id}`)
          .then(res => {
            this.dataList = res.data.dataList; //上边4个的第一个的数据
          })
          .catch(e => {
            console.log(e);
          });
      });
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.dv {
  background-color: #f0f3f6;
  width: 150px;
  height: 80px;
}
.dv1 {
  background-color: white;
}
.cl {
  background: white;
}
.box {
  float: left;
}
</style>
