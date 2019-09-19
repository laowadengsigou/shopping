<template>
  <div>
    <div class="box">
      <div style="margin-top: 3%" @click="gos">
        <van-icon name="arrow-left" size="40px" />
      </div>
      <div class="dv">城市选择</div>
    </div>
    <div>
      <van-search
        placeholder="请输入搜索关键词"
        v-model="value"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @keydown.delete="deleteObj"
      />
    </div>
    <City_list v-if="showCity_list === true" :goos="goos"></City_list>
    <div v-else>
      <div>
        <div>当前城市</div>
        <div>{{ $store.state.city }}</div>
      </div>
      <div>
        <div>热门城市</div>
        <div v-for="(item, index) in hotCities">
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
      <div>
        <van-index-bar class="DW__dw">
          <div v-for="(item, index) in CityName.cities" :key="index">
            <van-index-anchor :index="index" />
            <div v-for="(item1, index1) in item" :key="index1">
              <van-cell :title="item1.name" />
            </div>
          </div>
        </van-index-bar>
      </div>
    </div>
    <!--        <div>-->
    <!--            <div>当前城市</div>-->
    <!--            <div>{{$store.state.city}}</div>-->
    <!--        </div>-->
    <!--        <div>-->
    <!--            <div>热门城市</div>-->
    <!--            <div v-for="(item,index) in hotCities">-->
    <!--                <div>-->
    <!--                    {{item.name}}-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
    <!--        <div>-->
    <!--            <van-index-bar class="DW__dw">-->
    <!--                <div v-for="(item,index) in CityName.cities" :key="index">-->
    <!--                    <van-index-anchor :index="index" />-->
    <!--                    <div v-for="(item1,index1) in item" :key="index1">-->
    <!--                        <van-cell :title="item1.name"/>-->
    <!--                    </div>-->
    <!--                </div>-->

    <!--            </van-index-bar>-->
    <!--        </div>-->
  </div>
</template>

<script>
import cityName from "../js/city";
import City_list from "../components/City_list";
export default {
  name: "Dw",
  components: {
    City_list
  },
  props: {},
  data() {
    return {
      value: "",
      CityName: {},
      hotCities: [],
      list: [],
      goos: [],
      goos1: [],
      showCity_list: false
    };
  },
  methods: {
    gos() {
      this.$router.go(-1);
    },
    onSearch() {
      this.showCity_list = true;
    },
    onCancel() {
      this.showCity_list = false;
      this.goos = this.goos1;
    },
    deleteObj() {
      //键盘事件，点击键盘上的回退按钮，使goos返回最初有900多项的时候
      this.goos = this.goos1;
    }
  },
  mounted() {
    this.CityName = cityName.data;
    for (let i in this.CityName.cities) {
      this.list.push(this.CityName.cities[i]);
    }
    console.log(this.list);
    this.list.forEach(item => {
      item.forEach(item1 => {
        this.goos.push(item1); //把所有的城市放到goo这个数组中
      });
    });
    this.goos1 = this.goos; //把goos里面的数据储存到goos1,当需要将goos变回原来的900多项时可以使用
    console.log(this.goos);
    this.hotCities = cityName.data.hotCities;
    console.log(this.CityName);
    console.log(this.$store.state.city);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    value(val) {
      //val是value变化后的值，也是输入框中的值
      this.goos = this.goos.filter(item => {
        return JSON.stringify(item).indexOf(val) !== -1;
      });
      console.log(this.goos);
    }
  },
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
