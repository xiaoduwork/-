<template>
<div v-show="bol">
    <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="formInline.user" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="primary" @click="Czhi" plain>重置</el-button>

                <el-button type="success" @click="dialogFormVisible = true">添加</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择状态">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="异常" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色：" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择角色">
                        <el-option v-for="item in form.role" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-table :data="tableDatas" style="width: 100%">
            <el-table-column prop="username" label="登录用户名" width="180"></el-table-column>
            <el-table-column prop="name" label="昵称" width="180"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0" @change="change_switch(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间"></el-table-column>
            <el-table-column prop="updated_at" label="最后修改时间"></el-table-column>
            <el-table-column prop="role_id" label="角色"></el-table-column>
            <el-table-column label="操作" width="170" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="text" class="red" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改用户" :visible.sync="dialogFormVisibles">
            <el-form :model="data">
                <el-form-item label="用户名：" :label-width="formLabelWidth">
                    <el-input v-model="data.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth">
                    <el-input v-model="data.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" :label-width="formLabelWidth">
                    <el-input v-model="data.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="角色：" :label-width="formLabelWidth">
                    <el-select v-model="data.role_id" placeholder="请选择角色">
                        <el-option v-for="item in form.role" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="changes">确 定</el-button>
            </div>
        </el-dialog>
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper" :page-size="pagesize" :total="total" style="float:right;"></el-pagination>
        </el-col>
    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 分页数据
            pagesize: 10,
            currentPage: 1,
            tableDatas: [

            ],
            total: null,
            formInline: {
                user: ''
            },
            // 弹出框
            dialogFormVisible: false,
            dialogFormVisibles: false,
            // 添加的数据
            form: {
                name: '',
                password: '',
                nickname: '',
                region: '',
                role: ''
            },

            //修改数据
            data: {

            },
            formLabelWidth: '120px',
            value: '',
            // 状态
            bol: false
        };
    },
    methods: {

        async change_switch(row) {
            const result = await this.$http.post('/admin/userstatus', {
                id: row.id
            });
        },

        // 分页
        handleSizeChange: function (size) {
            this.pagesize = size;
             //每页下拉显示数据
        },
        // 分页
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.onin() //点击第几页
        },
        //修改赋值
        handleEdit(row) {
            this.dialogFormVisibles = true;
            this.data = row;
        },

        // 确认修改
        async changes() {

            var res = this.data;
            const result = await this.$http.post('/admin/useredit', res);
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

                // this.$router.push('/403');

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
        // 列表渲染
        async onin() {
            const res = await this.$http.post('/admin/userlist', {
                page: this.currentPage,
                name: this.formInline.user
            });
            if (res.data.code == '200') {
                this.bol = true;
                this.tableDatas = res.data.data.data;
                // this.stat = res.data.data.data.status;
                this.total = res.data.data.total;
                this.$forceUpdate();
            }

            if (res.data.code == '202') {
                 this.$router.push('/403');

            
            }

        },

        // 获取角色数组
        async see() {
            const result = await this.$http.post('/admin/rolelists');
            if (result.data.code == '200') {
                this.form.role = result.data.data;
            }
            if (result.data.code == '202') {
            }
        },

        // 删除
        async dele(rows) {
            const res = await this.$http.post('admin/userdel', {
                id: rows.id
            });
            if (res.data.code == '200') {
                this.onin();
            }

            if (res.data.code == '202') {
                alert('没有权限');
               
            }

        },
        //添加用户
        async confirm() {
            var datas = {
                username: this.form.name,
                password: this.form.password,
                name: this.form.nickname,
                status: this.form.region,
                role_id: this.value
            };
            const result = await this.$http.post('/admin/useradd', datas);
            if (result.data.code == '200') {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.onin();
                this.form.name = '';
                this.form.password = '';
                this.form.nickname = '';
                this.form.region = '';
                this.value = '';
                this.dialogFormVisible = false;

            }

            if (result.data.code == '202') {
                alert('没有权限');
            }
        },

        // 添加的弹出框的取消操作
        cancel() {
            this.form.name = '';
            this.form.password = '';
            this.form.nickname = '';
            this.form.region = '';
            this.value = '';
            this.dialogFormVisible = false;
        },

        // 搜索
        onSubmit() {
            this.onin();
        },
        // 重置
        Czhi() {

            this.formInline.user = '';
            this.onin();
        },

    },

    created() {
        this.onin();
        this.see();
    },

};
</script>

<style scoped>
</style>
