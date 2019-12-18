<template>
    <div class="gift_bg" >
        <div class="gift_top">
        </div>
        <div class="gift_out_body">
        <div class="gift_in_body">
            <div class="gift_out">
                <div class="gift_body" v-scrollBar >
                    <div class="catch-tie-words" v-for="(item,index) in changeWords" :key="index">
                        <div class="catch-tie-words-bg" v-if="item.status === 'unchecked'" @click="toChange(item.qrCodeUrl + item.lotteryId)">
                            <!-- <img class="catch-tie-img" src="../../asset/images/catchdoll/gift_block.png"/> -->
                            <div class="catch-tie-word">{{item.prizeName}}</div>
                            <div class="catch-tie-word2">未兑换</div>
                        </div>
                        <div class="catch-tie-words-bg" v-else>
                            <!-- <img class="catch-tie-img" src="../../asset/images/catchdoll/gift_block.png"/> -->
                            <div class="catch-tie-word">{{item.prizeName}}</div>
                            <div class="catch-tie-word3">已兑换</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gift_content">
                <div class="catch-tie-gift">
                    点击您获得的礼品券，出示二维码给友空间<br/>工作人员即可获取惊喜礼品~
                </div>
                <div class="catch-tie-words" >
                    <!-- <img class="catch-tie-img" src="../../asset/images/catchdoll/gift_block2.png"/> -->
                    <div class="catch-tie-word">请前往红树林会议中心三楼<br/>协同云展区兑换<br/>先到先得兑完即止</div>
                </div>
                <!-- <div class="catch-tie-gift2">
                
                </div> -->
            </div>
        </div>
        </div>
        <!-- <div class="gift_bottom_content"></div> -->
        <div class="gift_bottom" @click="toShare">
            <!-- <img src="../../asset/images/catchdoll/share_btn.png" class="share_button"/> -->
            <!-- <div class="share_word" >分享</div> -->
            <div class="share_word" >
            </div>
        </div>
        <div class="bottom_words">
            您可点击“分享”把小友大世界分享给更多小伙伴，<br/>
            同时您也可以多获得一次进入小友大世界的机会！<br/>
        </div>
    </div>    
</template>
<script>

export default {
    data(){
        return{
            changeWords:[
                // {'counts': '1~3个可兑换','prizeName':'「椰风十里」','id':1},
                // {'counts': '4~6个可兑换','prizeName':'「椰风十里」','id':0},
                // {'counts': '7~9个可兑换','prizeName':'「椰风十里」','id':0},
                // {'counts': '1~3个可兑换','prizeName':'「椰风十里」','id':1},
                // {'counts': '4~6个可兑换','prizeName':'「椰风十里」','id':0},
                // {'counts': '7~9个可兑换','prizeName':'「椰风十里」','id':0},
                // {'counts': '10个可兑换','name':'「椰风十里」','id':0}
            ],
        }
    },

    methods:{
        toShare(){
            let activityName = 'conference_823';
            let memberId = window.memberId;
        },
        toChange(url){
            this.$router.push({path:"/catchdoll/qrcode", query:{giftUrl:url}});
        }
    },

    mounted(){
        let activityName = 'conference_823';
        let memberId = window.memberId;
        this.axios.get(`/lottery/${activityName}/${memberId}/record/list`).then(res => {
            this.gifts = res;
            this.changeWords = this.gifts;
        })  
        // this.changeWords = JSON.parse(decodeURIComponent(this.$route.query.gifts));
    },

}
</script>
<style lang='less' scoped>

        // /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
        // ::-webkit-scrollbar
        // {
        //     width: 16px;
        //     height: 16px;
        //     background-color: #F5F5F5;
        // }
        
        // /*定义滚动条轨道 内阴影+圆角*/
        // ::-webkit-scrollbar-track
        // {
        //     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        //     border-radius: 10px;
        //     background-color: #F5F5F5;
        // }
        
        // /*定义滑块 内阴影+圆角*/
        // ::-webkit-scrollbar-thumb
        // {
        //     border-radius: 10px;
        //     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        //     background-color: #555;
        // }
    @keyframes switchBg {
        from {
            background-image: url('../../asset/images/catchdoll/flash_1.png');
        }
        to {
            background-image: url('../../asset/images/catchdoll/flash_2.png');
        }
    }
    @-webkit-keyframes switchBg {
        from {
            background-image: url('../../asset/images/catchdoll/flash_1.png');
        }
        to {
            background-image: url('../../asset/images/catchdoll/flash_2.png');
        }
    }
    .gift_bg{
        background: url('../../asset/images/catchdoll/gift_bg.png');
        .gift_top{
            background: url('../../asset/images/catchdoll/gift_main111.png');
            background-size: 100%;
            height: 425px;
            width:100%;
        }
        .gift_out_body{
            min-height: 51vh;
            .gift_in_body{
                position: relative;
                .gift_out{
                    position: relative;
                    .gift_body{
                        position: relative;
                        // max-height: 47vw;
                        width: 79vw;
                        margin: auto;
                        .catch-tie-words{
                            position: relative;
                            @media screen {
                                margin-top:8px;
                            }
                            .catch-tie-words-bg{
                                width:79vw;
                                height: 22vw;
                                background: url('../../asset/images/catchdoll/gift_block.png');
                                background-size: 100% 100%;
                                .catch-tie-img{
                                    width:79vw;
                                    height: 22vw;
                                }
                                .catch-tie-word{
                                    font-size: 5vw;
                                    position:absolute;
                                    text-align: center;
                                    left:50%;
                                    top: 2vw;
                                    transform:translateX(-50%);
                                    width: 47vw;
                                }
                                .catch-tie-word2{
                                    position:absolute;
                                    text-align: center;
                                    left:50%;
                                    transform:translateX(-50%);
                                    top: 13vw;
                                    background: #FFC053;
                                    border-radius: 6px;
                                    width: 18vw;
                                    height: 6vw;
                                    font-size: 3vw;
                                    color: #fff;
                                    line-height: 6vw;
                                }
                                .catch-tie-word3{
                                    position:absolute;
                                    text-align: center;
                                    left:50%;
                                    transform:translateX(-50%);
                                    top: 13vw;
                                    background: #DCDCDC;
                                    border-radius: 6px;
                                    width: 18vw;
                                    height: 6vw;
                                    font-size: 3vw;
                                    color: #fff;
                                    line-height: 6vw;     
                                }
                            }
                        }
                        .ps__thumb-y{
                            width: 1vh;
                            // height: 16vh !important;
                            opacity: 1;
                            background: rgb(255, 255, 255);
                            z-index: 10 !important;
                        }
                        .ps__rail-y{
                            widows: 1vh;
                            opacity: 1;
                            // background: #F5F5F5;
                        }
                    }
                }
                &:before, &:after{
                    display: block;
                    content:"";
                    position: absolute;
                    top: 0;
                    width:40px;
                    height: 100%;
                    background: url('../../asset/images/catchdoll/flash_1.png');
                    background-size: 100%;
                    animation: switchBg 1s linear infinite;
                }
                &:before{
                    left:30px;
                }
                &:after{
                    right:30px;
                }
            }
        }

        .gift_content{
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 10px;
            .catch-tie-gift{
                position: relative;
                width: 79vw;  
                height: 12vw;
                font-size:22px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(230,230,230,1);
                line-height:30px;
                text-align: center;
                margin:auto;
            }
            .catch-tie-words{
                background: url('../../asset/images/catchdoll/gift_block2.png');
                background-size: 100% 100%;
                position: relative;
                height: 14vh;
                width: 79vw;
                margin: auto;
                // .catch-tie-img{
                //     width:79vw;
                //     height: 22vw;
                // }
                .catch-tie-word{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 47vw;
                    text-align: center;
                    // position:absolute;
                    // text-align: center;
                    // left:50%;
                    // top: 5vw;
                    // transform:translateX(-50%);
                    // width: 47vw;
                }
            }
            
        }
        // .gift_bottom_content{
        //     position: relative;
        //     min-height: 8vh;
        // }
        .gift_bottom{
            position: relative;
            width: 100vw;
            height: 18vw;
            margin-top: 8vh;
            .share_button{
                width: 81vw;
                position: absolute;
                transform: translateX(-50%);
                left: 50%;
            }
            .share_word{
                position:relative;
                margin:auto;
                text-align:center;
                font-size:6.333vw;
                font-family:PingFangSC-Regular;
                font-weight:300;
                color:#f3f3f3;
                width:81vw;
                background:url(../../asset/images/catchdoll/share_btn.png) no-repeat;
                height:100%;
                background-size: 100%;
                .word{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    letter-spacing: 6vw;
                    transform: translate(-50%,-50%);
                }
            }
        }
        .bottom_words{
            position: relative;
            width: 100%;
            height: 12vw;
            font-size: 2.933vw;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #e6e6e6;
            line-height: 4vw;
            text-align: center;
        }
    }
</style>
