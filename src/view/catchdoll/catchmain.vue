<template>
    <div :class="prefix">
        <div :class="prefix+'-header'"></div>
        <div :class="prefix+'-body'">
            <div :class="prefix+'-body-left'">
                <div :class="prefix+'-body-left-top'"></div>
                <div :class="prefix+'-body-left-rules'">
                    欢迎进入小友的世界，<br/>点击开始——GO——开始抓一抓<br/>更多小友更多惊喜等你来挑战！<br/>点击礼品箱可查看您已获得的礼品哦！
                </div>
            </div>
            <div :class="prefix+'-body-right'">
            </div>
        </div>
        <div :class="prefix+'-bottom'">
            <div :class="prefix+'-bottom-cloud'"></div>
            <div :class="prefix+'-bottom-bg'"></div>
            <div :class="prefix+'-bottom-start'"></div>
        </div>
    </div>
</template>
<script>
const prefix="machine";
export default {
    data(){
        return{
            prefix
        }
    }
}
</script>
<style lang="less">
    .machine{
        display: flex;
        background: url('../../asset/images/catchdoll/main_bg.png');
        flex-direction: column;
        align-content: center;
        align-items: center;
        &-header{
            width: 670px;
            height: 185px;
            background: url('../../asset/images/catchdoll/main_xydsj.png') no-repeat center;
            background-size:100% 100%;
            margin:51px auto 11px;
        }
        &-body{
            width: 613px;
            height: 221px;
            margin:auto;
            &-left{
                width: 408px;
                float: left;
                display: inline-block;
                &-top{
                    width: 100px;
                    height: 54px;
                    background:url('../../asset/images/catchdoll/main_rule.png') no-repeat center;
                    background-size: 100% 100%;
                }
                &-rules{
                    width: 408px;
                    height: 172px;
                    font-size:24px;
                    color: #FFF;
                }
            }
            &-right{
                display: inline-block;
                width: 205px;
                height: 221px;
                background: url('../../asset/images/catchdoll/main_gift.png') no-repeat center;
                background-size: 100% 100%;
            }
        }

        &-bottom{
            width: 748px;
            flex:1;
            position: relative;
            &-cloud{
                position: absolute;
                width: 100%;
                height: 596px;
                // top:272px;/
                bottom:0;
                background: url('../../asset/images/catchdoll/main_cloud.png') no-repeat;
                background-size: 100% 100%
            }
            &-bg{
                position: absolute;
                width: 100%;
                height: 714px;
                background:url('../../asset/images/catchdoll/main_xiaoyou.png') no-repeat;
                background-size: 100% 100%
            }
            &-start{
                position: absolute;
                width: 225px;
                height: 237px;
                top: 46px;
                background: url('../../asset/images/catchdoll/main_start.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>