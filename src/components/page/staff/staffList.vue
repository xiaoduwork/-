<template>
    <div>
        <div class="main">
            <h1>山西普大煤业</h1>
            <div>
                <el-table
                    v-loading="loading"
                    class="tab"
                    :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    :default-expand-all="false"
                >
                    <el-table-column prop="id" label="编码" width="180"></el-table-column>
                    <el-table-column prop="IP" label="IP/域名" width="180"></el-table-column>
                    <el-table-column prop="device_name" label="设备名称" width="160"></el-table-column>
                    <el-table-column prop="type" label="设备类型" width="160"></el-table-column>
                    <el-table-column prop="status" label="状态" width="160"></el-table-column>
                    <el-table-column prop="port" label="端口" width="200"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <h2>{{id}}</h2>
            <div>
                <el-table
                    v-loading="loading"
                    class="tab"
                    :data="list"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    :default-expand-all="false"
                >
                    <el-table-column prop="monitor_id" label="编码" width="180"></el-table-column>
                    <el-table-column prop="aisle_name" label="通道名称" width="180"></el-table-column>
                    <el-table-column prop="number" label="通道数" width="180"></el-table-column>
                    <el-table-column prop="camera" label="摄像头" width="160"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            list:'',
            id:'点击详细',
            loading: true,
        };
    },
    created() {
        this.handleLogin();
    },
    methods: {
        handleEdit(index, row) {
            this.list=row.list
            this.id='编码为'+row.id+'的详细页面'
            console.log(row.id);
        },
        //获取数据
        async handleLogin() {
            const res = await this.$http.post('/admin/monitorlist');
            console.log(res.data.data);
            if (res.data.code == '200') {
                this.tableData = res.data.data;
                this.loading = false;
            }
            if (res.data.code == '202') {
                this.$router.push('/403');
            }
        }
    }
};
</script>

<style scoped>
h1,h2 {
    padding: 16px 0 10px 30px;
}
.tab {
    margin-left: 10px;
}
.main {
    margin: 10px 0 0 20px;
    background: #fff;
}
.main > div {
    margin-left: 20px;
    padding-top: 10px;
}
.main-input {
    width: 300px;
    margin: 0 10px;
}
.main span {
    margin-left: 20px;
    font-size: 14px;
}
</style>