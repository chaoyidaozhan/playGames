<template>
    <div class="exchange_bg">
        <div class="exchange_word">
            {{words}}
        </div>
    </div>    
</template>
<script>
export default {
    data(){
        return{
            words:"",
        }
    },
    methods:{

    },
    created(){
        let lotteryId = this.$route.query.lotteryId;
        let activityName = 'conference_823';
        let memberId = window.memberId;
        this.axios.put(`/lottery/${activityName}/${memberId}/${lotteryId}/finish`).then(res => {
            let hasPermission = res.hasPermission;
            let alreadyExchange = res.alreadyExchange;
            if(hasPermission){
                if(alreadyExchange){
                    this.words = '已核销';
                }else{
                    this.words = '核销成功';
                }
            }else{
                this.words = '无核销权限';
            }
        })
    }
}
</script>
<style lang="less">
    .exchange_bg{
        background: url('../../asset/images/catchdoll/main_bg.png');
        .exchange_word{
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 10vw;
            color: #FFF;
            transform: translate(-50%, -50%);
        }
    }
</style>
