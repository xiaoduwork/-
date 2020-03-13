<template>
<div v-show="bol">
    <el-card class="box-card" style="width:92%；height：720px;">
        <el-form ref="form" :model="formInline" label-width="90px" style="display:inline-block;">
            <el-form-item label="选择煤矿：">
                <el-select v-model="formInline.name" placeholder="全部">
                    <el-option label="森泰煤业" value="森泰煤业"></el-option>
                    <el-option label="金亿煤业" value="金亿煤业"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div class="block" style="display:inline-block;margin-left:4%;">
            <span class="demonstration">日期区间：</span>
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>

        <el-form ref="form" :model="formInline" label-width="90px" style="display:inline-block;margin-left:5%;">
            <el-form-item label="报表类型：">
                <el-select v-model="formInline.project" placeholder="请选择">
                    <el-option label="日报表" value="Day"></el-option>
                    <el-option label="月报表" value="Month"></el-option>
                    <el-option label="年报表" value="Year"></el-option>

                </el-select>
                <el-button type="primary" @click="onSubmit" style="margin-left:10px;">查询</el-button>
                <el-button @click="onReset">重置</el-button>
                <el-button type="text">展开</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-button type="primary">预览</el-button>
            <el-button>打印</el-button>
            <el-button>导出</el-button>
        </div>
        <div v-if="result!=''">
            <tab :path="result"></tab>
        </div>

    </el-card>
</div>
</template>

<script>
import tab from '../../tab/tab_2';

export default {
    components: {
        tab
    },
    data() {
        return {
            formInline: {
                name: '',
                project: ''
            },

            value1: '',
            result: '',
            bol:false
        };
    },

    methods: {
        async pepo_tab() {
            const res = await this.$http.post('/admin/cljc');
            if (res.data.code == '200') {
                this.bol = true;
                this.result = res.data.data.data;
            }
            if (res.data.code == '202') {

                this.$router.push('/403');
            }
        },
        async onSubmit() {
            // 开始时间
            var old = this.value1[0];
            var year = old.getFullYear();
            var month = (old.getMonth() + 1).toString();
            var day = (old.getDate()).toString();
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }
            var oldTime = year + '-' + month + '-' + day;
            // 结束时间
            var now = this.value1[1];
            var now_year = now.getFullYear();
            var now_month = (now.getMonth() + 1).toString();
            var now_day = (now.getDate()).toString();
            if (now_month.length == 1) {
                now_month = "0" + now_month;
            }
            if (now_day.length == 1) {
                now_day = "0" + now_day;
            }
            var nowTime = now_year + '-' + now_month + '-' + now_day;
            var datas = {
                MKName: this.formInline.name,
                start: oldTime,
                end: nowTime,
                lei: this.formInline.project
            }
            const res = await this.$http.post('/admin/cljc', datas);
            if (res.data.code == '200') {
                this.result = res.data.data.data;

            }

        },
        onReset() {
            this.pepo_tab()
        }
    },
    mounted() {
        this.pepo_tab();
    }
};
</script>

<style scoped>
.box-card {
    margin: 2%;
}

.contents {
    border: 1px solid #000;
    padding: 20px;
    margin: 20px;
}
</style>
