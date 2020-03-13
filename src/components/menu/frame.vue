<template>
    <div>
        <el-button @click="show = !show">点击按钮</el-button>
        <transition name="el-fade-in-linear">
            <div class="frame1" v-show="show">
                <div>
                    <el-button type="danger" circle size="mini" icon="el-icon-warning-outline"></el-button>
                    <span>414工作面瓦斯</span>
                    <div class="menu">当前阈0.04%，阔值10ppm</div>
                    <div class="menu-botton">
                        <el-button type="primary" plain size="mini">查看</el-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true
        };
    }
};
</script>

<style scoped>
.menu-botton {
    margin: 20px 0 0 150px;
}
.frame1 {
    width: 260px;
    height: 140px;
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 0 10px#999;
}
.frame1 > div {
    padding: 20px 0 0 26px;
}
.frame1 > div span {
    margin-left: 10px;
}
.menu {
    font-size: 12px;
    color: #999;
    margin: 10px 0 0 40px;
}
</style>