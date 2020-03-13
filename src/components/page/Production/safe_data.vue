<template>
<div>
    <el-card class="box-card" style="width:80%">
        <el-form ref="form" label-width="90px" style="display:inline-block;">
            <el-form-item label="选择煤矿：">
                <el-select v-model="formInline.Code" placeholder="请选择">
                    <el-option v-for="(item, index) in formInline" :key="index" :label="item.MK_Char" :value="item.Code"></el-option>

                </el-select>
            </el-form-item>

        </el-form>
        <!-- <div class="block" style="display:inline-block;margin-left:4%;">
            <span class="demonstration">日期：</span>
            <el-date-picker v-model="value1" type="date" placeholder="请选择" style="width:140px;">
            </el-date-picker>
        </div> -->

        <div class="block" style="display:inline-block;margin-left:24%;">

            <el-date-picker v-model="value1" type="year" placeholder="选择年">
            </el-date-picker>
        </div>
        <el-button type="primary" @click="onSubmit" style="margin-left:10px;">查询</el-button>
        <el-button @click="onReset">重置</el-button>
       

        <div style="margin-top:20px;">
            <div id="detection" style="width: 94%;height:500px;"></div>
        </div>
    </el-card>
</div>
</template>

<script>
export default {

    data() {
        return {
            formInline: '',
            value1: '',
            list_name: [],
            list_data: [],
            list_arr: [],

        }
    },
    methods: {
        // 煤矿列表
        async into() {
            const result = await this.$http.post('/admin/mklist');
            if (result.data.code == '200') {
                this.formInline = result.data.data;
            }
        },

        // 折线图
        async info() {
            const result = await this.$http.post('/admin/cltu');
            var obj = {};
            if (result.data.code == '200') {
                for (var i = 0; i < result.data.data.length; i++) {
                    this.list_name.push(result.data.data[i].MK_Char);
                    this.list_data = result.data.data[i].Riqi;
                    obj = {
                        name: result.data.data[i].MK_Char,
                        type: 'line',
                        stack: '总量',
                        data: result.data.data[i].ChanLiang
                    }

                    this.list_arr.push(obj)
                }
                this.drawChart();
            }
        },
        async onSubmit() {
            var old = this.value1;
            var year = old.getFullYear();
            // this.formInline.name

            var datas = {
                Code: this.formInline.Code,
                start: year
            }
            const result = await this.$http.post('/admin/cltu', datas);
            if (result.data.code == '200') {
                var obj = {}

                this.list_name = [];
                this.list_data = [];
                this.list_arr = [];
                for (var i = 0; i < result.data.data.length; i++) {
                    this.list_name.push(result.data.data[i].MK_Char);
                    this.list_data = result.data.data[i].Riqi;
                    obj = {
                        name: result.data.data[i].MK_Char,
                        type: 'line',
                        stack: '总量',
                        data: result.data.data[i].ChanLiang
                    }

                    this.list_arr.push(obj)
                }

                this.drawChart();
            }

        },
        onReset() {
            this.list_name = [];
                this.list_data = [];
                this.list_arr = [];
            this.info();
        },
        drawChart() {
            // 基于准备好的dom，初始化echarts实例
            let myCharts = this.$echarts.init(document.getElementById("detection"));
            var that = this
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: that.list_name
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: that.list_data
                },
                yAxis: {
                    type: 'value'
                },
                series: this.list_arr
            };

            // 使用刚指定的配置项和数据显示图表。
            myCharts.setOption(option);
            // window.onresize = function () {
            //     //用于使chart自适应高度和宽度
            //     //重置容器高宽
            //     myChart.resize();
            //     // resizeWorldMapContainer();

            // }
        },

    },
    mounted() {

        this.info();
        this.into()
    }
}
</script>

<style scoped>

</style>
