<template>
    <div>
        <el-col :md="12">
            <div class="grid-content bg-purple">
                <div class="main">
                    <div class="main-left">
                        <div>
                            <div>
                                <i>累计产量：</i>
                                <span>{{output.toDayCount}}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <i>当前产量：</i>
                                <span>{{output.dutyCount}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="main-center">
                        <div class="menu" v-for="(item,index) in list" :key="index">
                            <div>
                                <img v-show="item.Status==1" src="../../assets/img/11.png" alt />
                                <img v-show="item.Status==2" src="../../assets/img/22.png" alt />
                                <!-- <img v-show="item.Status==3" src="../../assets/img/33.png" alt />
                                <img v-show="item.Status==4" src="../../assets/img/44.png" alt />-->
                                <span>{{item.Part_name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="menu_cans">
                    <div class="z_num">井下总人数：{{peoList}}</div>
                    <div class="content-img">
                        <img src="../../assets/img/3.png" alt />

                        <div
                            :title="item.StationNumber+item.name"
                            style="position: absolute;width: 29px; height: 35px;"
                            v-for="(item,index) in arr_x"
                            :key="index"
                            :style="{ left:item.x+'px',top:item.y+'px'}"
                        >
                            <div class="dian"></div>
                            <img
                                style="width:10px;height:10px;"
                                v-show="item.num == 0?false:true  "
                                src="./../../assets/img/pop.png"
                                alt
                            />
                            <span style="color:#ccc">{{item.num}}</span>
                            <span style="color:#ccc">人</span>
                            <img
                                style="display:block"
                                id="img_left"
                                src="./../../assets/img/4.gif"
                                alt
                            />
                        </div>
                    </div>
                </div>

                <div class="content-echarts">
                    <div id="echt"></div>
                </div>
            </div>
        </el-col>
    </div>
</template>

<script>
import { EleResize } from '../../assets/js/esresize';
import { setInterval } from 'timers';
export default {
    data() {
        return {
            list: '',
            output: {
                dutyCount: '',
                toDayCount: ''
            }, //产量
            arr: [],
            arr1: [],
            arry: '',
            arr_x: [],
            setName: null,
            peoList: '',
            bol:false,
            obj:{bol:true,loading:false}
        };
    },
    created() {
        this.handleLogin();
        this.tu();
        this.setName = setInterval(() => {
            this.arr_x = [];
            this.tu();
        }, 5000);
    },
    mounted() {
        let _this = this;
        window.onresize = function() {
            _this.myChart.resize()
        }

    },
    methods: {
        async tu() {
            const result = await this.$http.post('/admin/tu');
            this.arry = result.data.data.length;
            var obj = {};
            for (var i = 0, s = result.data.data.length; i < s; i++) {
                obj = {
                    x: result.data.data[i].StationX,
                    y: result.data.data[i].StationY,
                    num: result.data.data[i].count,
                    name: result.data.data[i].name,
                    StationNumber: result.data.data[i].StationNumber
                };
                this.arr_x.push(obj);
            }
        },
        async handleLogin() {
            const res = await this.$http.post('/admin/showlist');
            this.output.dutyCount = res.data.data.dutyCount;
            this.output.toDayCount = res.data.data.toDayCount;
            this.list = res.data.data.yichang;
            this.peoList = res.data.data.count;
            res.data.data.arr.forEach((ele, index) => {
                this.arr.unshift(ele.zhiwei);
                this.arr1.unshift(ele.count);
            });
            this.echt();
            this.$emit('taken', this.obj);
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
        echt() {
            var that = this;
            let dom = 'echt';
            let option = {
                title: {
                    text: '井下人员分配信息',
                    x: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true,
                    y2: 140
                },
                xAxis: [
                    {
                        type: 'category',
                        data: that.arr,
                        barWidth: '100%',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            },
                            formatter: function(val) {
                                return val.split('').join('\n');
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        data: [10, 20, 30, 40, 50, 60],
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                series: [
                    {
                        data: that.arr1,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: '#2BCBFD',
                                label: {
                                    show: true, //开启显示
                                    position: 'top', //在上方显示
                                    textStyle: {
                                        //数值样式
                                        color: '#fff',
                                        fontSize: 14
                                    }
                                }
                            }
                        }
                    }
                ]
            };
            that.drawLine(dom, option);
        }
    },
    beforeDestroy() {
        clearInterval(this.setName);
    }
};
</script>

<style scoped>
#echt {
    width: 720px;
    height: 300px;
}

.main {
    color: #fff;
    display: flex;
    font-size: 14px;
}

.main-center {
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
}

.main-left > div > div {
    width: 240px;
    height: 54px;
    line-height: 54px;
    background: #012464;
}

.main-left > div > div > span {
    font-size: 30px;
    font-weight: bold;
    color: #0cacbd;
}

.main-left > div > div > i {
    font-style: normal;
    margin-left: 20px;
}

.menu div img {
    width: 16px;
    vertical-align: middle;
    margin: 0 4px 2px 20px;
}

.menu {
    width: 33%;
    height: 54px;
    line-height: 54px;
    background: #012464;
}

.content-img {
    margin-top: 10px;
    height: 300px;
    overflow-y: scroll;
    text-align: center;
    position: relative;
}
.content-img>img{
    /* width: 100%; */
}
.menu_cans {
    position: relative;
}
.z_num {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 40px;
    border: 1px dashed #0cacbd;
    font-weight: bolder;
    color: #0cacbd;
    z-index: 10;
    width: 140px;
    font-size: 14px;
}

.content-echarts {
    margin-top: 10px;
    background: #012464;
    padding: 10px 0;
}

.content-echarts > div {
    margin: 0 auto;
}

.dian {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: green;
    /* border: 2px solid green; */
}
#img_left {
    width: 12px;
    height: 12px;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    margin-left: 10px;
}
</style>
