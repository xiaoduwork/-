<template>
<div>
    <div class="contents">
        <h4 style="text-align: center;font-size:26px;line-height: 26px">普大煤业集团人员定位统计报表</h4>
        <div>
            <span style="font-size:16px;margin-left:2%;">条件：</span>
            <span style="font-size:16px;"></span>
            <div style="margin:2%;border:1px solid #000;">
                <el-table :data="path" border style="width: 100%">
                    <el-table-column  prop="Riqi" label="日期" width="180">
                    </el-table-column>
                    <el-table-column  prop="mkname" label="煤矿" width="180">
                    </el-table-column>


                    <el-table-column  prop="LastUpdateTime" label="时间" width="180">
                    </el-table-column>
                    <el-table-column  prop="AddrName" label="地点" width="320">
                    </el-table-column>
                    <el-table-column  prop="zhi" label="值">
                    </el-table-column>
                     <el-table-column  prop="yuzhi" label="阈值">
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    type
} from 'os'
export default {
    props: {
        path: {
            type: Array,
            default: 'hello world'
        }
    },
    created() {
        console.log(this.path)
    },
    data() {
        return {

            formInline: {
                name: '',
                project: '',
            },

            value1: '',

        }
    },

}
</script>

<style>
.contents {
    border: 1px solid #000;
    padding: 20px;
    margin: 20px;

}
</style>
