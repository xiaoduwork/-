<template>
    <div>
        <div class="main">
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
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </div>
            <div class="polling">
                <el-button type="primary" @click="about">查询</el-button>
                <el-button plain @click="onReset">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: '',
            options: [
                {
                    value: '森泰煤矿'
                },
                {
                    value: '金亿煤业'
                }
            ],
            value: ''
        };
    },
    methods: {
        onReset() {
            this.value1 = '';
            (this.value = ''), this.$emit('reset');
        },
        //查询
        about() {
            // 开始时间
            var old = this.value1[0];
            var year = old.getFullYear();
            var month = (old.getMonth() + 1).toString();
            var day = old.getDate().toString();
            if (month.length == 1) {
                month = '0' + month;
            }
            if (day.length == 1) {
                day = '0' + day;
            }
            var oldTime = year + '-' + month + '-' + day;
            // 结束时间
            var now = this.value1[1];
            var now_year = now.getFullYear();
            var now_month = (now.getMonth() + 1).toString();
            var now_day = now.getDate().toString();
            if (now_month.length == 1) {
                now_month = '0' + now_month;
            }
            if (now_day.length == 1) {
                now_day = '0' + now_day;
            }
            var nowTime = now_year + '-' + now_month + '-' + now_day;
            var datas = {
                MKName: this.value,
                start: oldTime,
                end: nowTime
            };
            this.$emit('take', datas);

        }
    },
    created() {}
};
</script>

<style scoped>
.main {
    display: flex;
}
.polling,
.head-data {
    margin-left: 20px;
}
.select {
    margin-top: 14px;
}
</style>