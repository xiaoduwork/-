<template>
    <div class="select">
        <el-form ref="form"  >
            <el-form-item >
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                {
                    value: '选项1',
                    label: '森泰'
                },
                {
                    value: '选项2',
                    label: '金亿'
                }
            ],
            value: ''
        };
    }
};
</script>
<style scoped>
.select{
    /* margin: 20px; */
    margin-top: 14px;
}
/* .el-select-dropdown{
} */
</style>