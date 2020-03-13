<template>
    <div class="contante">
        <div class="main" v-if="msg.count==1">
            <div class="main-data">
                <span>
                    <i>日期：</i>
                    {{data.Riqi}}
                </span>
                <span>
                    <i>所属煤矿：</i>
                    {{data.MKName}}
                </span>
                <span>
                    <i>日产量：</i>
                    {{data.ChanLiang}}
                </span>
                <span>
                    <i>月产量：</i>
                    {{data.ChanLiang}}
                </span>
                <span>
                    <i>年产量：</i>
                    {{data.Year}}
                </span>
                <span>
                    <i>总人数：</i>
                    {{data.People}}
                </span>
            </div>
            <div class="menu">
                <div v-for="(item,index) in data.detail" :key="index">
                    <div class="menu-z">职位：{{item.zhiwei}}</div>
                    <div class="menu-r">人数：{{item.count}}</div>
                </div>
            </div>
        </div>
        <div class="main" v-else-if="msg.count==2">
            <div class="main-data1">
                <span>
                    <i>日期：</i>
                    {{data.ret.Riqi}}
                </span>
                <span>
                    <i>所属煤矿：</i>
                    {{data.ret.MKName}}
                </span>
                <span>
                    <i>月产量：</i>
                    {{data.ret.countMonth}}
                </span>
                <span>
                    <i>年产量：</i>
                    {{data.ret.countYear}}
                </span>
            </div>
            <div class="menu menu-two">
                <div v-for="(item,index) in data.list" :key="index">
                    <div class="menu-d">日期：{{item.Riqi}}</div>
                    <div class="menu-r">产量：{{item.ChanLiang}}</div>
                    <div class="menu-r">超产：{{item.ExtraOutput}}</div>
                </div>
            </div>
        </div>
        <div class="aside" v-else>
            <div class="main-data1 aside-data">
                <span>
                    <i>地址：</i>
                    {{data.AddrName}}
                </span>
                <span>
                    <i>点号：</i>
                    {{data.cedian}}
                </span>
                <span>
                    <i>值：</i>
                    {{data.yuzhi}}
                </span>
                <span>
                    <i>阈值：</i>
                    {{data.zhi}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        msg: {
            type: Object,
            default: 'hello world'
        }
    },
    data() {
        return {
            url: '',
            data: ''
        };
    },
    created() {
        if (this.msg.count == 1) {
            this.url = '/admin/peopleDetail';
        } else if (this.msg.count == 2) {
            this.url = '/admin/cldetail';
        } else {
            this.url = '/admin/WaranigDetail';
        }
        this.handleLogin();
    },
    methods: {
        async handleLogin() {
            var data = { id: this.msg.id, type: this.msg.type };
            const res = await this.$http.post(this.url, data);
            this.data = res.data.data;
        }
    }
};
</script>

<style scoped>
.aside{
    width: 650px;
    height: 170px;
    background: #fff;
    border-radius: 10px;
}
.aside-data>span{
    margin-top: 20px;
}
.menu {
    border-top: 3px solid #999;
    margin-top: 4px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 10px;
    width: 100%;
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.menu-r {
    margin-top: 2px;
}
.menu > div,
.menu-two > div {
    margin-top: 10px;
    width: 22%;
    height: 80px;
    border-radius: 10px;
    background: #666;
    color: #fff;
    font-size: 14px;
}
.menu > div > div {
    margin-left: 20px;
}
.menu-z {
    margin-top: 20px;
    font-weight: bolder;
}
.menu-d {
    margin-top: 10px;
    font-weight: bolder;
}
.main {
    width: 850px;
    height: 500px;
    border-radius: 10px;
    background-color: #ffffff;
}
.contante {
    width: 100%;
    height: 100%;
}
.main-data,
.main-data1 {
    margin-left: 80px;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
}
i {
    display: inline-block;
    width: 80px;
    height: 36px;
    line-height: 36px;
    font-style: normal;
    font-weight: bolder;
    font-size: 15px;
    color: #666;
}
.main-data > span,
.main-data1 > span {
    width: 33%;
    font-size: 14px;
    color: #8e236b;
    font-weight: bolder;
}
.main-data1 > span {
    width: 50%;
}
</style>