<template>
    <div :class="prefix">
        <div :class="prefix + '-header'">
            <!-- <audio id="musicopen" :src="currentSong" muted autoplay controls="" @ended="nextsong()" ></audio> -->
            <audio id="musicopen" :src="currentSong" loop="loop" muted>></audio>
            <div v-if="openMusic" :class="prefix + '-header-music'"  ></div>
            <div v-if="!openMusic" :class="prefix + '-header-music-close'" ></div>
            <div :class="prefix + '-header-cloth'">
                <div class="message">
                    <div class="message1">
                        <div class="message1_1">
                            已抓:
                            <div class="message1_1_catched">{{wawa}}个</div>
                        </div>
                        <div class="message1_2">
                            剩余次数:
                            <div class="message1_2_count">{{leaveCount}}次</div>
                        </div>
                    </div>
                    <div class="message2">
                        倒计时:
                            <div class="message2_progress">
                                <div class="message2_progress_bottom">
                                </div>
                            </div>{{time}}S
                    </div>
                </div>
            </div>
        </div>
        <div :class="prefix + '-body'">
            <div :class="prefix + '-body-blind'">
            </div>
            <div class="boy">
                <div class="boy-body0 transLeft1">
                    <img class="boy-img" style='width:16vw' src='../../asset/images/catchdoll/wawa_2.png'/>
                </div>
            </div>
            <div class="words_display"> 
                <img class="words" src="../../asset/images/catchdoll/fail.png" />
            </div>
            <div class="clamp"> 
                <div class="clamp-body">
                    <div class="stick">
                        <div class="stick_progress"></div>
                    </div>
                    <div class="claw">
                        <div class="top-claw">
                            <img class="clamp-top-img" src="../../asset/images/catchdoll/top.png" />
                        </div>
                        <div class="bottom-claw">
                            <div class="left-claw">
                                <img class="clamp-left-img" src="../../asset/images/catchdoll/left.png" />
                            </div>
                            <div class="right-claw">
                                <img class="clamp-right-img" src="../../asset/images/catchdoll/right.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="prefix + '-footer'">
            <div :class="prefix + '-footer-repeat'">
            </div>
            <div :class="prefix + '-footer-bg'">
                <div class="catch-button" v-preventReClick>
                    <img class="catch-img" src="../../asset/images/catchdoll/start_btn.png"/>
                </div>
            </div>
        </div>
        <div class="catch-shade" v-if="flag === 1">
        </div>
        <div class="catch-dialog" v-if="flag === 1">
            <div class="catch-dialog-word" v-if="this.leaveCount === 0">恭喜您获得了{{wawa}}个小友</div>
            <div class="catch-dialog-word2" v-if="this.leaveCount > 0 && time === 0">时间已到</div>
            <div class="catch-tie" v-if="wawa!=0 && changeWords.length > 0">
                <div class="catch-tie-words" v-for="(item,index) in changeWords" :key="index">
                    <img v-if="prizeId===item.id" class="catch-tie-img" src="../../asset/images/catchdoll/tie.png"/>
                    <img v-else class="catch-tie-img" src="../../asset/images/catchdoll/tie2.png"/>
                    <div v-if="item.min !== item.max" class="catch-tie-word">{{item.min}}-{{item.max}}个可兑换「{{item.name}}」</div>
                    <div v-else class="catch-tie-word">{{item.min}}个可兑换「{{item.name}}」</div>
                </div>
                <div v-if="wawa > 0" class="catch-bottom">
                    <img src="../../asset/images/catchdoll/change_btn.png" class="change_button"/>
                    <div class="change_word" @click="toChange()">兑换</div>
                </div>
                <div class="machine-bulb3">
                </div>
                <div class="machine-bulb4">
                </div>
            </div>
            <div class="catch-tie2" v-if="wawa === 0 || time === 0">
                <div class="catch-bottom-words" v-if="this.leaveCount > 0 && time === 0">
                    知道您非常喜欢待在小友的世界哦，但是您的时间已用完，请重新进入游戏再来找小友玩耍吧~
                </div>
                <div class="catch-bottom-words2" v-if="this.leaveCount === 0 && wawa === 0">
                    好遗憾呀，您没办法兑换小礼物了呢。快点击<br/>“再来一次”，来和小友再次玩耍吧！
                </div>
                <div v-if="this.leaveCount > 0 && time === 0" class="catch-bottom">
                    <img src="../../asset/images/catchdoll/change_btn.png" class="change_button"/>
                    <div class="change_word" @click="toHome()">确定</div>
                </div>
                <div v-if="this.leaveCount === 0 && wawa === 0" class="catch-bottom2">
                    <img src="../../asset/images/catchdoll/change_btn.png" class="change_button"/>
                    <div class="change_word" @click="toHome()">再来一次</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const prefix = "machine";
export default {
    data(){ 
        return {
            flag:0,
            number:0,
            openMusic:1,
            currentSong:`${require('../../asset/audio/haizeiwang.mp3')}`,
            catched:1,
            toys:[],
            time:180,
            leaveCount:10,
            wawa:0,
            changeWords:[
                // {'counts': '1~3个可兑换','name':'「椰风十里」','id':1},
                // {'counts': '4~6个可兑换','name':'「椰风十里」','id':0},
                // {'counts': '7~9个可兑换','name':'「椰风十里」','id':0},
                // {'counts': '10个可兑换','name':'「椰风十里」','id':0}
            ],
            prizeId:0,
            intervalFlash: null,
            intervalAddBoy: null,
            gifts:[],
            prefix,
            stickHeightOrigin:0,
            clawTopOrigin:0,
            disabled:false,
            isCatched:true,
            clampOriginBody:0,
            isReturn:false,
            isRoll:false,
        }
    },
    methods:{
        toHome(){
            this.$router.go(-1);
        },
        leaveCountMoreZero(clawBoy){
            let _this = this;
            let activityName = 'conference_823';
            let memberId = window.memberId;
            let sequence = this.$route.query.sequence;
            
            window.addEventListener("offline", function () {
                //当断网的时候触发的回调
                alert("网络异常请重新链接")
                window.addEventListener("online", function () {
                //当联网的时候触发的回调
                    _this.leaveCountMoreZero();
                }, false);
            }, false);
            setTimeout(()=>{
                // this.axios.post(`/lottery/${activityName}/${memberId}/lottery?sequence=${sequence}&remainNum=${this.leaveCount+1}`).then(res => {
                    this.isReturn = true;
                    // if(res.win){
                    if(1){
                        setTimeout(()=>{
                            $(clawBoy).css("transition", "1s ease all");
                            $(clawBoy).css("opacity", "0");
                            this.wawa++;
                        },400) 
                        $('.words').attr("src", `${require('../../asset/images/catchdoll/success.png')}`);
                        
                        setTimeout(()=>{
                            $(clawBoy).remove();//移除这个元素
                            $('.words_display').css("opacity","1");
                            $('.words_display').css("animation","b .3s linear infinite");
                            setTimeout(()=>{
                                $('.words_display').css("opacity","0");
                                $('.words_display').css("animation","none");
                                if(this.isRoll){
                                    // $(".claw").css("animation", "c 5s linear"); 
                                    // $(".claw").css("-webkit-animation", "c 5s linear"); 
                                    setTimeout(()=>{
                                        this.catched = 1;
                                        let hascatched = document.querySelector('.catch-img');
                                        hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                    },3000);
                                }else{
                                    setTimeout(()=>{
                                        this.catched = 1;
                                        let hascatched = document.querySelector('.catch-img');
                                        hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                    },1000);
                                }
                            },800)
                        },800);
                    }else{
                        //夹中娃娃但是失败了
                        $(clawBoy).css("left", "40%");   
                        setTimeout(()=>{
                            $(clawBoy).css("bottom", 0);
                            $(clawBoy).css("transform", "rotate(93deg)");
                            $(clawBoy).css("transition", "1s ease all");
                            $(clawBoy).css("opacity", "0");
                            $('.words').attr("src", `${require('../../asset/images/catchdoll/fail2.png')}`);
                            setTimeout(()=>{
                                $(clawBoy).remove();//移除这个元素
                                // if(this.isRoll){
                                //     $(".claw").css("animation", "c 5s linear"); 
                                //     $(".claw").css("-webkit-animation", "c 5s linear"); 
                                // }
                                $('.words_display').css("opacity","1");
                                $('.words_display').css("animation","b .3s linear infinite");
                                setTimeout(()=>{
                                    $('.words_display').css("opacity","0");
                                    $('.words_display').css("animation","none");
                                    if(this.isRoll){
                                        setTimeout(()=>{
                                            this.catched = 1;
                                            let hascatched = document.querySelector('.catch-img');
                                            hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                        },2100);
                                    }else{
                                        setTimeout(()=>{
                                            this.catched = 1;
                                            let hascatched = document.querySelector('.catch-img');
                                            hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                        },1000);
                                    }
                                },900);
                            }, 800);
                        },500);
                    }
                // }).catch(error=>{
                //     alert("网络异常，请稍后再试")
                // })
            },100);
        },
        catchSuccess(clawBoy,isCatched,clawTop){
            let _this = this;
            this.isReturn = false;
            this.isRoll = false;
            this.isCatched = 1;
            //调取接口
            let sequence = _this.$route.query.sequence;
            let activityName = 'conference_823';
            let memberId = window.memberId;
            
            var stickHeight=document.querySelector('.stick') && document.querySelector('.stick').offsetHeight;
            var machineBodyHeight=document.querySelector('.machine-body') && document.querySelector('.machine-body').offsetHeight;
            var boyBodyHeight=document.querySelector('.transLeft') && document.querySelector('.transLeft').offsetHeight;

            $(clawBoy).css("-webkit-animation", "none"); 
            $(clawBoy).css("animation", "none"); 
            $(clawBoy).css("left", "38%");        
            $(clawBoy).css("bottom", machineBodyHeight - this.clawTopOrigin-boyBodyHeight);
            $(clawBoy).css("transform-origin", "top"); 
            $(clawBoy).css("-webkit-transform-origin", "top"); 
            // $(".claw").css("animation", "none"); 
            // $(".claw").css("-webkit-animation", "none");
            

            $(".claw").css("animation", "c 5s linear infinite"); 
            $(".claw").css("-webkit-animation", "c 5s linear infinite"); 
            $(clawBoy).css("animation", "c 5s linear infinite");
            $(clawBoy).css("-webkit-animation", "c 5s linear infinite");
            // setTimeout(()=>{
            //     // if(!this.isReturn){
            //         $(".claw").css("animation", "c 5s linear infinite"); 
            //         $(".claw").css("-webkit-animation", "c 5s linear infinite"); 
            //         $(clawBoy).css("animation", "c 5s linear infinite");
            //         $(clawBoy).css("-webkit-animation", "c 5s linear infinite");
            //         this.isRoll = true;
            //     // }
            // },2000);
                if(this.leaveCount > 0){
                    this.leaveCountMoreZero(clawBoy);
                }else{
                    // this.axios.post(`/lottery/${activityName}/${memberId}/lottery/end?sequence=${sequence}&remainNum=1&win=true`).then(res => {
                        this.isReturn = true;
                        this.changeWords = res.prizeSettingList;
                        this.prizeId = res.prizeId;
                        let wawa_tmp = res.catchNumber;
                        if(1){
                        // if(this.wawa != wawa_tmp){
                            //夹中娃娃并且成功
                            $(clawBoy).css("left", "40%");
                            setTimeout(()=>{
                                $(clawBoy).remove();//移除这个元素
                                // if(this.isRoll){
                                //     $(".claw").css("animation", "c 5s linear"); 
                                //     $(".claw").css("-webkit-animation", "c 5s linear"); 
                                // }
                                this.wawa++;
                            }, 400)
                            $('.words').attr("src", `${require('../../asset/images/catchdoll/success.png')}`);
                            setTimeout(()=>{
                                $('.words_display').css("opacity","1");
                                $('.words_display').css("animation","b .3s linear infinite");
                                setTimeout(()=>{
                                    $('.words_display').css("opacity","0");
                                    $('.words_display').css("animation","none");
                                    if(this.leaveCount === 0){
                                        this.flag = 1;
                                    }
                                    if(this.isRoll){
                                        setTimeout(()=>{
                                            let hascatched = document.querySelector('.catch-img');
                                            hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                        },3000);
                                    }else{
                                        setTimeout(()=>{
                                            let hascatched = document.querySelector('.catch-img');
                                            hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                        },1000);
                                    }
                                },1000)
                            },800);
                        }else{
                            //夹中娃娃但是失败了
                            $(clawBoy).css("left", "40%");   
                            setTimeout(()=>{
                                $(clawBoy).css("bottom", 0);
                                $(clawBoy).css("transform", "rotate(93deg)");
                                $(clawBoy).css("transition", "1s ease all");
                                $(clawBoy).css("opacity", "0");
                                $('.words').attr("src", `${require('../../asset/images/catchdoll/fail2.png')}`);
                                setTimeout(()=>{
                                    $(clawBoy).remove();
                                    // if(this.isRoll){
                                    //     $(".claw").css("animation", "c 5s linear"); 
                                    //     $(".claw").css("-webkit-animation", "c 5s linear"); 
                                    // }
                                    $('.words_display').css("opacity","1");
                                    $('.words_display').css("animation","b .3s linear infinite");
                                    setTimeout(()=>{
                                        $('.words_display').css("opacity","0");
                                        $('.words_display').css("animation","none");
                                        if(this.leaveCount === 0){
                                            this.flag = 1;
                                        }
                                        if(this.isRoll){
                                            setTimeout(()=>{
                                                let hascatched = document.querySelector('.catch-img');
                                                hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                            },2000);

                                        }else{
                                            setTimeout(()=>{
                                                let hascatched = document.querySelector('.catch-img');
                                                hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                            },1000);
                                        }
                                    },1000)
                                },900);
                            },500);
                        }                    
                    // }).catch(error=>{
                    //     alert("网络异常，请稍后再试")
                    // })
                }
        },
        toChange(){
            let activityName = 'conference_823';
            let memberId = window.memberId;
            // this.axios.get(`/lottery/${activityName}/${memberId}/record/list`).then(res => {
                // this.gifts = res;
                this.gifts = [];
                this.$router.replace({path:"/catchdoll/gift", query:{gifts:encodeURIComponent(JSON.stringify(this.gifts))}});
            // })  
        },
        openMusicCot(){
            let musicopen = document.querySelector(".machine-header-music");
            let music = document.querySelector("#musicopen");
            let _this = this;
            musicopen.addEventListener('touchstart', function(e) {
                music.load();
                if(_this.openMusic){
                    music.pause();
                }else{
                    music.play();
                }
                _this.openMusic = !_this.openMusic;
            }, false);

            window.addEventListener("touchstart", this.forceSafariPlayAudio(), false);

        },
         forceSafariPlayAudio() {
            let music = document.querySelector("#musicopen");
            music.load(); // iOS 9   还需要额外的 load 一下, 否则直接 play 无效
            music.play(); // iOS 7/8 仅需要 play 一下
        },
        catchdoll(){
            var _this = this;
            var hascatched = document.querySelector('.catch-img');
            hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/go.png')}`)

            console.log("this.catched:"+this.catched)
                if(this.catched){
                    this.catched = 0;
                    if(this.leaveCount>0){
                        this.leaveCount--;
                    }

                    var stickHeight=document.querySelector('.stick').offsetHeight;
                    var clawTop=document.querySelector('.claw').offsetTop;
                    this.clampOriginBody=document.querySelector('.clamp-body').offsetHeight;
                    this.stickHeightOrigin = stickHeight;
                    this.clawTopOrigin = clawTop;
                    console.log("棍子高度：" + stickHeight);

                    var boyBodyHeight=document.querySelector('.transLeft1') && document.querySelector('.transLeft1').offsetTop;
                    // var clawHeight=boyBodyHeight-stickHeight;
                    var sticktranslate = stickHeight-clawTop - 10;
                    // document.querySelector('.stick').style.height=boyBodyHeight;
                    // document.querySelector('.stick').style.transition='height 100ms';

                    $('.stick_progress').css("transition", "1s ease all")
                    $('.stick_progress').css("-webkit-transition", "1s ease all")
                    $('.stick_progress').css("transform", "translateY(0)");
                    $('.stick_progress').css("-webkit-transform", "translateY(0)");
                    $('.claw').css("transform", "translateY(" + sticktranslate +"px)");
                    $('.claw').css("-webkit-transform", "translateY(" + sticktranslate +"px)");
        
                    var leftImg=document.querySelector('.clamp-left-img');
                    var rightImg=document.querySelector('.clamp-right-img');
                    leftImg.style.transform = 'rotate(25deg)';
                    leftImg.style.webkitTransform = 'rotate(25deg)';
                    rightImg.style.transform = 'rotate(-25deg)';
                    rightImg.style.webkitTransform = 'rotate(-25deg)';
                    setTimeout(()=>{
                        leftImg.style.transform = 'rotate(0deg)';
                        leftImg.style.webkitTransform = 'rotate(0deg)';
                        rightImg.style.transform = 'rotate(0deg)';
                        rightImg.style.webkitTransform = 'rotate(0deg)';
                    },500);
            
                    setTimeout(()=>{
                        $('.stick_progress').css("transform", "translateY(-" + sticktranslate +"px)");
                        $('.stick_progress').css("-webkit-transform", "translateY(-" + sticktranslate +"px)");
                        // $('.stick_progress').css("transform", "translateY(0)");
                        $('.claw').css("transform", "translateY(0)");
                        $('.claw').css("-webkit-transform", "translateY(0)");
                        this.isCatched = 0;
                        for(var i = 0; i < _this.toys.length; i++){
                            let clawBoy=document.querySelector('.' + $(_this.toys[i])[0].className.substring(0,$(_this.toys[i])[0].className.indexOf('transLeft')));
                            let toysLeft=clawBoy && $(clawBoy).offset() && $(clawBoy).offset().left;
                            if(screen.availWidth<500){
                                if(toysLeft>137 && toysLeft <190){
                                    this.catchSuccess(clawBoy,this.isCatched,clawTop);
                                }
                            }else{
                                if(toysLeft>325 && toysLeft <392){
                                    this.catchSuccess(clawBoy,this.isCatched,clawTop);
                                }
                            }
                        }

                        //未夹中娃娃
                        if(!this.isCatched){
                            if(this.leaveCount > 0){
                                $('.words').attr("src", `${require('../../asset/images/catchdoll/fail.png')}`);
                                setTimeout(()=>{
                                    $('.words_display').css("opacity","1");
                                    $('.words_display').css("animation","b .3s linear infinite");
                                    setTimeout(()=>{
                                        $('.words_display').css("opacity","0");
                                        $('.words_display').css("animation","none");
                                        setTimeout(()=>{
                                            this.catched = 1;
                                            let hascatched = document.querySelector('.catch-img');
                                            hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                        },1000);
                                    },1000)
                                },800);
                            }else{
                                let sequence = _this.$route.query.sequence;
                                let activityName = 'conference_823';
                                let memberId = window.memberId;
                                // this.axios.post(`/lottery/${activityName}/${memberId}/lottery/end?sequence=${sequence}&remainNum=1&win=false`).then(res => {
                                    this.wawa = res.catchNumber;
                                    this.changeWords = res.prizeSettingList;
                                    this.prizeId = res.prizeId;
                                    $('.words').attr("src", `${require('../../asset/images/catchdoll/fail.png')}`);
                                    setTimeout(()=>{
                                        $('.words_display').css("opacity","1");
                                        $('.words_display').css("animation","b .3s linear infinite");
                                        setTimeout(()=>{
                                            $('.words_display').css("opacity","0");
                                            $('.words_display').css("animation","none");
                                            if(this.leaveCount === 0){
                                                this.flag = 1;
                                            }
                                            setTimeout(()=>{
                                                let hascatched = document.querySelector('.catch-img');
                                                hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                                            },1000);
                                        },1000)
                                    },800);
                                // }).catch(error=>{
                                //     alert("网络异常，请稍后再试")
                                // })
                            }
                            
                        }
                    },1000);
                }
        }
    },
    destroyed(){
        clearInterval(this.intervalFlash);
        clearInterval(this.intervalAddBoy);

        window.intervalFlash = null;
        window.intervalAddBoy = null;
    },
    
    mounted(){
        // //断网监测错误
        // window.addEventListener("online", function () {
        // //当联网的时候触发的回调
        //     // alert("已经重新联网")
        // }, false);

        // window.addEventListener("offline", function () {
        //     //当断网的时候触发的回调
        //     alert("网络异常请重新链接")
        // }, false);


        //第一个娃娃 
        var _this = this;
        _this.number++;
        var img = `
        <div class="boy-body${_this.number} transLeft">
        <img class="boy-img" style='height:27vw' src="${require(`../../asset/images/catchdoll/wawa_6.png`)}"/>
        </div>
        `;
        _this.toys.push(img);//将图片放入到数组最后
        $('.boy').append(img);
        $(img).animate({left:"900px"},50000,"linear",function(){
            // $("."+this.className.substring(0,this.className.indexOf('transLeft'))).remove();//将元素从页面上移除
            // _this.toys.shift();//删除数组的第一个元素
        });

        //初始化爪子
        setTimeout(()=>{
            var boyBodyTop=document.querySelector('.transLeft1') && document.querySelector('.transLeft1').offsetTop;
            var boyBodyHeight=document.querySelector('.transLeft1') && document.querySelector('.transLeft1').offsetHeight;
            var stickHeight=boyBodyTop// - boyBodyHeight;
            $('.stick').css("height", stickHeight + 'px');
            // var stickHeight = document.querySelector('.stick').offsetHeight;
            var clawTop = document.querySelector('.claw').offsetTop;
            var sticktranslate = stickHeight-clawTop - 10;
            $('.stick_progress').css("transform", "translateY(-" + sticktranslate +"px)");
            $('.stick_progress').css("-webkit-transform", "translateY(-" + sticktranslate +"px)");
        },100);

        //音乐播放
        this.openMusicCot();
        $(".claw").css("animation", "c 5s linear infinite"); 
        $(".claw").css("-webkit-animation", "c 5s linear infinite"); 
        document.querySelector('.catch-button').addEventListener('click', ()=>{
            if (!_this.disabled && this.catched === 1) {
                _this.disabled = true;
                _this.catchdoll();
                setTimeout(() => {
                    _this.disabled = false;
                    // let hascatched = document.querySelector('.catch-img');
                    // hascatched.setAttribute('src', `${require('../../asset/images/catchdoll/start_btn.png')}`);
                }, 3000);
            }
        })

        //监听时间变换，时间为0时flag为1
        this.intervalFlash = setInterval(()=>{
            if(_this.time>0){
                _this.time--;
            }
            if(_this.time === 0){
                this.flag = 1;
            }
        },1000);

        //进度条变换
        setTimeout(()=>{
            let bottom_progress = document.querySelector(".message2_progress_bottom");
            $(bottom_progress).css("left", "0vw");
        }, 100);
        
        //加载娃娃
        this.intervalAddBoy = setInterval(()=>{
            _this.number++;
            var img = `
            <div class="boy-body${_this.number} transLeft">
            <img class="boy-img" style='height:27vw' src="${require(`../../asset/images/catchdoll/wawa_${this.number%9}.png`)}"/>
            </div>
            `;
            _this.toys.push(img);//将图片放入到数组最后
            $('.boy').append(img);
            $(img).animate({left:"900px"},50000,"linear",function(){
                // $("."+this.className.substring(0,this.className.indexOf('transLeft'))).remove();//将元素从页面上移除
                // _this.toys.shift();//删除数组的第一个元素
            });
        },3000);

        //屏幕切换时回到友空间时的操作
    }
}
</script>
<style lang="less">
   @keyframes translateLR {
        from{
            left:-10vw;
        }
        to{
            left:93vw;
        }
    }

    .boy{
        position: absolute;
        overflow: hidden;
        width: 547.5px;
        height:100%;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        .transLeft{
            animation: translateLR 5s linear;
            position: absolute;
            bottom: 10vh;
            left:-38vw;
            opacity:1;
            transition: bottom 1s ease;
            @media screen and(min-width: 500px) {
                bottom: 4vh;
            }
        }
        .transLeft1{
            position: absolute;
            bottom: 10vh;
            left:-18vw;
            opacity:1;
            transition: bottom 1s ease;
            @media screen and(min-width: 500px) {
                bottom: 4vh;
            }
        }
    }

    @keyframes translateLR2 {
        0% {
            transform: translateX(3vw);
            }
        20% {
            transform:translateX(-3vw);
            }
        40% {
            transform:translateX(2vw);
            }
        60% {
            transform:translateX(-2vw);
            }
        // 80% {left: 3vw;}
        100% {
            transform:translateX(0);
            }
    }

    @-webkit-keyframes translateLR2 {
        0% {
            transform: translateX(3vw);
            }
        20% {
            transform:translateX(-3vw);
            }
        40% {
            transform:translateX(2vw);
            }
        60% {
            transform:translateX(-2vw);
            }
        // 80% {left: 3vw;}
        100% {
            transform:translateX(0);
            }
    }

    @keyframes translateLR3{
        0% {
            transform:rotate(0deg);
            }
        20% {
            transform:rotate(-25deg);
            }
        40% {
            transform:rotate(25deg);
            }
        60% {
            transform:rotate(-25deg);
            }
        80% {
            transform:rotate(25deg);
            }
        100% {
            transform:rotate(0deg);
            }
    }

    @-webkit-keyframes translateLR3{
                0% {
            transform:rotate(0deg);
            }
        20% {
            transform:rotate(-25deg);
            }
        40% {
            transform:rotate(25deg);
            }
        60% {
            transform:rotate(-25deg);
            }
        80% {
            transform:rotate(25deg);
            }
        100% {
            transform:rotate(0deg);
            }
    }
    .a{
        animation: translateLR2 .3s linear infinite;
    }

    .b{
        animation: translateLR3 .8s linear infinite;
    }
</style>
<style lang="less" scoped>
    // @import '../../asset/fonts/font.css';

   @keyframes translateLR {
        from{
            transform: translateX(-10vw);
        }
        to{
            transform: translateX(93vw);
        }
    }
    @-webkit-keyframes translateLR {
        from{
            transform: translateX(-10vw);
        }
        to{
            transform: translateX(93vw);
        }
    }

    @keyframes switchBg {
        from {
            background-image: url('../../asset/images/catchdoll/flash_1.png');
        }
        to {
            background-image: url('../../asset/images/catchdoll/flash_2.png');
        }
    }
    .machine{
        display:flex;
        flex-direction: column;
        // align-items: center;
        background: #eb443d !important;
        &-header{
            margin-top: 1vh;
            &-music{
                position: absolute;
                right: 0;
                width: 60px;
                height: 60px;
                background: url('../../asset/images/catchdoll/music_open.png') no-repeat center;
                background-size:100% 100%;
                &-close{
                    position: absolute;
                    right: 0;
                    width: 60px;
                    height: 60px;
                    background: url('../../asset/images/catchdoll/music_close.png') no-repeat center;
                    background-size:100% 100%;
                }
            }
            &-cloth{
                width:620px;
                height:150px;
                background:rgba(254,226,186,1);
                box-shadow:0px 12px 3px 2px rgba(112,112,112,0.23);
                border-radius:24px;
                margin: auto;
                position: relative;
                .message{
                    position:absolute;
                    width: 532px;
                    left:50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    -webkit-transform: translate(-50%, -50%);
                    .message1{
                        width: 521px;
                        .message1_1{
                            // display: flex;
                            width:200px;
                            float:left;
                            .message1_1_catched{
                                text-align: center;
                                font-size:33px;
                                color:#FFFFFF;
                                margin-left:7px;
                                border-radius:9px;
                                display: inline-block;
                                background: #FF726D;
                                width:110px;
                                height: 46px;
                            }
                        }
                        .message1_2{
                            // display: flex;
                            margin-left:245px;
                            .message1_2_count{
                                text-align: center;
                                font-size:33px;
                                color:#FFFFFF;
                                margin-left:7px;
                                border-radius:9px;
                                display: inline-block;
                                background: #FF726D;
                                width:110px;
                                height: 46px;
                            }
                        }
                    }
                    .message2{
                        display: flex;
                        align-items: center;
                        margin-top:36px;
                        position: relative;
                        .message2_progress{
                            position: relative;
                            width: 350px;
                            overflow: hidden;
                            border-radius:40%;
                            &:before{
                                display: block;
                                content: "";
                                width:350px;
                                height: 50px;
                                background: url('../../asset/images/catchdoll/progress.png') no-repeat center;
                                background-size:100%;
                                position: relative;
                            }
                            .message2_progress_bottom{
                                position: absolute;
                                width:350px;
                                height: 50px;
                                top: 0;
                                left: 350px;
                                background: url('../../asset/images/catchdoll/progress_hui.png') no-repeat center;
                                background-size:100%;
                                transition: 180s linear all;
                            }
                        }
                    }
                }
            }
        }
        &-body{
            margin:1vh auto 0 auto;
            width:670px;
            flex:1;
            background: url('../../asset/images/catchdoll/machine-bg.png') no-repeat center;
            background-size:100% 100%;
            z-index:10;
            position: relative;
          
            .clamp{
                height: 75vh;
                .clamp-body{
                    position: absolute;
                    width: 126px; 
                    height: 260px;
                    left: 50%;
                    transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);

                    .stick{
                        position: absolute;
                        overflow: hidden;
                        width:30px;
                        // height:180px;
                        // height:48vh;
                        left: 50%;
                        transform: translateX(-50%);
                        -webkit-transform: translateX(-50%);
                        // transition:height 1s ease;
                        // @media screen and(min-width: 500px) {
                        //     height: 110px;
                        // }
                        .stick_progress{
                            height: 100%;
                            background: #FFF;
                            border:4px solid #000;
                        }
                    }

                    .claw{
                        position: relative;
                        // top: 170px;
                        top: 10vh;
                        transition: 1s ease all;
                        // @media screen and(min-width: 500px) {
                        //     top: 100px;
                        // }
                        .top-claw{
                            position: absolute;
                            z-index: 1;
                            width: 100px;
                            left: 50%;
                            transform: translateX(-50%);
                            -webkit-transform: translateX(-50%);
                            .clamp-top-img{
                                width: 100px;
                            }
                        }
                        .bottom-claw{
                            position: absolute;
                            top: 4.33vw;
                            .left-claw{
                                position: absolute;
                                .clamp-left-img{
                                    transition:.4s ease all;
                                    transform-origin:top;
                                    width:70px;
                                }
                            }
                            .right-claw{
                                position: absolute;
                                left: 60px;
                                .clamp-right-img{
                                    transition:.4s ease all;
                                    transform-origin:top;
                                    width:70px;
                                }
                            }
                        }
                    }
                }
            }

            .words_display{
                position: absolute;
                top: 25vh;
                width: 100%;
                height: 210px;
                text-align: center;
                opacity: 0;
                z-index: 2;
                transition: .3s ease all;
                color: #eb443d;
                font-size: 62px;
                font-family: ALI;
                text-shadow:-5px 0 #FFF,
                0 5px #FFF,
                5px 0 #FFF,
                0 -5px #FFF;
                .words{
                    height: 56%;
                }
            }

            &:before, &:after{
                display: block;
                content:"";
                position: absolute;
                width:40px;
                height: 100%;
                background: url('../../asset/images/catchdoll/flash_1.png') no-repeat center;
                background-size: 100%;
                animation: switchBg 1s linear infinite;
            }
            &:before{
                left:-30px;
            }
            &:after{
                right:-30px;
            }
            &-blind{
                position: absolute;
                width: 750px;
                height: 142px;
                background: url('../../asset/images/catchdoll/bg_top.png') no-repeat center;
                background-size:100% 100%;
                left:50%;
                margin-left:-375px;
                z-index: 2;
            }
        }
        &-footer{
            width:750px;
            // height: 320px;
            height: 20vh;
            // @media screen and(min-width: 500px) {
            //     height: 200px;
            // }
            overflow: hidden;
            margin-top: -6vh;
            position: relative;
            // &:after{
            //     }
            &-bg{
                background: url('../../asset/images/catchdoll/machine-bottom-bg.png') no-repeat center;
                background-size:100% 100%;
                width:750px;
                // height: 320px;
                height: 19vh;
                content:'';
                display: block;
                position:relative;
                .catch-button{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    -webkit-transform: translate(-50%, -50%);
                    z-index: 10;
                    // top: 100px;
                    bottom:4vh;
                    .catch-img{
                        width:320px;
                        // height: 120px;
                        height: 9vh;
                    }
                    // @media screen and(min-width: 500px) {
                    //     top: 75px;
                    // }
                }
            }
            &-repeat{
                background: url('../../asset/images/catchdoll/repeat.png') repeat-y center;
                width:750px;
                height: 320px;
                background-size:100% 100%;
                position: absolute;
                // top:240px;
                top:14vh;
            }
            
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
            left:50%;
            transform: translate(-50%,-50%);
            -webkit-transform: translate(-50%,-50%);
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
            .catch-dialog-word2{
                width: 59vw;
                position: absolute;
                text-align: center;
                font-size: 6vw;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #fff;
                line-height: 9.333vw;
                letter-spacing: 2vw;
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
            
            .catch-tie{
                position:absolute;
                left: 50%;
                top: 45%;
                transform: translateX(-50%);
                z-index: 12;
                .catch-tie-words{
                    position: relative;
                    .catch-tie-img{
                        width:60vw;
                    }
                    .catch-tie-word{
                        position:absolute;
                        left:50%;
                        top: 40%;
                        transform:translate(-50%,-50%);
                        width: 45vw;
                    }
                }
                .catch-bottom{
                    position: relative;
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
                .machine-bulb3{
                    position: absolute;
                    top: 0;
                    left: -5vw;
                    width:3.4vw;
                    height: 100%;
                    background-image: url('../../asset/images/catchdoll/flash_1.png') no-repeat;
                    background-size: 100%;
                    animation: switchBg 1s linear infinite;
                }
                .machine-bulb4{
                    position: absolute;
                    top: 0;
                    right: -5vw;
                    width:3.4vw;
                    height: 100%;
                    background-image: url('../../asset/images/catchdoll/flash_1.png') no-repeat;
                    background-size: 100%;
                    animation: switchBg 1s linear infinite;
                }
            }

            .catch-tie2{
                position:absolute;
                height: 43%;
                width: 62%;
                left: 50%;
                bottom: 5%;
                transform: translateX(-50%);
                z-index: 12;
                .catch-bottom-words{
                    line-height: 7vw;
                    font-size: 5vw;
                    color: #FFF;
                    font-family: PingFangSC-Semibold;
                    letter-spacing: .5vw;
                }
                .catch-bottom-words2{
                    line-height: 9vw;
                    font-size: 5vw;
                    color: #FFF;
                    font-family: PingFangSC-Semibold;
                    letter-spacing: .5vw;
                }
                .catch-bottom{
                    position: relative;
                    margin-top: 6.667vw;
                    // margin-top: 10%;
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
                .catch-bottom2{
                    position: relative;
                    margin-top: 10%;
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