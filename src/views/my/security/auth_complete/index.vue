<template>
    <div id="user-security-id-complete">
        <div class="id-complete-content">
            <div class="id-complete-logo"><img src="./id_complete_logo.png" style="width: 100%;height: 100%"></div>
            <div class="id-complete-desc">认证信息已提交，预计1~3个工作日完成审核。</div>
            <div class="id-complete-confirm"><button @click="idCompleteConfirmClick">完成</button></div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "user-security-id-complete",
      methods: {
        backClick() {
          this.$router.go(-1);
        },
        idCompleteConfirmClick() {
          let u = navigator.userAgent
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if (isAndroid) {
            window.android.getFinish()
          }else if(isIOS){
            window.webkit.messageHandlers.iosGetFinish.postMessage(null);
          }
          else{
            this.$router.go(-1)
          }
        },
      }
    }
</script>



<style lang="stylus">
    $linearGradient:=linear-gradient(to left,rgba(129,198,218,1),rgba(50,117,180,1));
    $reverseLinearGradient:=linear-gradient(to right,rgba(129,198,218,1),rgba(50,117,180,1));

    .id-complete-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        .id-complete-logo{
            margin-top: 50/@rem;
            width: 337/@rem;
            height: 264/@rem;
        }
        .id-complete-desc{
            color: #333333;
            font-size:30/@rem;
            width: 464/@rem;
            text-align: center;
        }
        .id-complete-confirm{
            margin-top: 44/@rem;
            padding: 0 74/@rem;
            width: 100%;
            height: 90/@rem;
            button{
                background: $reverseLinearGradient;
                border-radius:10/@rem;
                width: 100%;
                height: 100%;
                color: #fff;
                font-size: 30/@rem;
            }
        }

    }


</style>
