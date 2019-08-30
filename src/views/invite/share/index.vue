<template>
  <div id="user">
    <div class="wrap">
      <div class="receive-banner-bottom w">
        <img src="./receive_banner.jpg">
      </div>
      <div class="recerive-banner-top w">
        <img src="./decoration_img.png">
      </div>

      <div class="receive-content">
        <div class="content-box">
          <div class="phone-number fl w">
            <input class="input-content input-user" type="number" placeholder="请输入手机号码" v-model="phone"
                   @focus="focus()">
          </div>
          <div class="verification-code fl w">
            <input class="input-content input-verification-code" type="number" placeholder="输入验证码" v-model="smsCode"
                   @focus="focus()">

            <div class="obtain-verification-code"><a :class="enableGetCode?'enable':'disable'" @click="getSmsCode()">获取验证码{{downNum>0?`(${downNum}s)`:''}}</a>
            </div>
          </div>
          <div class="invitation-code fl w ">
            <input class="input-content input-invitation-code" type="password" placeholder="请输入6位数字密码"
                   v-model="password" @focus="focus()">
          </div>
          <div class="receive-botton fl w">
            <div class="dl-botton "><a @click="getDSDCoin()">立即注册</a></div>


          </div>
          <div class="err-text fl">{{error}}</div>
          <a class="dl-apk fr" target="_blank" href="http://file.dsdiot.com/79809635483">下载DSD智能制造APP</a>
        </div>

      </div>
      <div class="receive-bottom fl w"><img src="./receive_bottom.png"></div>
    </div>
  </div>
</template>

<script>
  import {PostInviteSms, PostInviteRegiste} from '_api/old/'
  // import * as Common from '_utils/common'

  export default {
    name: 'User',

    data: function () {
      return {
        phone: '',
        smsCode: '',
        password: '',
        invite: '',
        error: '',
        downNum: 0,
        downTimer: null,
      }
    },
    computed: {
      enableGetCode: function () {
        return /^\d{11}$/.test(this.phone) && this.downNum <= 0;
      }
    },
    methods: {
      initRegisterData() {
      },
      focus() {
        this.error = '';
      },
      getSmsCode() {
        //手机号码格式正确且倒计时为0
        if (this.enableGetCode) {
          this.error = '';
          this.smsCode = '';
          let id = this.phone;
          let type = 'signup';
          PostInviteSms({id, type}).then((res) => {
            if (parseInt(res.data.res) === 0) {
              this.beginDownTimer();
            } else {
              this.phone = '';
              this.$toast(res.data.errmsg);
            }
          }).catch(() => {
            this.error = '获取验证码失败'
          })
        }
      },
      beginDownTimer() {
        this.downNum = 60;
        this.downTimer = setInterval(() => {
          if (this.downNum <= 0) {
            this.downTimer && clearInterval(this.downTimer);
          } else {
            this.downNum--;
          }
        }, 1000)
      },
      getDSDCoin() {
        let isRightPhone = /^\d{11}$/.test(this.phone);
        let psdReg = /^\d{6}$/;
        if (!isRightPhone) {
          this.$toast("请输入11位手机号码")
          return;
        }
        if (!this.smsCode.length) {
          this.$toast("请输入手机验证码")
          return;
        }
        if (!this.password) {
          this.$toast("请输入密码")
          return;
        }
        if (!psdReg.test(this.password)) {
          this.$toast("密码格式为6位数字")
          return;
        }
        if (this.error.length) {
          return;
        }
        let phone = this.phone;
        let code = this.smsCode;
        let password = this.password;
        let invite = this.invite;
        PostInviteRegiste({
          'phone': phone,
          'password': password,
          'code': code,
        }, 'post', invite).then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$toast('注册成功')
          } else {
            this.$toast(res.data.errmsg);
          }
        }).catch(() => {
          this.$toast('注册失败');
        })
      }
    },
    created() {
      this.invite = this.$route.query.code || '';
    },
    mounted() {
      this.initRegisterData();
    },
    beforeDestroy() {
      this.downTimer && clearInterval(this.downTimer);
    }
  }
</script>

<style lang="stylus">

  .recerive-banner-top {
    position: absolute;
    left: 0;
    top: 0;
  }

  .receive-content {
    position: relative;
    background: url(./receive_content.png) no-repeat;
    background-size: 100% 100%;
    float: left;
    width: 100%;
  }

  .content-box {
    display: block;
    margin: 0 10%;
  }

  .input-content {
    border: 1px solid #999999;
    background-color: #f4f4f4;
    border-radius: 3px;
    font-size: $middleFontSize !important;
    color: #333333;
    font-size: 12px;
    outline: medium none;
    width: 100%;
    height: 40px;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .phone-number {
    display: flex;
    align-items: center;
  }

  .verification-code {
    margin-top: 7px;
    display: flex;
    justify-content: space-around;
  }

  .input-verification-code {
    flex: 3;
    margin-right: 10px;
  }

  .obtain-verification-code {
    flex: 2;
    border-radius: .15rem;
    height: 40px;
  }

  .obtain-verification-code a {
    opacity: 1;
    border-radius: 4px;
    color: #fff;
    display: block;
    font-size: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .obtain-verification-code a.enable {
    background: -webkit-linear-gradient(to left, #7ecfc8, #3cb1e2);
    background: -o-linear-gradient(to right, #7ecfc8, #3cb1e2);
    background: -moz-linear-gradient(to right, #7ecfc8, #3cb1e2);
    background: linear-gradient(to right, #7ecfc8, #3cb1e2);
  }

  .obtain-verification-code a.disable {
    background: gray;
  }

  .invitation-code {
    margin-top: 7px;
    display: flex;
    align-items: center;
  }

  .receive-botton {
    margin-top: 18px;
  }

  .dl-botton {
    text-align: center;
    width: 100%;
  }

  .dl-botton a {
    opacity: 1;
    border-radius: 4px;
    color: #fff;
    display: block;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: -webkit-linear-gradient(to left, #7ecfc8, #3cb1e2);
    background: -o-linear-gradient(to right, #81c6da, #3276b4);
    background: -moz-linear-gradient(to right, #81c6da, #3276b4);
    background: linear-gradient(to right, #81c6da, #3276b4);
  }

  .dl-botton a:hover {
    opacity: 1;
    border-radius: 4px;
    color: #fff;
    display: block;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: -webkit-linear-gradient(to left, #7ecfc8, #3276b4);
    background: -o-linear-gradient(to right, #81c6da, #3276b4);
    background: -moz-linear-gradient(to right, #81c6da, #3276b4);
    background: linear-gradient(to right, #81c6da, #3276b4);
  }

  .err-text {
    margin-top: 5px;
    color: red;
    font-size: 12px;
  }

  .dl-apk {
    margin-top: 10px;
    color: #5182E4;
    font-size: 14px;
    width: 100%;
    text-align: center;
  }

</style>
