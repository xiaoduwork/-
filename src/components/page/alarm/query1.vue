<template>
    <div v-show="bol">
        <el-row :gutter="10" v-loading="listLoading">
            <div id="app">
                <div class="head">
                    <div>
                        <data1 @take="getdata" @reset="onReset"></data1>
                    </div>
                </div>
                <div>
                    <botton></botton>
                </div>
                <div class="term">
                    <el-button
                        class="term-botton"
                        type="primary"
                        icon="el-icon-warning-outline"
                        circle
                        size="mini"
                    ></el-button>
                    条件：所有煤矿{{datas.start}}至{{datas.end}}
                </div>
                <div v-if="msg.list!=''">
                    <excel :path="msg" @send="getpages"></excel>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
import excel from '../../../components/excel/select-excel.vue';
import data1 from '../../../components/menu/dataselect.vue';
import botton from '../../../components/menu/botton.vue';

export default {
    components: {
        excel,
        data1,
        botton
    },
    data() {
        return {
            msg: {
                list: '',
                total: null,
                page: null,
                id: 3,
            },
            page: 0,
            listLoading: false,
            datas: '',
            bol: false
        };
    },
    created() {
        this.handleLogin();
    },
    methods: {
        getpages(res) {
            this.msg.list = '';
            this.page = res;
            this.handleLogin(res);
        },
        onReset() {
            this.datas = '';
            this.handleLogin();
        },
        getdata(res) {
            this.datas = res;
            this.handleLogin();
        },
        async handleLogin(result) {
            this.msg.list = '';
            var datas = { page: this.page, MKName: this.datas.MKName, end: this.datas.end, start: this.datas.start };
            const res = await this.$http.post('/admin/anquanlist', datas);
            if (res.data.code == '200') {
                this.bol = true;
                this.msg.list = res.data.data.data;
                this.msg.total = res.data.data.count;
                this.msg.page = result;
            }
            if (res.data.code == '202') {
                this.$router.push('/403');
            }
        }
    }
};
</script>

<style scoped>
.term-botton{
    margin: 0 10px 0 16px;
}
.term {
    font-size: 14px;
    width: 90%;
    height: 44px;
    line-height: 44px;
    background: #e6f7ff;
    margin: 10px 0 0 36px;
    border-radius: 6px;
}
#app {
    background: #fff;
    width: 90%;
    margin: 10px 0 0 10px;
    height: 750px;
}
.menu_a {
    border: 1px solid #ccc;
    width: 86px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin: auto 4px;
    border-radius: 6px;
}
.menu {
    margin-left: 30px;
    background: #1890ff;
    color: #fff;
    border: none;
}
.head {
    display: flex;
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    margin: 10px 0 0 40px;
}
.head-data {
    margin-left: 20px;
}
</style>