<template>
    <div class="main_first" style="overflow: hidden;">
        <div class="main_top">
            <img src="../../asset/images/catchdoll/main_xydsj.png"  class="main_world_xydsj"/>
        </div>
        <div class="main_body">
            <div class="main_body_left">
                <!-- <div class="main_world_rule">
                    规则
                </div>
                <div class="main_world_rules">
                    欢迎进入小友的世界，<br/>点击开始—GO—开始抓一抓,<br/>更多惊喜等你来挑战！<br/>点击礼品箱可查看您已获得的礼品哦！<br/>每人每天有一次可参与游戏的机会哦！
                </div> -->
            </div>
        </div>

        <div class="cloud"></div>
        <div class="main_contain">
            <div @click="toGift" class="main_contain_gift">
            </div>
            <img src="../../asset/images/catchdoll/main_xiaoyou.png"  class="main_world_xiaoyou"/>
            <div class="main_contain_start" @click="toCatchDoll"></div> 
        </div>
        <div class="catch-shade" v-if="flag === 1">
        </div>
        <div class="catch-dialog" v-if="flag === 1">
            <div class="catch-dialog-word">温馨提示</div>
            <div class="catch-tie2">
                <div class="catch-bottom-words">
                    您还未参加小友大世界,暂时没有可以兑换的礼物哦~
                </div>
                <div class="catch-bottom">
                    <img src="../../asset/images/catchdoll/change_btn.png" class="change_button"/>
                    <div class="change_word" @click="changeFlag()">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            gifts:[],
            flag:0,
        }
    },
    mounted(){
    },
    methods:{
        changeFlag(){
            this.flag = 0;
        },
        toCatchDoll(){
            //调取接口
            let memberId = 'aaa';
            this.axios.get(`/${memberId}/start`).then(res => {
                res = JSON.parse(res.data)
                if(res.data.hasPermission){
                    this.$router.push({path:"/catchdoll", query:{sequence:res.data.sequence}});
                }else{
                    alert('您没有次数了,每天分享可多一次参与机会哦');
                }
            })  
        },
        toGift(){
            let activityName = 'conference_823';
            let memberId = window.memberId;
            this.axios.get(`/lottery/${activityName}/${memberId}/record/list`).then(res => {
                this.gifts = res;
                if(this.gifts.length === 0){
                    this.flag = 1;
                }else{
                    this.$router.push({path:"/catchdoll/gift", query:{gifts:encodeURIComponent(JSON.stringify(this.gifts)), isfromMain:1}});
                }
            })  
        }
    }
}
</script>
<style lang="less">  
    // @import '../../asset/fonts/font.css';
    .main_first{
        height: 100%;
        background: url('../../asset/images/catchdoll/main_bg.png');
        .main_top{
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            top:3vh;
            @media screen and(min-width: 500px) {
                top:1vh;
            }
            .main_world_xydsj{
                display: inherit;
                margin: auto;
                width:650px;
                height: 140px;
            }
        }
        .main_body{
            position: relative;
            width: 100vw;
            left: 50%;
            transform: translateX(-50%);
            top: 4vh;
            // top:16.7vh;
            @media screen and(min-width: 500px) {
                top:2vh;
            }
            .main_body_left{
                width: 338px;
                height: 165px;
                @media screen {
                    width: 225px;
                    height: 125px;
                }
                @media screen and(min-width: 500px) {
                    width: 450px;
                    height: 250px;
                }
                // height: 20vh;
                display: inline-block;
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                background: url('../../asset/images/catchdoll/words.png');
                background-size:100% 100%;
                // .main_world_rule{
                //     height:48px;
                //     font-size:48px;
                //     font-family:DFL;
                //     color:rgba(243,243,243,1);
                //     line-height:48px;
                // }
                // .main_world_rules{
                //     display: inline-block;
                //     height:225px;
                //     font-size:30px;
                //     font-family:AlibabaPuHuiTiM;
                //     color:rgba(243,243,243,1);
                //     line-height:42px;
                // }
            }
        }
        .main_contain{
            position: relative;
            margin-top: 50px;
            width: 100vw;
            height: 59vh;
            left: 50%;
            transform: translateX(-50%);
            // top: 15vh;
            // @media screen and(min-width: 500px) {
            //     width: 632px;
            //     height: 409px;
            //     //  top: 15vh;
            // }
            // @media screen and(min-height: 600px) {
            //     top: 41vh;
            // }
            .main_contain_gift{
                position: absolute;
                width: 26vw;
                height: 28vw;
                left: 3vw;
                top: 2vh;
                z-index: 10;
                background: url('../../asset/images/catchdoll/main_gift.png');
                background-size: 100% 100%;
                @media screen and(min-width: 500px) {
                    left: 11vw;
                    width: 20vw;
                    height: 20vw;
                }
            }
            .main_world_xiaoyou{
                position: absolute;
                width:700px;
                height: 714px;
                left: 53%;
                transform: translateX(-50%);
                @media screen and(min-width: 500px) {
                    width: 587px;
                    height: 409px;
                }
                @media screen and(max-height: 716px) {
                    width: 92vw;
                    height: 50vh;
                }
            }
            .main_contain_start{
                position: absolute;
                width: 240px;
                // height: 289px;
                height: 21vh;
                right: 44px;
                top: 36vh;
                background: url('../../asset/images/catchdoll/main_start.png');
                background-size: 100% 100%;
                @media screen and(min-width: 500px) {
                    top: 29vh;
                    right: 93px;
                    width: 168px;
                    height: 168px;
                }
                // @media screen and(max-height: 716px) {
                //     // width: 92vw;
                //     height: 50vh;
                // }
            }
        }
        .main_world_cloud{
            position: absolute;
            width: 100%;
            height: 596px;
            top: 1120px;
        }
        .cloud {
            position: absolute;
            width: 100%;
            padding-bottom: 77%;
            bottom: 0;
            left: 0;
            background-image: url('../../asset/images/catchdoll/main_cloud.png');
            background-position: center bottom;
            background-size: cover;
            background-repeat: no-repeat;
        }
        .catch-shade{
            position: fixed;
            background: #000;
            opacity: 0.5;
            width: 100vw;
            height: 100vh;
            top: 0;
            z-index: 12;
        }
         .catch-dialog{
            position: absolute;
            width: 669px;
            height: 928px;
            z-index: 12;
            background: url('../../asset/images/catchdoll/catchdoll_dialog.png') no-repeat center;
            background-size:100%;
            top: 40%;
            left: 50%;
            transform: translate(-50%,-50%);
            .catch-dialog-word{
                width: 62vw;
                position: absolute;
                text-align: center;
                font-size: 6vw;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #fff;
                line-height: 9.333vw;
                top:32%;
                // top: 47vw;
                // @media screen and(min-height: 800px) {
                //     top: 28.6vh;
                // }
                // @media screen and(min-width: 500px) {
                //     top: 30vw;
                // }
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
            }

            .catch-tie2{
                position:absolute;
                height: 43%;
                width: 58%;
                left: 50%;
                bottom: 5%;
                transform: translateX(-50%);
                z-index: 12;
                .catch-bottom-words{
                    line-height: 8vw;
                    font-size: 5vw;
                    color: #FFF;
                    font-family: PingFangSC-Semibold;
                    letter-spacing: .5vw;
                }
                .catch-bottom{
                    position: relative;
                    margin-top: 10vw;
                    .change_button{
                        width: 32vw;
                        position: absolute;
                        transform: translateX(-50%);
                        left: 50%;
                    }
                    .change_word{
                        color: #f3f3f3;
                        position: absolute;
                        left: 50%;
                        text-align: center;
                        transform: translateX(-50%);
                        top: 2vw;
                        width:191px;
                        height:56px;
                        font-size:40px;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(243,243,243,1);
                        line-height:56px;
                        text-shadow:0px 2px 2px rgba(225,76,70,0.3);
                    }
                }
            }
        }

    }
</style>
