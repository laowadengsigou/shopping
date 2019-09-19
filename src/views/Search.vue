<template>
  <div>
    <div class="din">
      <van-row>
        <van-col span="20">
          <van-search placeholder="请输入搜索关键词" v-model="value" @blur="bl"/>
        </van-col>
        <van-col span="4" class="dv">
          <div @click="gos">
            取消
          </div>
        </van-col>
      </van-row>
    </div>
    <div v-if="this.value !== ''">
      <div v-for="(item,index) in list">
        <div @click="good(item)">{{item.name}}</div>
      </div>
    </div>
    <div v-else style="display: flex">
      <div>
        <div>
          历史记录
        </div>
        <div v-for="(item,index) in arr1">
          {{item}}
        </div>
      </div>
      <div style="margin-left: 50%">清空历史记录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  components: {},
  props: {},
  data() {
    return {
      value: "",
        list:[],
      arr1:[]
    };
  },
  methods: {
      good(item){
          this.$router.push({name:"details",query:{id:item.id}})
        //历史记录
        let arr1 = JSON.parse(localStorage.arr1)
        arr1.push(this.value)
        localStorage.setItem("arr1",JSON.stringify(arr1))
      },
      gos(){
          this.$router.go(-1)
      },
    bl(){

    }
  },
  mounted() {
    this.arr1 = JSON.parse(localStorage.getItem("arr1"))
    console.log(this.arr1);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    value(val) {
      if (val !== "") {
        this.$axios
          .req("api/search", {
            value: val
          })
          .then(res => {
              if(res.data){
                  this.list = res.data.data.list
                  console.log(this.list);
              }
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss"></style>
