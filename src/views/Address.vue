<template>
  <div>
    <div class="box">
      <div style="margin-top: 3%" @click="gos">
        <van-icon name="arrow-left" size="40px" />
      </div>
      <div class="dv">地址列表</div>
    </div>
    <hr />
    <div v-if="list.length === 0" class="te">暂无收获地址~~~</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="Newly"
      @edit="edit"
      @select="select"
    />
  </div>
</template>

<script>
export default {
  name: "Address",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      list: []
    };
  },
  methods: {
    gos(){
      this.$router.go(-1)
    },
    Newly() {//点击新增按钮时触发
      this.$router.push("/newly");
    },
    edit(item, index) {//点击编辑按钮时触发
      this.$router.push({ name: "newly", query: { item: item } });//跳转到编辑界面，并传当前点击的编辑项的数据item过去
    },
    select(item){
      console.log(item)
      this.$axios.req("api/setDefaultAddress",{id:item._id}).then(res=>{//设置默认地址的接口,传的_id是点击编辑那一项的_id,item就是点击的那一项
        this.$toast("设置默认地址成功");
        console.log(res);
      }).catch(e=>{
        console.log(e);
      })
    }
  },
  mounted() {
    this.$axios
      .req("api/getAddress")//查询用户收货地址的接口
      .then(res => {
        this.list = res.data.address;
        this.list.forEach((item,index)=>{
          item.id = index//设置当前项item的id等于下标
          if(item.isDefault === true){//如果当前项里面的isDefault时true，就算默认收货地址，那么chosenAddressId就亮，chosenAddressId就时默认收货地址，就算前面的勾勾
            this.chosenAddressId = index
          }
        })
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios.req("api/getDefaultAddress").then(res=>{
      console.log(res);
    }).catch(e=>{
      console.log(e);
    })
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
.te {
  font-size: 50px;
  text-align: center;
  opacity: 0.4;
  margin-top: 20%;
}
</style>
