<template>
<div v-show="bol">

    <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- <el-form-item>
                <el-input v-model="formInline.user" placeholder="请输入关键字"></el-input>
            </el-form-item> -->
            <el-form-item>
                <!-- <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="primary" @click="Czhi" plain>重置</el-button> -->

                <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">

                <el-form-item label="角色：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述：" :label-width="formLabelWidth">
                    <el-input v-model="form.des" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="异常" value="0"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="tableDatas" style="width: 100%">
            <el-table-column prop="id" label="用户ID" width="180">
            </el-table-column>
            <el-table-column prop="name" label="角色名称">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="text" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    <el-button type="text" @click="bnagD(scope.row)">绑定</el-button>

                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改用户" :visible.sync="dialogFormVisibles">
            <el-form :model="data">
                <el-form-item label="名称：" :label-width="formLabelWidth">
                    <el-input v-model="data.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述：" :label-width="formLabelWidth">
                    <el-input v-model="form.des" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="请选择状态">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="异常" value="0"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="changes">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 绑定 -->

        <el-dialog title="权限绑定" :visible.sync="dialog">

            <el-table ref="multipleTable" :data="gridData" tooltip-effect="dark" style="width: 100%" @selection-change="binds">
                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column prop="id" label="ID" width="120">
                </el-table-column>
                <el-table-column prop="name" label="权限" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="path" label="路径" show-overflow-tooltip>
                </el-table-column>
            </el-table>

            <!-- <el-table :data="gridData">
                <el-table-column property="id" label="ID"></el-table-column>
                <el-table-column property="name" label="权限"></el-table-column>

            </el-table> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="yes">确 定</el-button>
            </div>
        </el-dialog>

    </el-card>

</div>
</template>

<script>
export default {
    data() {
        return {
            tableDatas: [{

            }],

            formInline: {
                user: ''
            },
            // 弹出框
            dialogFormVisible: false,
            dialogFormVisibles: false,
            dialog: false,
            // 添加的数据
            form: {
                name: '',
                des: '',
                status: ''
            },

            //修改数据
            data: {

            },
            formLabelWidth: '120px',
            value: '',
            gridData: [],

            arry: [],
            js_id: '',
            bol: false

        }
    },
    methods: {
        async onin() {

            const res = await this.$http.post('admin/rolelists');
            if (res.data.code == '200') {
                this.bol = true;
                this.tableDatas = res.data.data;
            }

            if (res.data.code == '202') {
                this.$router.push('/403');
            }
        },

        // 添加用户
        async confirm() {
            var datas = {

                name: this.form.name,
                status: this.form.status,
                des: this.form.des,
            };

            const result = await this.$http.post('/admin/roleadd', datas);
            if (result.data.code == '200') {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.onin();
                this.form.name = '';
                this.form.status = '';
                this.form.des = '';
                this.dialogFormVisible = false;

            }
            if (result.data.code == '202') {
                alert('没有权限');
                
            }
        },

        // 添加的弹出框的取消操作
        cancel() {
            this.form.name = '';
            this.form.status = '';
            this.form.des = '';
            this.dialogFormVisible = false;
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

        // 删除
        async dele(rows) {
            const res = await this.$http.post('admin/roledel', {
                id: rows.id
            });
            if (res.data.code == '200') {
                this.onin();
            }

            if (res.data.code == '202') {
                alert('没有权限');

            }

        },

        //修改赋值
        handleEdit(row) {
            this.dialogFormVisibles = true;
            this.data = row;
        },

        // 确认修改
        async changes() {

            var res = this.data;
            const result = await this.$http.post('/admin/roleedit', res);
            if (result.data.code == '200') {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.onin();
                this.dialogFormVisibles = false;
            }

            if (result.data.code == '202') {
                alert('没有权限');

            }
        },

        // 绑定 角色id获取， 渲染权限列表
        async bnagD(row) {
            this.js_id = row.id;
            this.dialog = true;
            const result = await this.$http.post('/admin/authlist');
            if (result.data.code == '200') {
                this.gridData = result.data.data.data;

            }
            if (result.data.code == '202') {
                alert('没有权限');
                
            }
        },

        async yes() {
            const result = await this.$http.post('/admin/roleauth', {
                id: this.js_id,
                authid: this.arry
            });
            if (result.data.code == '200') {
                this.$message({
                    message: '绑定成功',
                    type: 'success'
                });
                this.dialog = false
            }
            if (result.data.code == '202') {

                alert('没有权限');
               
            }

        },
        // 获取多选框权限ID
        binds(select) {
            for (var i = 0; i < select.length; i++) {
                this.arry.push(select[i].id);
            }

        }
    },

    mounted() {
        this.onin();
    }
}
</script>

<style scoped>

</style>
