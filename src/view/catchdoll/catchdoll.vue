<template>
    <div :class="prefixCls">
        <div :class="prefixCls + '-header'"></div>
        <div :class="prefixCls + '-body'">
            <div :class="prefixCls + '-body-bubble'"></div>
        </div>
        <div :class="prefixCls + '-footer'">
            <div :class="prefixCls + '-footer-repeat'"></div>
        </div>
    </div>
</template>
<script>
    const prefixCls = 'machine'
    export default {
        name: 'CathDoll',
        data() {
            return {
                prefixCls
            }
        }
    }
</script>
<style lang="less" scoped>
    @keyframes switchBg {
        from {
            background-image: url('../../asset/images/catchdoll/flash_1.png');
        }
        to {
            background-image: url('../../asset/images/catchdoll/flash_2.png');
        }
    }
    .machine {
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        background-color: #eb443d;
        &-header {
            width:620px;
            height:209px;
            background:rgba(254,226,186,1);
            box-shadow:0px 12px 3px 2px rgba(112,112,112,0.23);
            border-radius:24px;
            margin: 50px auto 20px;
        }
        &-body {
            width: 100%;
            width: 670px;
            // height: 842px;
            flex: 1;
            background: url('../../asset/images/catchdoll/machine-bg.png') no-repeat center;
            background-size: 100% 100%;
            position: relative;
            z-index: 10;
            &-bubble {
                position: absolute;
                width: 750px;
                height: 142px;
                background: url('../../asset/images/catchdoll/bg_top.png') no-repeat center;
                background-size: 100% 100%;
                left: 50%;
                margin-left: -375px;
                z-index: 2;
            }
            &:before, &:after {
                position: absolute;
                content: '';
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
                width: 40px;
                bottom: 0;
                top: 0;
                background-image: url('../../asset/images/catchdoll/flash_1.png');

                // animation: switchBg 1s linear infinite;
            }
            &:before {
                left: -30px;
            }
            &:after {
                background-image: url('../../asset/images/catchdoll/flash_2.png');

                right: -30px;
            }
        }
        &-footer {
            width: 750px;
            height: 320px;
            z-index: 8;
            margin-top: -80px;
            position: relative;
            &:after {
                width: 100%;
                height: 100%;
                content: '';
                display: block;
                background: url('../../asset/images/catchdoll/machine-bottom-bg.png') no-repeat center;
                background-size: contain;
                position: relative;
            }
            &-repeat {
                width: 750px;
                background: url('../../asset/images/catchdoll/repeat.png') repeat-y center;
                background-size: 100% 65px;
                top: 240px;
                bottom: 0;
                width: 100%;
                position: absolute;
            }
        }
    }
</style>