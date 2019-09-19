<template>
  <div class="ba">
    <div class="card">
      <div style="font-size: 25px">登陆/注册</div>
      <br /><br />
      <div>
        <van-cell-group>
          <van-field
            v-model="form.username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('question')"
          />

          <van-field
            v-model="form.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-field label="手机号" placeholder="仅注册需要" />
          <van-cell-group>
            <van-field
              center
              clearable
              label="短信验证码"
              placeholder="仅注册需要"
            >
              <van-button slot="button" size="small" type="primary"
                >发送验证码</van-button
              >
            </van-field>
          </van-cell-group>
        </van-cell-group>
        <van-cell-group>
          <div style="display: flex">
            <van-field
              v-model="form.sms"
              center
              clearable
              label="验证码"
              placeholder="请输入验证码"
              style="width: 60%;"
            >
            </van-field>
            <div
              v-html="form.code"
              @click="codes"
              style="text-align: center"
            ></div>
          </div>
        </van-cell-group>
        <br /><br />
        <div style="text-align: center">
          <van-button type="primary" @click="home">登陆</van-button>
          <van-button type="danger" style="margin-left: 10px" @click="Register"
            >注册</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Land",
  components: {},
  props: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
        sms: "",
        code: ""
      }
    };
  },
  methods: {
    codes() {
      this.$axios
        .req("/api/verify")
        .then(res => {
          // console.log(res);
          this.form.code = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    Register() {
      this.$axios
        .req("api/register", {
          nickname: this.form.username,
          password: this.form.password,
          verify: this.form.sms
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success("注册成功");
            let user = res.data.userInfo;
            this.$store.state.user = user;
            localStorage.setItem("user", JSON.stringify(res.data.userInfo));
            this.$store.state.user = res.data.userInfo
            this.$router.push("/");
          }
          if (res.data.code === -1) {
            this.$toast.fail(res.data.msg);
            this.form.username = "";
            this.form.password = "";
            this.form.sms = "";
          }
          if (res.data.code === -2) {
            this.$toast.fail("验证码错误");
          }
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    home() {
      this.$axios
        .req("api//login", {
          nickname: this.form.username,
          password: this.form.password,
          verify: this.form.sms
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            this.$toast.success("登陆成功");
            localStorage.setItem("user", JSON.stringify(res.data.userInfo));
            this.$store.state.user = res.data.userInfo
            this.$router.push("/");
          }
          if (res.data.code === -1) {
            this.$toast.fail(res.data.msg);
            this.form.username = "";
            this.form.password = "";
            this.form.sms = "";
          }
          if (res.data.code === -2) {
            this.$toast.fail("验证码错误");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.$axios
      .req("/api/verify")
      .then(res => {
        // console.log(res);
        this.form.code = res.data;
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
.ba {
  background-image: url("../assets/1.jpg");
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
}
.card {
  background-color: white;
  width: 90%;
  height: 40%;
  margin: 20% auto;
  opacity: 1;
}
</style>
