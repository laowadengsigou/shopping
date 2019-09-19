<template>
  <div>
    <div style="display: flex">
      <div style="margin-top: 3%" @click="gos">
        <van-icon name="arrow-left" size="30px" />
      </div>
      <div style="margin-left: 30%;margin-top: 3%;font-size: 20px">
        个人资料
      </div>
    </div>
    <hr />
    <div class="dv">
      <div class="te">头像</div>
      <div><img src="../assets/1.jpg" alt="" class="img" /></div>
      <div class="ri"><van-icon name="arrow" size="30px" /></div>
    </div>
    <hr />
    <div class="box">
      <van-cell-group>
        <van-field
          v-model="list.username"
          label="用户名"
          disabled
          placeholder="请输入用户名"
      /></van-cell-group>
    </div>
    <div class="box">
      <van-cell-group>
        <van-field v-model="list.nickname" label="昵称" placeholder="请输入昵称"
      /></van-cell-group>
    </div>
    <div class="box">
      <van-cell-group>
        <van-field v-model="list.gender" label="性别" placeholder="请输入性别"
      /></van-cell-group>
    </div>
    <div class="box">
      <van-cell-group>
        <van-field v-model="list.mail" label="邮箱" placeholder="请输入邮箱"
      /></van-cell-group>
    </div>
    <div class="box">
      <van-cell-group>
        <van-field
          v-model="date"
          label="出生年月"
          placeholder="请输入时间"
          @click="qqq"
      /></van-cell-group>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <br /><br />
    <div>
      <van-button type="primary" size="large " @click="cun">保存</van-button>
      <van-button type="default" size="large " @click="qu">取消</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Grzl",
  components: {
    axios
  },
  props: {},
  data() {
    return {
      list: [{ mail: "" }],
      time: "",
      show: false,
      date: "",
      currentDate: new Date(),
      item: {
        day: "",
        gender: "",
        month: "",
        nickname: "",
        year: "",
        mail: "",
        id: ""
      },
      year: "",
      month: "",
      day: ""
    };
  },
  methods: {
    gos() {
      this.$router.go(-1);//点击左上角图标返回上一界面
    },
    qqq() {
      this.show = true;//点击时间的时候底部弹出时间选择器
    },
    confirm(val) {
      this.date = this.$momunt(val)
        .format("YYYY年MM月DD日")//转换day.js时间格式,因为不转换是国际时间格式
        .toString();
      this.year = this.$momunt(val)//把年份转换成纯数字，定义一个变量接收
        .format("YYYY")
        .toString();
      this.month = this.$momunt(val)//把月份转换成纯数字，定义一个变量接收
        .format("MM")
        .toString();
      this.day = this.$momunt(val)//把日转换成纯数字，定义一个变量接收
        .format("DD")
        .toString();
      this.show = false;//当有时间选择器时，点击确认保存当前选中时间并关闭时间选择器
    },
    cancel() {
      this.show = false;//时间选择器弹出来时，点击取消，关闭时间选择器
    },
    cun() {
      this.item.year = this.year;//保存当前修改的年份
      this.item.month = this.month;//保存当前修改的月份
      this.item.day = this.day;//保存当前修改的日份
      this.item.gender = this.list.gender;//保存当前修改的性别
      this.item.nickname = this.list.nickname;//保存当前修改的昵称
      this.item.mail = this.list.mail;//保存当前修改的邮箱
      this.item.id = this.list._id;//保存当前修改的id
      console.log(this.item);
      if(this.item === null){//如果没有修改个人信息里面的时间,年月日就是上一次保存的时间,不会再点一次就算空值
        this.item.year = this.list.year
        this.item.month = this.list.month
        this.item.day = this.list.day
      }else {//如果修改了时间，时间就是当前修改的时间
        this.item.year = this.year
        this.item.month = this.month
        this.item.day = this.day
      }
      axios//更改个人信息的接口
        .post("api/saveUser", this.item)
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success("更改成功");
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    qu() {
      this.$axios//点击取消按钮不改变用户信息
        .req("api/queryUser", {})
        .then(res => {
          this.list = res.data.userInfo;
          this.date =
            this.list.year +
            "年" +
            this.list.month +
            "月" +
            this.list.day +
            "日";
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.$axios//获取用户信息
      .req("api/queryUser", {})
      .then(res => {
        this.list = res.data.userInfo;
        console.log(res);
        this.date =
          this.list.year + "年" + this.list.month + "月" + this.list.day + "日";//把国际时间改成容易理解的时间
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
.te {
  width: 30%;
  margin-top: 7%;
}
.img {
  width: 20%;
  border-radius: 50% 50%;
  margin-left: 70%;
}
.ri {
  margin-top: 7%;
}
.dv {
  display: flex;
}
.box {
  margin: 5% 0px;
}
</style>
