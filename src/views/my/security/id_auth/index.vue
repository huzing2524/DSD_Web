<template>
  <div id="user-security-id">
    <div class="user-security-data">
      <div class="id-state">
        <div class="id-state-content">
          通过实名认证后才能转账，请如实填写身份信息，一经认证不可修改
        </div>
      </div>

      <div class="id-country">
        <div class="id-title id-country-title">国家或地区</div>
        <div class="id-value-cell id-country-value" @click="showCountriesClick()">
<!--          <mt-cell :title="country" is-link></mt-cell>-->
        </div>
      </div>
      <div class="id-name">
        <div class="id-title id-name-title">姓名</div>
        <div class="id-value-input id-name-value" :class="nameError.length?'id-error-border':''">
          <input class="id-input" type="text" placeholder="请输入姓名" v-model="name" @focus="nameError = ''">
        </div>
        <div class="id-error" v-show="nameError.length">{{nameError}}</div>
      </div>
      <div class="id-type">
        <div class="id-title id-type-title">上传证件类型</div>
        <div class="id-value-cell id-type-value" @click="showIdentifiesClick()">
<!--          <mt-cell :title="identify" is-link></mt-cell>-->
        </div>
      </div>

      <div class="id-attention">
        <p>注意事项：</p>
        <p>1、上传证件/照片格式为.jpg、.jpeg或.png</p>
        <p>2、证件全部信息清晰，无遮挡，无光斑</p>
        <p>3、手持证件照：五官可见（照片需免冠，建议未化妆）</p>
      </div>

      <template v-if="identify === '身份证'">
        <div class="idcard-front">
          <div class="id-title idcard-front-title">
            身份证正面
          </div>
          <div class="id-value-image idcard-front-value" @click="selectPhotoClick(0)" @change="changePhotoClick(0)"
               :class="idcardFrontPhotoError.length?'id-error-border':''">
            <input v-if="isQQBrowser" ref="idcardFrontInput" type="file" accept="image/*" capture="camera">
            <input v-else ref="idcardFrontInput" type="file" accept="image/*">
            <div v-if="idcardFrontPhotoStyle.length" class="id-image-photo" :style="idcardFrontPhotoStyle"></div>
            <div v-else class="id-image-bottom">
              <div class="id-image-middle">
                <div class="id-image-top">
                </div>
              </div>
            </div>
          </div>
          <div class="id-error" v-show="idcardFrontPhotoError.length">{{idcardFrontPhotoError}}</div>
        </div>
        <div class="idcard-back">
          <div class="id-title idcard-back-title">
            身份证反面
          </div>
          <div class="id-value-image idcard-back-value" @click="selectPhotoClick(1)" @change="changePhotoClick(1)"
               :class="idcardBackPhotoError.length?'id-error-border':''">
            <input v-if="isQQBrowser" ref="idcardBackInput" type="file" accept="image/*" capture="camera">
            <input v-else ref="idcardBackInput" type="file" accept="image/*">
            <div v-if="idcardBackPhotoStyle.length" class="id-image-photo" :style="idcardBackPhotoStyle"></div>
            <div v-else class="id-image-bottom">
              <div class="id-image-middle">
                <div class="id-image-top">
                </div>
              </div>
            </div>
          </div>
          <div class="id-error" v-show="idcardBackPhotoError.length">{{idcardBackPhotoError}}</div>
        </div>
        <div class="idcard-inhand">
          <div class="id-title idcard-inhand-title">
            手持身份证
          </div>
          <div class="id-value-image idcard-inhand-value" @click="selectPhotoClick(2)" @change="changePhotoClick(2)"
               :class="idcardInhandPhotoError.length?'id-error-border':''">
            <input v-if="isQQBrowser" ref="idcardInhandInput" type="file" accept="image/*" capture="camera">
            <input v-else ref="idcardInhandInput" type="file" accept="image/*">
            <div v-if="idcardInhandPhotoStyle.length" class="id-image-photo" :style="idcardInhandPhotoStyle"></div>
            <div v-else class="id-image-bottom">
              <div class="id-image-middle">
                <div class="id-image-top">
                </div>
              </div>
            </div>
          </div>
          <div class="id-error" v-show="idcardInhandPhotoError.length">{{idcardInhandPhotoError}}</div>
        </div>

      </template>
      <template v-else-if="identify === '护照'">
        <div class="passport-front">
          <div class="id-title passport-front-title">
            护照正面
          </div>
          <div class="id-value-image passport-front-value" @click="selectPhotoClick(3)" @change="changePhotoClick(3)"
               :class="passportFrontPhotoError.length?'id-error-border':''">
            <input v-if="isQQBrowser" ref="passportFrontInput" type="file" accept="image/*" capture="camera">
            <input v-else ref="passportFrontInput" type="file" accept="image/*">
            <div v-if="passportFrontPhotoStyle.length" class="id-image-photo" :style="passportFrontPhotoStyle"></div>
            <div v-else class="id-image-bottom">
              <div class="id-image-middle">
                <div class="id-image-top">
                </div>
              </div>
            </div>
          </div>
          <div class="id-error" v-show="passportFrontPhotoError.length">{{passportFrontPhotoError}}</div>
        </div>
        <div class="passport-inhand">
          <div class="id-title passport-inhand-title">
            手持护照
          </div>
          <div class="id-value-image passport-inhand-value" @click="selectPhotoClick(4)" @change="changePhotoClick(4)"
               :class="passportInhandPhotoError.length?'id-error-border':''">
            <input v-if="isQQBrowser" ref="passportInhandInput" type="file" accept="image/*" capture="camera">
            <input v-else ref="passportInhandInput" type="file" accept="image/*">
            <div v-if="passportInhandPhotoStyle.length" class="id-image-photo" :style="passportInhandPhotoStyle"></div>
            <div v-else class="id-image-bottom">
              <div class="id-image-middle">
                <div class="id-image-top">
                </div>
              </div>
            </div>
          </div>
          <div class="id-error" v-show="passportInhandPhotoError.length">{{passportInhandPhotoError}}</div>
        </div>
      </template>

      <div class="id-confirm">
        <button @click="idConfirmClick()">资料无误，提交审核</button>
      </div>

<!--      <mt-popup v-model="popupVisible">-->
<!--        <template v-if="tableType === 'country'">-->
<!--          <div class="popup-table">-->
<!--            <mt-cell v-for="(countryItem,index) in countries" :title="countryItem" :key="index"-->
<!--                     @click.native="selectCountryClick(index)">-->
<!--              <img v-if="country === countryItem" src="./slected_icon.png">-->
<!--            </mt-cell>-->
<!--          </div>-->

<!--        </template>-->
<!--        <template v-else>-->
<!--          <div class="popup-table">-->
<!--            <mt-cell v-for="(identifyItem,index) in identifies" :title="identifyItem" :key="index"-->
<!--                     @click.native="selectIdentifyClick(index)">-->
<!--              <img v-if="identify === identifyItem" src="./slected_icon.png">-->
<!--            </mt-cell>-->
<!--          </div>-->
<!--        </template>-->
<!--      </mt-popup>-->
    </div>
  </div>
</template>

<script>
  import {PostAccountAuth} from "_api/old"
  import {getDataUrl} from "_common/util/"

  let countries = [
    "阿尔巴尼亚",
    "阿尔及利亚",
    "阿富汗",
    "阿根廷",
    "阿鲁巴",
    "阿曼",
    "阿塞拜疆",
    "阿闻酋",
    "埃及",
    "埃塞俄比亚",
    "爱尔兰",
    "爱沙尼亚",
    "安道尔",
    "安哥拉",
    "安圭拉",
    "安提瓜和巴布达",
    "奥地利",
    "澳大利亚",
    "巴巴多斯",
    "巴布亚新几内亚",
    "巴哈马",
    "巴基斯坦",
    "巴拉圭",
    "巴勒斯坦",
    "巴林",
    "巴拿马",
    "巴西",
    "白俄罗斯",
    "百慕大",
    "保加利亚",
    "北马里亚纳",
    "贝劳",
    "贝宁",
    "比利时",
    "冰岛",
    "波多黎各",
    "波兰",
    "波斯尼亚和黑塞哥维那",
    "玻利维亚",
    "伯利兹",
    "博茨瓦纳",
    "不丹",
    "布基纳法索",
    "布隆迪",
    "布维岛",
    "朝鲜",
    "赤道几内亚",
    "丹麦",
    "德国",
    "东帝汶",
    "多哥",
    "多米尼加共和国",
    "多米尼克",
    "俄罗斯",
    "厄瓜多尔",
    "厄立特里亚",
    "法国",
    "法罗群岛",
    "法属波利尼西亚",
    "法属圭亚那",
    "法属南部领土",
    "梵蒂冈",
    "菲律宾",
    "斐济",
    "芬兰",
    "佛得角",
    "冈比亚",
    "刚果",
    "哥伦比亚",
    "哥斯达黎加",
    "格林纳达",
    "格陵兰",
    "格鲁吉亚",
    "古巴",
    "瓜德罗普",
    "关岛",
    "圭亚那",
    "哈萨克斯坦",
    "海地",
    "韩国",
    "荷兰",
    "荷属安的列斯",
    "赫德岛和麦克唐纳岛",
    "洪都拉斯",
    "基里巴斯",
    "吉布提",
    "吉尔吉斯斯坦",
    "几内亚",
    "几内亚比绍",
    "加拿大",
    "加纳",
    "加蓬",
    "柬埔寨",
    "捷克",
    "津巴布韦",
    "喀麦隆",
    "卡塔尔",
    "开曼群岛",
    "科科斯(基林)群岛",
    "科摩罗",
    "科特迪瓦",
    "科威特",
    "克罗地亚",
    "肯尼亚",
    "库克群岛",
    "拉脱维亚",
    "莱索托",
    "老挝",
    "黎巴嫩",
    "立陶宛",
    "利比里亚",
    "利比亚",
    "列支敦士登",
    "留尼汪",
    "卢森堡",
    "卢旺达",
    "罗马尼亚",
    "马达加斯加",
    "马尔代夫",
    "马尔维纳斯群岛",
    "马耳他",
    "马拉维",
    "马来西亚",
    "马里",
    "马绍尔群岛",
    "马斯顿",
    "马提尼克",
    "马约特",
    "毛里求斯",
    "毛里塔尼亚",
    "美国",
    "美属萨摩亚",
    "美属太平洋各群岛",
    "美属维尔京群岛",
    "蒙古",
    "蒙特塞拉特",
    "孟加拉国",
    "秘鲁",
    "密克罗尼西亚",
    "缅甸",
    "摩尔多瓦",
    "摩洛哥",
    "摩纳哥",
    "莫桑比克",
    "墨西哥",
    "纳米比亚",
    "南非",
    "南极洲",
    "南乔治亚岛和南桑德韦奇岛",
    "南斯拉夫",
    "瑙鲁",
    "尼泊尔",
    "尼加拉瓜",
    "尼日尔",
    "尼日利亚",
    "纽埃",
    "挪威",
    "诺福克岛",
    "皮特凯恩群岛",
    "葡萄牙",
    "日本",
    "瑞典",
    "瑞士",
    "萨尔瓦多",
    "塞拉利昂",
    "塞内加尔",
    "塞浦路斯",
    "塞舌尔",
    "沙竺阿拉伯",
    "圣诞岛",
    "圣多美和普林西比",
    "圣赫勒拿",
    "圣基茨和尼维斯",
    "圣卢西亚",
    "圣马力诺",
    "圣皮埃尔和密克隆",
    "圣文森特和格林纳丁斯",
    "斯里兰卡",
    "斯洛伐克",
    "斯洛文尼亚",
    "斯瓦尔巴群岛",
    "斯威士兰",
    "苏丹",
    "苏里南",
    "所罗门群岛",
    "索马里",
    "塔吉克斯坦",
    "泰国",
    "坦桑尼亚",
    "汤加",
    "特克斯科斯群岛",
    "特立尼达和多巴哥",
    "突尼斯",
    "图瓦卢",
    "土耳其",
    "土库曼斯坦",
    "托克劳",
    "瓦利斯和富图纳群岛",
    "瓦努阿图",
    "危地马拉",
    "委内瑞拉",
    "文莱",
    "乌干达",
    "乌克兰",
    "乌拉圭",
    "乌兹别克斯坦",
    "西班牙",
    "西撒哈拉",
    "西萨摩亚",
    "希腊",
    "新加坡",
    "新喀里多尼亚",
    "新西兰",
    "匈牙利",
    "叙利亚",
    "牙买加",
    "亚美尼亚",
    "也门",
    "伊拉克",
    "伊朗",
    "以色列",
    "意大利",
    "印度",
    "印度尼西亚",
    "英国",
    "英属维尔京群岛",
    "英属印度洋领土",
    "约旦",
    "越南",
    "赞比亚",
    "扎伊尔",
    "乍得",
    "直布罗陀",
    "智利",
    "中非",
    "中国",
    "中国澳门",
    "中国台湾",
    "中国香港"
  ];
  let identifies = ["身份证", "护照"];
  export default {
    name: "user-security-id",
    data() {
      return {
        isQQBrowser: false,
        popupVisible: false,
        tableType: "country", //国家contry、证件identify
        countries: countries,
        identifies: identifies,

        selectedIndex: -1,
        country: "中国",
        name: "",
        nameError: "",
        identify: "身份证", //身份证idcard、护照passport
        idcardFrontPhotoUrl: "",
        idcardBackPhotoUrl: "",
        idcardInhandPhotoUrl: "",
        passportFrontPhotoUrl: "",
        passportInhandPhotoUrl: "",
        idcardFrontPhotoError: "",
        idcardBackPhotoError: "",
        idcardInhandPhotoError: "",
        passportFrontPhotoError: "",
        passportInhandPhotoError: "",
        idcardFrontPhotoStyle: "",
        idcardBackPhotoStyle: "",
        idcardInhandPhotoStyle: "",
        passportFrontPhotoStyle: "",
        passportInhandPhotoStyle: ""
      };
    },
    methods: {
      initData() {
        let ua = navigator.userAgent.toLowerCase();
        this.isQQBrowser = /qqbrowser/.test(ua) && !/micromessenger/i.test(ua);
      },
      backClick() {
        this.$router.go(-1);
      },
      showCountriesClick() {
        this.popupVisible = true;
        this.tableType = "country";
      },
      selectCountryClick(index) {
        this.popupVisible = false;
        this.country = this.countries[index];
      },
      showIdentifiesClick() {
        this.popupVisible = true;
        this.tableType = "identify";
      },
      selectIdentifyClick(index) {
        this.popupVisible = false;
        this.identify = this.identifies[index];
      },
      selectPhotoClick(index) {
        this.selectedIndex = index;
        this.getPhotoInput().click();
      },
      changePhotoClick(index) {
        this.selectedIndex = index;
        let file = this.getPhotoInput().files[0];
        // let isLT100K = file.size/1024 <100;
        // if (isLT100K){
        //     this.$toast({message:'请上传合适大小的照片！'})
        //     return;
        // }
        this.setPhotoStyle();
        let reader = new FileReader();
        reader.onload = e => {
          getDataUrl(e.target.result, 690, 420)
            .then(dataurl => {
              this.setPhotoStyle(dataurl);
            })
            .catch(() => {
            });
        };
        reader.readAsDataURL(file);
      },
      idConfirmClick() {
        let hasError = false;
        this.name = this.name.replace(/(^\s*)|(\s*$)/g, ""); //去掉名字首尾的空格
        if (!this.name.length) {
          hasError = true;
          this.nameError = "名字不能为空!";
        }
        if (this.name.length >= 10) {
          hasError = true;
          this.nameError = "名字长度有误!";
        }
        if (this.identify === "身份证") {
          if (!this.idcardFrontPhotoUrl.length) {
            hasError = true;
            this.idcardFrontPhotoError = "请上传身份证正面照";
          }
          if (!this.idcardBackPhotoUrl.length) {
            hasError = true;
            this.idcardBackPhotoError = "请上传身份证背面照";
          }
          if (!this.idcardInhandPhotoUrl.length) {
            hasError = true;
            this.idcardInhandPhotoError = "请上传手持身份证照";
          }
        } else {
          if (!this.passportFrontPhotoUrl.length) {
            hasError = true;
            this.idcardFrontPhotoError = "请上传护照正面";
          }
          if (!this.passportInhandPhotoUrl.length) {
            hasError = true;
            this.idcardFrontPhotoError = "请上传护照背面";
          }
        }
        if (hasError) {
          this.$toast({message: "资料提交失败！请修改后重试"});
          return;
        }

        let id = this.$global.phone;
        let country = this.country;
        let name = this.name;
        let type = this.identify === "身份证" ? "idcard" : "passport";
        let image1, image2, image3;
        if (this.identify === "身份证") {
          image1 = this.idcardFrontPhotoUrl;
          image2 = this.idcardBackPhotoUrl;
          image3 = this.idcardInhandPhotoUrl;
        } else {
          image1 = this.passportFrontPhotoUrl;
          image2 = this.passportInhandPhotoUrl;
        }
        this.$indicator.open({text: "正在提交申请..."});
        PostAccountAuth(id, country, name, type, image1, image2, image3)
          .then(res => {
            this.$indicator.close();
            if (parseInt(res.data.res) === 0) {
              this.$router.replace({path: "/user/security/id/complete"});
            } else {
              this.$toast({message: res.data.errmsg});
            }
          })
          .catch(() => {
            this.$indicator.close();
            this.$toast({message: "网络错误！"});
          });
      },
      getPhotoInput() {
        switch (this.selectedIndex) {
          case 0:
            return this.$refs.idcardFrontInput;
          case 1:
            return this.$refs.idcardBackInput;
          case 2:
            return this.$refs.idcardInhandInput;
          case 3:
            return this.$refs.passportFrontInput;
          case 4:
            return this.$refs.passportInhandInput;
          default:
            break;
        }
      },
      setPhotoStyle(dataurl) {
        dataurl = dataurl ? dataurl : "";
        let photoStyle = dataurl
          ? `
                        background: url(${dataurl}) no-repeat;
                        background-position:center;
                        background-size: 100%;
                    `
          : "";
        switch (this.selectedIndex) {
          case 0:
            this.idcardFrontPhotoUrl = dataurl;
            this.idcardFrontPhotoStyle = photoStyle;
            this.idcardFrontPhotoError = "";
            break;
          case 1:
            this.idcardBackPhotoUrl = dataurl;
            this.idcardBackPhotoStyle = photoStyle;
            this.idcardBackPhotoError = "";
            break;
          case 2:
            this.idcardInhandPhotoUrl = dataurl;
            this.idcardInhandPhotoStyle = photoStyle;
            this.idcardInhandPhotoError = "";
            break;
          case 3:
            this.passportFrontPhotoUrl = dataurl;
            this.passportFrontPhotoStyle = photoStyle;
            this.passportFrontPhotoError = "";
            break;
          case 4:
            this.passportInhandPhotoUrl = dataurl;
            this.passportInhandPhotoStyle = photoStyle;
            this.passportInhandPhotoError = "";
            break;
          default:
            break;
        }
      }
    },
    mounted() {
      this.initData();
    }
  };
</script>

<style lang="stylus">

  #user-security-id {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .user-security-data {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .id-state {
    background: #fff;
    display: flex;
    justify-content: center;

    .id-state-content {
      text-align: center;
      padding: 12px 60px;
      color: #333333;
      font-size: 15px;
      line-height: 18px;
    }
  }

  .id-title {
    margin-top: 25px;
    margin-bottom: 7px;
    margin-left: 18px;
    font-size: 14px;
    font-weight: bold;
    font-family: SourceHanSansSC-Bold;
  }

  .id-value-cell {
    margin: 0 15px;

    .mint-cell {
      background: #fff;
    }

    .mint-cell-wrapper {
      background: #fff;
      padding: 12px;
    }

    .mint-cell-text {
      color: #333333;
      font-size: 15px;
    }

    .mint-cell-allow-right::after {
      width: 10px;
      height: 10px;
    }
  }

  .id-value-input {
    margin: 0 15px;
    background: #fff;
    padding: 12px;
    display: flex;

    input {
      width: 100%;
      height: 100%;
      color: #333333;
      font-size: 15px;
    }
  }

  .id-value-image {
    width: 100%;
    height: 210px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    input {
      position: absolute;
      z-index: -1;
      left: -100%;
      width: 1px;
      height: 1px;
      opacity: 0;
    }

    .id-image-bottom {
      width: 250px;
      height: 151px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .id-image-middle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(153, 153, 153, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;

      .id-image-top {
        background: url("./camera_icon.png") no-repeat;
        background-size: 100% 100%;
        width: 44px;
        height: 35px;
      }
    }

    .id-image-photo {
      width: 100%;
      height: 100%;
    }
  }

  .idcard-front-value .id-image-bottom {
    background: url("./id_idcrad_front.png") no-repeat;
    background-size: 100% 100%;
  }

  .idcard-back-value .id-image-bottom {
    background: url("./id_idcrad_back.png") no-repeat;
    background-size: 100% 100%;
  }

  .idcard-inhand-value .id-image-bottom {
    background: url("./id_idcard_inhand.png") no-repeat;
    background-size: 100% 100%;
  }

  .passport-front-value .id-image-bottom {
    background: url("./id_passport_front.png") no-repeat;
    background-size: 100% 100%;
  }

  .passport-inhand-value .id-image-bottom {
    background: url("./id_passport_inhand.png") no-repeat;
    background-size: 100% 100%;
  }

  .id-error-border {
    border: 1px solid #ff0000;
  }

  .id-error {
    margin: 0 15px;
    margin-top: 5px;
    color: #ff0000;
    font-size: 13px;
  }

  .id-attention {
    margin-top: 25px;
    margin-left: 18px;

    p {
      color: #7f8393;
      font-size: 12px;
      line-height: 20px;
    }

    p:first-child {
      color: #5182e4;
    }
  }

  .id-confirm {
    margin-top: 30px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 345px;
      height: 45px;
      background: $mainColor;
      border-radius: 6px;
      color: #fff;
      font-size: 15px;
    }
  }

  .popup-table {
    overflow: scroll;
    max-height: 400px;
    width: 300px;

    .mint-cell {
      background: #fff;
      padding: 0 10px;

      .mint-cell-wrapper {
        background: #fff;
        padding: 15px 0;
        border-bottom: 1px solid #cccccc;
      }

      .mint-cell-text {
        margin-left: 10px;
        color: #333333;
        font-size: 14px;
      }

      .mint-cell-value {
        margin-right: 10px;
        width: 15px;
        height: 15px;
      }
    }
  }
</style>


