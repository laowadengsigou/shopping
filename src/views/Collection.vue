<template>
  <div>
    <div>
      <div class="dv">
        <span @click="out">←</span>
        <span style="margin-left: 40%">商品收藏</span>
      </div>
      <hr />
      <div v-if="list.length === 0">你还没有收藏哦，赶快去收藏</div>
      <div v-for="(item, index) in list" v-else>
        <div style="margin-left: 5%">
          <img :src="item.image_path" alt="" class="img" />
          <span style="float: right">
            <div>
              {{ item.name }}
            </div>
            <div style="margin-top: 10%;color: red">
              ￥{{ item.present_price }}
            </div>
            <div class="X" @click="dele(index)">
              ⓧ
            </div>
          </span>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Collection",
  components: {
  },
  props: {},
  data() {
    return {
      list: ""
    };
  },
  methods: {
    out(){
      this.$router.go(-1)
    },
    dele(index) {
        console.log(this.list[index].cid);
        this.$axios
        .req("api/cancelCollection", {
          id: this.list[index].cid
        })
        .then(res => {
          this.$toast.success(res.data.msg);
          this.$axios
            .req("api//collection/list")
            .then(res => {
              this.list = res.data.data.list;
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.$axios
      .req("api//collection/list")
      .then(res => {
        this.list = res.data.data.list;
        console.log(res);
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
.dv {
  margin-top: 3%;
}
.img {
  width: 30%;
  border: 1px solid black;
}
.X {
  margin-left: 80%;
  margin-top: 10%;
}
</style>
