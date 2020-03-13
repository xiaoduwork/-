<template>
    <div>
        <el-col :md="6">
            <div class="grid-content bg-purple">
                <div class="main-img"><img src="../../assets/img/2.png" alt=""></div>
                <div class="main-img"><img src="../../assets/img/2.png" alt=""></div>
                <div class="main-img"><img src="../../assets/img/2.png" alt=""></div>
            </div>
        </el-col>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg-purple {
    background: #229bc1;
}
.main-img{
    width: 100%;
    background: #012464;
    text-align: center;
}
.main-img>img{
    width: 98%;
}
</style>