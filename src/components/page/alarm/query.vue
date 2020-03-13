<template>
    <div v-show="bol">
        <el-row :gutter="10" v-loading="listLoading">
            <div id="app">
                <div class="head">
                    <div>选择煤矿：</div>
                    <div class="select">
                        <el-form ref="form">
                            <el-form-item>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="head-data">日期：</div>
                    <div class="block">
                        <el-time-picker
                            is-range
                            v-model="value1"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围"
                        ></el-time-picker>
                    </div>
                    <div class="polling">
                        <el-button type="primary" @click="about">查询</el-button>
                        <el-button plain @click="onReset">重置</el-button>
                    </div>
                </div>
                <!-- <div class="head">
                    <div>
                        <data1 @take="getdata" @reset="onReset"></data1>
                    </div>
                </div>-->
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
// import data1 from '../../../components/menu/dataselect.vue';
import botton from '../../../components/menu/botton.vue';
import { log } from 'util';
export default {
    components: {
        excel,
        // data1,
        botton
    },
    data() {
        return {
            msg: {
                list: '',
                total: null,
                id: 3,
                page: 0
            },
            bol: false,
            page: 0,
            listLoading: false,
            datas: '',
            value1: '',
            options: [
                {
                    value: '森泰煤矿'
                },
                {
                    value: '金亿煤业'
                }
            ],
            value: '',
            end: '',
            start: ''
        };
    },
    created() {
        this.handleLogin();
    },
    methods: {
        about() {
            var end = new Date(this.value1[0]);
            var start = new Date(this.value1[1]);
            this.end = end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds();
            this.start = start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
            this.handleLogin();
        },
        getpages(res) {
            this.msg.list = '';
            this.page = res;
            this.handleLogin(res);
        },
        onReset() {
            this.value= '',
            this.value1= '',
            
            this.handleLogin();
        },
        getdata(res) {
            this.datas = res;
            this.handleLogin();
        },
        async handleLogin(result) {
            this.msg.list = '';
            var datas = { page: this.page, MKName: this.value, end: this.end, start: this.start };
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
.term-botton {
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
    height: 730px;
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
.polling,
.head-data {
    margin-left: 20px;
}
.select {
    margin-top: 14px;
}
</style>