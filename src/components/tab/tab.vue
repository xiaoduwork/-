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
                    <el-table-column  prop="MKName" label="煤矿" width="180">
                    </el-table-column>
                    <el-table-column  prop="zaoban" label="早班" width="120">
                    </el-table-column>
                    <el-table-column  prop="wuban" label="午班">
                    </el-table-column>
                    <el-table-column  prop="wanban" label="晚班">
                    </el-table-column>
                    <el-table-column  prop="count" label="总人数">
                    </el-table-column>

                    <!-- <el-table-column v-if="this.path.id==2" prop="" label="时间" width="120">
                    </el-table-column>
                    <el-table-column v-if="this.path.id==2" prop="" label="地点">
                    </el-table-column>
                    <el-table-column v-if="this.path.id==2" prop="" label="值">
                    </el-table-column>
                     <el-table-column v-if="this.path.id==2" prop="" label="阀值">
                    </el-table-column>

                    <el-table-column v-if="this.path.id==3" prop="Day" label="日产量" >
                    </el-table-column>
                    <el-table-column v-if="this.path.id==3" prop="Month" label="月累计">
                    </el-table-column>
                    <el-table-column v-if="this.path.id==3" prop="Year" label="年累计">
                    </el-table-column>
                    <el-table-column v-if="this.path.id==3" prop="ChanLiang" label="总产量">
                    </el-table-column> -->

                    <el-table-column prop="" label="备注">
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
