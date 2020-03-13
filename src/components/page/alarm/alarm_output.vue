<template>
    <div class="tab" v-show="bol">
        <div class="tabs">
            <div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="森泰煤业" name="first">
                        <div v-if="msg.list!=''">
                            <excel class="excel" :path="msg" @send="getpage"></excel>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="照金矿业" name="second">
                        <div v-if="msg.list!=''">
                            <excel class="excel" :path="msg" @send="getpage"></excel>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="大金河煤业" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="大金河煤业" name="fourth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="安瑞公司" name="sixth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="天成煤业" name="seventh">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="天成煤业" name="eighth">定时任务补偿</el-tab-pane>
                    <el-tab-pane label="天成煤业" name="nineth">定时任务补偿</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="frame">
            <frame />
        </div>
    </div>
</template>
<script>
import excel from '../../../components/excel/select-excel.vue';
import frame from '../../../components/menu/frame.vue';
export default {
    components: {
        excel,
        frame
    },
    data() {
        return {
            msg: {
                list: '',
                total: null,
                id: 3,
                page: 0
            },
            activeName: 'first',
            bol: false,
            page: 0
        };
    },
    created() {
        this.handleLogin();
    },
    methods: {
        getpage(res) {
            this.msg.list = '';
            this.page = res;
            this.handleLogin(res);
        },
        handleClick(tab, event) {
            //通过index判断来获取数据
        },
        async handleLogin(result) {
            this.msg.list = '';
            var datas = { page: this.page };
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
.tab {
    height: 100%;
    position: relative;
}
.tabs {
    width: 90%;
    background: #fff;
    margin-left: 10px;
}
.frame {
    position: absolute;
    bottom: 4px;
    right: 0;
}
.tabs > div {
    margin: 10px 0 0 40px;
    padding: 10px 0;
}
.excel {
    margin-left: -36px;
}
.term1 {
    margin: -10px 0 4px -36px;
}
</style>