
<template>
    <div id="app">
        <div class="common-wrapper">
            <el-table
                :data="lists"
                ref="table"
                highlight-current-row
                style="width: 100%;"
                :row-key="getRowKeys"
                type="selection"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    :reserve-selection="true"
                ></el-table-column>
                <el-table-column v-if="this.path.id==1" prop="Riqi" label="日期" width="180"></el-table-column>
                <el-table-column v-if="this.path.id==1" prop="MKName" label="所属矿井" width="150"></el-table-column>
                <el-table-column v-if="this.path.id==1" prop="zaoban" label="早班"></el-table-column>
                <el-table-column v-if="this.path.id==1" prop="wuban" label="晚班"></el-table-column>
                <el-table-column v-if="this.path.id==1" prop="wanban" label="夜班"></el-table-column>
                <el-table-column v-if="this.path.id==1" prop="wanban" label="描述"></el-table-column>
                <el-table-column v-if="this.path.id==1" label="操作" width="170" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详细</el-button>
                        <el-button
                            type="text"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >导出</el-button>
                    </template>
                </el-table-column>
                <el-table-column v-if="this.path.id==2" prop="Riqi" label="日期" width="180"></el-table-column>
                <el-table-column v-if="this.path.id==2" prop="ChanLiang" label="日产量"></el-table-column>
                <el-table-column v-if="this.path.id==2" prop="Month" label="月累计产量"></el-table-column>
                <el-table-column v-if="this.path.id==2" prop="Year" label="年累计产量"></el-table-column>
                <el-table-column v-if="this.path.id==2" prop="MKName" label="所属矿井"></el-table-column>
                <el-table-column v-if="this.path.id==2" prop="Status" label="描述"></el-table-column>
                <el-table-column v-if="this.path.id==2" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详细</el-button>
                        <el-button
                            type="text"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >导出</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="this.path.id==3"
                    prop="lasttime"
                    label="日期"
                    width="200"
                ></el-table-column>
                <el-table-column v-if="this.path.id==3" prop="cedian" label="点号" width="140"></el-table-column>
                <el-table-column v-if="this.path.id==3" prop="AddrName" label="地址" width="280"></el-table-column>
                <el-table-column v-if="this.path.id==3" prop="zhi" label="值" width="180"></el-table-column>
                <el-table-column v-if="this.path.id==3" prop="yuzhi" label="阈值" width="160"></el-table-column>
                <el-table-column v-if="this.path.id==3" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详细</el-button>
                        <el-button
                            type="text"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >导出</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="path.page"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-size="pagesize"
                    :total="path.total"
                    style="float:left;"
                ></el-pagination>
            </el-col>
            <div class="clearfix"></div>
        </div>
        <div>
            <transition name="el-fade-in-linear">
                <div v-if="idx.id!=''" class="details1">
                    <div>
                        <div @click="close">
                            <el-button class="close" type="danger" icon="el-icon-close" circle></el-button>
                        </div>
                        <xiangqing :msg="idx"></xiangqing>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
 
<script>
import axios from 'axios';
import xiangqing from '../menu/xiangqing';
export default {
    components: {
        xiangqing
    },
    props: {
        path: {
            type: Object,
            default: 'hello world'
        }
    },
    data() {
        return {
            lists: '',
            listLoading: false,
            multipleSelectionAll: [], //所有选中的数据包含跨分页数据
            pagesize: 10,
            getRowKeys(row) {
                return row.ID;
            },
            idx: { id: '', count: '' ,type:''},
        };
    },
    created() {
        this.lists = this.path.list;
        this.idx.count = this.path.id;
    },
    methods: {
        close() {
            this.idx.id = '';
        },
        // 分页全选-选中框改变事件
        handleSelectionChange(val) {
            // 数据去重
            this.multipleSelectionAll = this.reduceSame(val);
            // 选中所有选择框时勾选全选按钮
            if (this.multipleSelectionAll.length == this.total) {
                this.allCheck = true;
            }
            // 将row是对象数组数据转换为字符串
            this.multipleSelectionAll = this.multipleSelectionAll
                .map(function(val) {
                    return val.id;
                })
                .toString();
            // 选中后的数据
        },
        // 数组对象去重
        reduceSame: function(arr) {
            let obj = {};
            return arr.reduce(function(prev, item) {
                obj[item.id] ? '' : (obj[item.id] = 1 && prev.push(item));
                return prev;
            }, []);
        },
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        //点击当前页数
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage; 
            this.$emit('send',currentPage)
        },
        //导出
        handleDelete(index, row) {
            this.idx.id = row.ID;
        },
        //详细
        handleEdit(index, row) {
            this.idx.id = row.ID;
            this.idx.type = row.type;
        }
    },
    watch: {
        // 分页全选-监听数据变化
        lists: {
            handler(value) {
                if (this.allCheck) {
                    this.lists.forEach(row => {
                        if (row) {
                            this.$refs.table.toggleRowSelection(row, true);
                        }
                    });
                }
            },
            deep: true
        }
    }
};
</script>
<style scoped>
.details1 {
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    top: 0;
    left: 2%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
}
.details1 > div {
    margin-left: 180px;
    margin-top: 20px;
}
#app {
    position: relative;
}
.common-wrapper {
    width: 90%;
    margin-left: 36px;
}
.toolbar {
    margin-top: 10px;
}
.red {
    color: #ff0000;
}
.close {
    margin-left: 650px;
}
</style>