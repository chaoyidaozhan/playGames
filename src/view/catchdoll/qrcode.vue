<template>
    <div class="qrcode_bg">
        <div id="qrcode">
        </div>
    </div>    
</template>
<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
    data(){
        return {

        }
    },
    mounted(){
        let codeUrl = 'http:www.baidu.com'; 
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 300,
            height : 300
        });
        function makeCode () {      

        }
        qrcode.makeCode(codeUrl);
    }
}
</script>
<style lang="less">
    .qrcode_bg{
        background: url('../../asset/images/catchdoll/main_bg.png');
        height: 100vh;
        #qrcode{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
