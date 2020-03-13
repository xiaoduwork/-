<template>
    <div class="#app">
        <el-col :md="6">
            <div class="grid-content bg-purple sidebar">
                <div class="main">安全检测监控</div>
                <div class="sidebar_a">
                    <el-row :gutter="10">
                        <el-col :sm="6">
                            <div class="grid-content bg-purple">点号</div>
                        </el-col>
                        <el-col :sm="12">
                            <div class="grid-content bg-purple">地址</div>
                        </el-col>
                        <el-col :sm="6">
                            <div class="grid-content bg-purple">值</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="menu">
                    <div v-for="(item,index) in list" :key="index" class="sidebar_a">
                        <el-row :gutter="10">
                            <el-col :sm="6">
                                <div class="grid-content bg-purple">{{item.DevLabel}}</div>
                            </el-col>
                            <el-col :sm="12">
                                <div class="grid-content bg-purple">{{item.AddrName}}</div>
                            </el-col>
                            <el-col :sm="6">
                                <div class="grid-content bg-purple">
                                    <span class="sidebar-text">{{item.zhi}}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="grid-content bg-purple sidebar">
                <div class="main">预警监测监控</div>
                <div class="sidebar_a">
                    <el-row :gutter="10">
                        <el-col :sm="6">
                            <div class="grid-content bg-purple">点号</div>
                        </el-col>
                        <el-col :sm="12">
                            <div class="grid-content bg-purple">地址</div>
                        </el-col>
                        <el-col :sm="6">
                            <div class="grid-content bg-purple">值</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="menu">
                    <div v-for="(item,index) in list_jk" :key="index" class="sidebar_a">
                        <el-row :gutter="10">
                            <el-col :sm="6">
                                <div class="grid-content bg-purple">{{item.cedian}}</div>
                            </el-col>
                            <el-col :sm="12">
                                <div class="grid-content bg-purple">{{item.AddrName}}</div>
                            </el-col>
                            <el-col :sm="6">
                                <div class="grid-content bg-purple">
                                    <span class="sidebar-text">{{item.zhi}}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: '',
            list_jk: ''
        };
    },
    created() {
        this.handleLogin();
        this.anquanlist();
    },
    methods: {
        async handleLogin() {
            const res = await this.$http.post('/admin/jituananquan');

            if (res.data.code == '200') {
                res.data.data.forEach(ele => {
                    ele.DevLabel = ele.DevLabel.substring(2, 8);
                });
                this.list = res.data.data;
            }
            if (res.data.code == '202') {
                this.$router.push('/403');
            }
        },
        async anquanlist() {
            const res = await this.$http.post('/admin/Warninglist');
            this.list_jk = res.data.data;
        }
        // echarts() {
        //     let myChart = this.$echarts.init(document.getElementById('echart'));
        //     let option = {
        //         title: {
        //             text: '顶板压力或离层',
        //             x: 'center',
        //             textStyle: {
        //                 color: '#fff'
        //             }
        //         },
        //         tooltip: {
        //             trigger: 'axis',
        //             axisPointer: {
        //                 type: 'cross',
        //                 label: {
        //                     backgroundColor: '#AF6083',
        //                     color: '#fff'
        //                 }
        //             }
        //         },
        //         legend: {
        //             textStyle: {
        //                 fontSize: 18, //字体大小
        //                 color: '#ffffff' //字体颜色
        //             },
        //             data: ['邮件营销']
        //         },
        //         toolbox: {
        //             feature: {
        //                 saveAsImage: {}
        //             }
        //         },
        //         grid: {
        //             left: '1%',
        //             right: '4%',
        //             bottom: '3%',
        //             containLabel: true
        //         },
        //         xAxis: [
        //             {
        //                 x: '6px',
        //                 type: 'category'
        //                 //  axisLabel: {
        //                 //       show: true,
        //                 //       textStyle: {
        //                 //           color: '#ffffff'
        //                 //       }
        //                 //   },
        //                 // boundaryGap: false,
        //                 // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        //             }
        //         ],
        //         yAxis: [
        //             {
        //                 type: 'value',
        //                 data: [20, 40, 60, 80, 100, 120],
        //                 axisLabel: {
        //                     show: true,
        //                     textStyle: {
        //                         color: '#ffffff'
        //                     }
        //                 }
        //             }
        //         ],
        //         series: [
        //             {
        //                 name: '搜索引擎',
        //                 type: 'line',
        //                 stack: '总量',
        //                 label: {
        //                     normal: {
        //                         show: true,
        //                         position: 'top'
        //                     }
        //                 },
        //                 color: ['#fff'], //折线颜色
        //                 areaStyle: {
        //                     color: '#FA81B2' //折线下方色块颜色
        //                 },

        //                 data: [50, 60, 78, 67, 66, 80, 92]
        //             }
        //         ]
        //     };
        //     myChart.setOption(option);
        // }
    },
    mounted() {
        // this.echarts();
    }
};
</script>

<style scoped>
/* .main{
    height: 40px;;
} */
#echart {
    margin: 0 auto;
    padding: 10px 0;
    margin-top: 6px;
}
.sidebar:first-child {
    margin: 0;
}
.sidebar {
    margin-top: 10px;
}
.main {
    padding-top: 14px;
    font-size: 14px;
    height: 30px;
    line-height: 20px;
    color: #229bc1;
    margin-left: 10px;
}
.menu {
    width: 100%;
    /* height: 180px; */
    /* overflow-y: scroll;
        overflow-x: hidden; */
}
.sidebar_a div {
    text-align: center;
    color: #fff;
}
.sidebar-text {
    color: #aa1465;
}

.el-col {
    border-radius: 4px;
}
.bg-purple {
    background: #081a62;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size: 13px;
}
</style>