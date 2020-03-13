<template>
    <div>
        <el-row v-loading="loading" :class="loading ? 'success':'secondary'"></el-row>
        <div id="app" v-show="bol">
            <div class="group-name">
                山西朔州平鲁区森泰煤业有限公司监测平台
                <el-button class="large" type="primary" @click="large">进入大屏</el-button>
            </div>
            <div>
                <el-row
                    :gutter="10"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.7)"
                >
                    <groupitemone></groupitemone>
                    <groupitemtwo @taken="gettoken"></groupitemtwo>
                    <groupitemthree></groupitemthree>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import groupitemone from '../../../components/group/group_item_a';
import groupitemtwo from '../../../components/group/group_item_b';
import groupitemthree from '../../../components/group/group_item_c';

export default {
    components: {
        groupitemone,
        groupitemtwo,
        groupitemthree
    },
    data() {
        return {
            loading: false,
            bol: true
        };
    },
    created() {},
    methods: {
        gettoken(res) {
            this.loading = res.loading;
            this.bol = res.bol;
        },
        large() {
            this.$router.push('/large_sentai');
        }
    },

    mounted() {
        // this.loading = false;
    }
};
</script>

<style scoped>
.success {
    height: 700px;
}
.secondary {
    display: none;
}
#app {
    height: 820px;
    background: #0c1b52;
    position: relative;
}
.large {
    top: 10px;
    right: 30px;
    position: absolute;
}
.group-name {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    background: #09279d;
    margin-bottom: 10px;
}
</style>