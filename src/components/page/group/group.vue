
<template>
    <div>
        <el-row v-loading="loading" :class="loading ? 'success':'secondary'"></el-row>
        <div id="app" v-show="bol">
            <div class="title">山西普大集团煤业大数据平台     <el-button class="large" type="primary" @click="large">进入大屏</el-button></div>
            <el-row :gutter="10" style="margin-top:15px;">
                <el-col :md="6">
                    <div class="grid-content bg-purple">
                        <div class="card">
                            <div style="text-align: center;color:#fff;font-weight: 500;">产量占比统计</div>
                            <div id="echart"></div>
                        </div>
                        <div class="left">
                            <img
                                v-for="(item,index) in 8"
                                :key="index"
                                src="../../../../screenshots/1574066166(1).png"
                                alt
                            />
                        </div>
                    </div>
                </el-col>
                <el-col :md="12">
                    <div
                        id="box"
                        class="grid-content bg-purple-light"
                        style="width:100%;height:100%;"
                    >
                        <div class="xx">
                            <div>
                                <div>{{xjcount}}</div>
                                <div>总下井人员</div>
                            </div>
                            <div v-for="(item,index) in list" :key="index">
                                <div>{{item.people}}</div>
                                <div>{{item.MineName}}</div>
                            </div>
                        </div>
                        <div style="position: relative;background:#012464;padding-top:10px;">
                            <div
                                style="text-align: center; font-size:18px; color:#fff;font-weight: 500;"
                            >产量统计</div>

                            <div class="block" style="position: absolute; right: 10px;z-index: 99;">
                                <el-date-picker
                                    style="height:30px;"
                                    v-model="value1"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
                                <el-button style="height:30px;" type="warning" @click="Tongji()">统计</el-button>
                            </div>
                            <div id="bottom"></div>
                        </div>

                        <div class="tabels">
                            <div>
                                <div class="grid-content bg-purple sidebar">
                                    <div class="main">安全检测监控</div>
                                    <div class="sidebar_a">
                                        <el-row :gutter="10">
                                            <el-col :sm="5">
                                                <div class="grid-content bg-purple">矿号</div>
                                            </el-col>
                                            <el-col :sm="4">
                                                <div class="grid-content bg-purple">矿点</div>
                                            </el-col>
                                            <el-col :sm="9">
                                                <div class="grid-content bg-purple">地址</div>
                                            </el-col>
                                            <el-col :sm="4">
                                                <div class="grid-content bg-purple">值</div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="menu">
                                        <div
                                            v-for="(item,index) in list1"
                                            :key="index"
                                            class="sidebar_a"
                                        >
                                            <el-row :gutter="10">
                                                <el-col :sm="5">
                                                    <div class="grid-content bg-purple">{{item.kd}}</div>
                                                </el-col>
                                                <el-col :sm="4">
                                                    <div
                                                        class="grid-content bg-purple"
                                                    >{{item.DevLabel}}</div>
                                                </el-col>
                                                <el-col :sm="9">
                                                    <div
                                                        class="grid-content bg-purple"
                                                    >{{item.AddrName}}</div>
                                                </el-col>
                                                <el-col :sm="4">
                                                    <div class="grid-content bg-purple">
                                                        <span class="sidebar-text">{{item.zhi}}</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="grid-content bg-purple sidebar">
                                    <div class="main">安全检测监控</div>
                                    <div class="sidebar_a">
                                        <el-row :gutter="10">
                                            <el-col :sm="5">
                                                <div class="grid-content bg-purple">矿号</div>
                                            </el-col>
                                            <el-col :sm="4">
                                                <div class="grid-content bg-purple">矿点</div>
                                            </el-col>
                                            <el-col :sm="9">
                                                <div class="grid-content bg-purple">地址</div>
                                            </el-col>
                                            <el-col :sm="4">
                                                <div class="grid-content bg-purple">值</div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                    <div class="menu">
                                        <div
                                            v-for="(item,index) in list2"
                                            :key="index"
                                            class="sidebar_a"
                                        >
                                            <el-row :gutter="10">
                                                <el-col :sm="5">
                                                    <div
                                                        class="grid-content bg-purple"
                                                    >{{item.cedian}}</div>
                                                </el-col>
                                                <el-col :sm="4">
                                                    <div
                                                        class="grid-content bg-purple"
                                                    >{{item.cedian}}</div>
                                                </el-col>
                                                <el-col :sm="9">
                                                    <div
                                                        class="grid-content bg-purple"
                                                    >{{item.AddrName}}</div>
                                                </el-col>
                                                <el-col :sm="4">
                                                    <div class="grid-content bg-purple">
                                                        <span class="sidebar-text">{{item.zhi}}</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :md="6">
                    <div class="grid-content bg-purple">
                        <div class="card" shadow="always">
                            <div style="text-align: center;color:#fff;font-weight: 500;">顶板压力或离层</div>
                            <div id="echarts"></div>
                        </div>
                        <div class="left">
                            <img
                                v-for="(item,index) in 8"
                                :key="index"
                                src="../../../../screenshots/1574066166.png"
                                alt
                            />
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import { EleResize } from '../../../assets/js/esresize';
export default {
    name: 'app',
    data() {
        return {
            xjcount: '',
            list: [],
            list1: '',
            list2: '',
            tableData: [],
            tableDatas: [],
            value1: '',
            value2: '',
            arr: [],
            arry: [],
            arry_2: [],
            bol: true,
            loading: false
        };
    },
    methods: {
        async Tongji() {
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
            var data = {
                start: oldTime,
                end: nowTime
            };
            const result = await this.$http.post('/admin/showindex', data);
            this.arry_2 = [];
            for (var j = 0; j < result.data.data.tu.length; j++) {
                var obj_3 = {};
                obj_3.product = result.data.data.tu[j].MK_Char;
                obj_3.allcl = result.data.data.tu[j].allcl;
                obj_3.current = result.data.data.tu[j].current;
                this.arry_2.push(obj_3);
            }
            this.Zhuzhuang();
        },
        async onin() {
            const res = await this.$http.post('/admin/jituananquan');
            if (res.data.code == '200') {
                res.data.data.forEach(ele => {
                    ele.DevLabel = ele.DevLabel.substring(2, 8);
                });
                this.bol = true;
                this.loading = false;
                this.list1 = res.data.data;
            }
            if (res.data.code == '202') {
                this.$router.push('/403');
            }
        },
        async warning() {
            const data = await this.$http.post('/admin/Warninglist');
            if (data.data.code == '200') {
                this.list2 = data.data.data;
            }
            if (data.data.code == '202') {

                this.$router.push('/403');
            }
        },
        async Sengtai() {
            const result = await this.$http.post('/admin/showindex');
            if (result.data.code == '200') {
                for (var i = 0; i < result.data.data.Cllist.length; i++) {
                    var obj = {};
                    this.arr.push(result.data.data.Cllist[i].MK_Char);
                    obj.name = result.data.data.Cllist[i].MK_Char;
                    obj.value = result.data.data.Cllist[i].Bl;
                    this.arry.push(obj);
                }
                this.xjcount = result.data.data.xjcount;
                this.list = result.data.data.xjlist;
                for (var j = 0; j < result.data.data.tu.length; j++) {
                    var obj_2 = {};
                    obj_2.product = result.data.data.tu[j].MK_Char;
                    obj_2.allcl = result.data.data.tu[j].allcl;
                    obj_2.current = result.data.data.tu[j].current;

                    this.arry_2.push(obj_2);
                }
            }
            if (result.data.code == '202') {
                this.$router.push('/403');
            }
            this.drawChart();
            this.Zhuzhuang();
        },
        drawLine(dom, option) {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById(dom));
            let resizeDiv = document.getElementById(dom);
            // 绘制图表
            myChart.setOption(option);
            let listener = function() {
                myChart.resize();
            };
            EleResize.on(resizeDiv, listener);
        },
        drawChart() {
            // 基于准备好的dom，初始化echarts实例
            let dom = 'echart';
            var that = this;
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: '',
                    x: 'center'
                },

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: that.arr
                },
                // yAxis: [
                //     {
                //         type: 'value',
                //         // data: [10, 20, 30, 40, 50, 60],
                //         axisLabel: {
                //             textStyle: {
                //                 color: '#fff'
                //             }
                //         }
                //     }
                // ],
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['58%', '60%'],
                        data: that.arry,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            that.drawLine(dom, option);
        },

        fold() {
            let dom = 'echarts';
            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [20, 32, 41, 54, 60, 70, 90],
                        type: 'line',
                        color: ['#ccc'],
                        areaStyle: {
                            color: '#FA81B2' //折线下方色块颜色
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                    }
                ]
            };

            this.drawLine(dom, option);
        },

        Zhuzhuang() {
            let dom = 'bottom';
            let option = {
                legend: {
                    left: 'left'
                },
                tooltip: {},
                dataset: {
                    dimensions: ['product', 'allcl', 'current'],
                    source: this.arry_2
                },
                grid: {
                    left: '3%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#FA81B2',
                                label: {
                                    show: true, //开启显示
                                    position: 'top', //在上方显示

                                    textStyle: {
                                        //数值样式
                                        color: '#ccc',
                                        fontSize: 16
                                    }
                                }
                            }
                        }
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#0cacbd',
                                label: {
                                    show: true, //开启显示
                                    position: 'top', //在上方显示

                                    textStyle: {
                                        //数值样式
                                        color: '#ccc',
                                        fontSize: 16
                                    }
                                }
                            }
                        }
                    }
                ]
            };

            this.drawLine(dom, option);
        },
        large(){
            this.$router.push('/large_group')
        }
    },

    mounted() {
        this.onin();
        this.Sengtai();
        this.warning();
        this.fold();
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
.left {
    display: flex;
    flex-wrap: wrap;
}
.left > img {
    width: 50%;
    height: 130px;
}
#app {
    margin: 0 auto;
    background: #0c1b52;
    height: 840px;
    position: relative;
}
.large{
    top: 10px;
    right: 30px;
    position: absolute;
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
    height: 180px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.sidebar_a div {
    text-align: center;
    color: #fff;
}
.title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    background: #09279d;
    margin-bottom: 10px;
}

.card {
    background: #081a62;
    padding-top: 10px;
}

.xx {
    display: flex;
    flex-wrap: wrap;
    height: 256px;
}

.xx > div {
    width: 18%;
    height: 90px;
    line-height: 40px;
    text-align: center;
    background: #012464;
    margin-bottom: 24px;
    margin-left: 12px;
    padding-top: 16px;
    font-size: 16px;
    color: #fff;
}

.xx > div :first-child {
    font-size: 34px;
}

.el-col {
    border-radius: 4px;
}

.el-card__body {
    padding: 0px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size: 13px;

}

.card {
    font-size: 16px;
}

.left {
    margin-top: 10px;
    background: #081a62;
    padding-top: 10px;
}

.el-date-editor {
    height: 40px;
}

.tabels {
    display: flex;
    justify-content: space-between;
    background: #081a62;
    margin-top: 10px;
}

.tabels > div {
    width: 50%;
}
#bottom {
    width: 730px;
    height: 200px;
    margin: 0 auto;
}
#echart,
#echarts {
    width: 360px;
    height: 220px;
}
</style>

