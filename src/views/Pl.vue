<template>
  <div>
    <div class="box">
      <div style="margin-top: 3%" @click="tui">
        <van-icon name="arrow-left" size="40px" />
      </div>
      <div class="dv">评介中心</div>
    </div>
    <hr />
    <div style="display: flex">
      <div>
        <img :src="item.image_path" alt="" style="width: 150px;" />
      </div>
      <div>
        <div>
          商品评分
        </div>
        <div>
          <van-rate v-model="value" size="30px" style="margin-top: 40%" />
        </div>
      </div>
    </div>
    <div>
      <textarea name="" id="" cols="45" rows="10" v-model="text"></textarea>
    </div>
    <div><input type="checkbox" v-model="isComment" @click="ni"/>匿名评价</div>
    <van-button type="primary" size="large" @click="ti">提交</van-button>
  </div>
</template>

<script>
    import axios from "axios"
export default {
  name: "Pl",
  components: {},
  props: {},
  data() {
    return {
      item: [],
      value: 5,
      isComment: false,
        text:"",
        obj:{}
    };
  },
  methods: {
    tui() {
      this.$router.go(-1);
    },
      ni(){
        this.isComment = true
      },
      ti(){
        this.obj.anonymous = this.isComment
          this.obj.content = this.text
          this. obj.id = this.item.cid
          this.obj.image = []
          this.obj.order_id = this.item.order_id
          this.  obj.rate = this.value
          this.obj._id = this.item._id
          axios.post("api/goodsOne/comment",
              this.obj
          ).then(res=>{
              if(res.data.code === 200){
                  this.$toast.success(res.data.msg);
                  this.$router.push("/pj")
              }
              console.log(res);
          }).catch(e=>{
              console.log(e);
          })
      }
  },
  mounted() {
    this.item = this.$route.params.item;
    console.log(this.item);

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
</style>
