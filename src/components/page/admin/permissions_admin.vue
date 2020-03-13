<template>
<div v-show="bol">

    <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="排序：" :label-width="formLabelWidth">
                    <el-input v-model="form.sort" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="路径：" :label-width="formLabelWidth">
                    <el-input v-model="form.path" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="name" label="权限">
            </el-table-column>
            <el-table-column prop="path" label="路径">
            </el-table-column>
            <el-table-column prop="" label="操作">

                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="text" class="red" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 修改权限 -->
        <el-dialog title="修改权限" :visible.sync="dialogFormVisibles">
            <el-form :model="data">

                <el-form-item label="权限：" :label-width="formLabelWidth">
                    <el-input v-model="data.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="路径：" :label-width="formLabelWidth">
                    <el-input v-model="data.path" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="changes">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>

</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            // 添加的数据
            form: {
                name: '',
                sort: '',
                path: ''
            },

            // 修改
            data: {
                name: '',
                path: ''
            },
            formInline: {
                user: ''
            },
            // 弹出框
            dialogFormVisible: false,
            dialogFormVisibles: false,

            formLabelWidth: '120px',
            bol: false
        }
    },
    methods: {
        async info() {
            const result = await this.$http.post('/admin/authlist');
            if (result.data.code == '200') {
                this.bol = true;
                this.tableData = result.data.data.data;

            }

            if (result.data.code == '202') {

                this.$router.push('/403');
            }
        },

        // 删除
        handleDelete(row) {
            this.$confirm('是否删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.dele(row);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async dele(res) {
            const result = await this.$http.post('/admin/authdel', {
                id: res.id
            });
            if (result.data.code == '200') {
                this.info();
            }
            if (result.data.code == '202') {
                                alert('没有权限');

            }
        },

        // 添加权限

        async confirm() {
            var datas = {
                sort: this.form.sort,
                name: this.form.name,
                path: this.form.path,

            };

            const result = await this.$http.post('/admin/authadd', datas);
            if (result.data.code == '200') {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.info();
                this.form = {};
                this.dialogFormVisible = false;

            }
            if (result.data.code == '202') {
                alert('没有权限');
                
            }
        },

        // 添加的弹出框的取消操作
        cancel() {
            this.form = {};
            this.dialogFormVisible = false;
        },
        // 修改
        handleEdit(res) {
            this.dialogFormVisibles = true;
            this.data = res;
        },

        // 确认修改
        async changes() {
            var res = this.data;
            const result = await this.$http.post('/admin/authedit', res);
            if (result.status == '200') {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.info();
                this.dialogFormVisibles = false;
            }

            if (result.data.code == '202') {

                alert('没有权限');
                
            }
        },

    },
    mounted() {
        this.info();
    }
}
</script>

<style scoped>

</style>
