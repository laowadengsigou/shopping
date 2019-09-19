<template>
  <div>
    <van-address-edit
            v-if="this.$route.query.item"
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      :address-info="item"
    />
      <van-address-edit
              :area-list="areaList"
              show-delete
              show-set-default
              show-search-result
              :search-result="searchResult"
              @save="onSave"
              @delete="onDelete"
              v-else
      />
  </div>
</template>

<script>
import areaList from "../js/area";
import axios from "axios";
export default {
  name: "Newly",
  components: {},
  props: {},
  data() {
    return {

      areaList: areaList,
      searchResult: [],
        item: { }
    };
  },
  methods: {
    onSave(name) {//保存按钮
      this.$toast("保存成功");
      console.log(name);
      let str = name.province + name.city + name.county + name.addressDetail;//地址的拼接
      axios
        .post("api/address", {
          name: name.name,
          tel: name.tel,
          address: str,
          addressDetail: name.addressDetail,
          isDefault: name.isDefault,
          areaCode: name.areaCode,
          province: name.province,
          city: name.city,
          county: name.county,
          id:name._id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast.success(res.data.msg);//修改或添加成功的轻提示
          }
          this.$router.push("address")
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    onDelete() {//删除点击事件
      this.$axios.req("api/deleteAddress",{id:this.item._id}).then(res=>{//删除接口，传的是点击的那一项的_id,item就是点击的那一项的数据
        this.$router.push("/my")
        console.log(res);
      }).catch(e=>{
        console.log(e);
      })

    }
  },
  mounted() {
      this.item = this.$route.query.item//接收新增地址传过来的item
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
