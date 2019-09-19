<template>
    <div>
        <div class="box">
            <div style="margin-top: 3%" @click="tui">
                <van-icon name="arrow-left" size="40px" />
            </div>
            <div class="dv">评价详情</div>
        </div>
        <hr>
        <div style="display: flex">
            <div>
                <img :src="user.avatar" alt="" style="width: 100px;">
            </div>
            <div style="margin-left: 20%">
                <div>{{user.nickname}}</div>
                <span style="margin-top: 10%">{{item.comment_time}}</span>
                <div style="margin-top: 40%">
                    <van-rate v-model="item.rate" size="20px"/>
                </div>
            </div>
        </div>
        <div>
            评价内容: {{item.content}}
        </div>
        <hr>
        <div style="display: flex">
            <div>
                <img :src="goods.image_path" alt="" style="width: 100px;">
            </div>
            <div style="margin-top: 10%">
                {{goods.name}}
            </div>
            <div style="margin-top: 15%;margin-left: 5%">
                <van-icon name="shopping-cart-o" size="30px" color="red" @click="go"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Plxq",
        components: {},
        props: {},
        data() {
            return {
                item:[],
                user:{},
                evaluateOne:[],
                goods:{},
            }
        },
        methods: {
            tui(){
                this.$router.push("/pj")
            },
            go(){
                this.$router.push({name:"details",query:{id:this.goods.id}})
            }
        },
        mounted() {
            this.item = this.$route.params.item
            console.log(this.item);
            this.$axios
                .req("api/evaluateOne", {
                    _id: this.item._id
                })
                .then(res => {
                    this.evaluateOne = res.data.evaluateOne
                    this.user = res.data.evaluateOne.user[0]
                    this.goods = res.data.evaluateOne.goods[0]
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
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
