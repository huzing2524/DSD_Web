<template>
  <div id="purchase-list">
    <div class="purchase-list-data">
      <div class="purchase-list-content">
        <div class="purchase-list-header">
          <div class="order-header-item" :class="selectedIndex === 0 ? 'selected' : ''" @click="selectedIndex=0;">待发货
            {{this.orderList.doing.length>0?this.orderList.doing.length:''}}
          </div>
          <div class="order-header-item" :class="selectedIndex === 1 ? 'selected' : ''" @click="selectedIndex=1;">已完成
            {{this.orderList.done.length>0?this.orderList.done.length:''}}
          </div>
        </div>
        <!--订单body-->
        <ul class="purchase-list-body">
          <li class="purchase-list-empty" v-if="list.length === 0">
            <div class="purchase-list-empty-box">
              <img src="./empty_icon.png" alt="">
              <p>暂无订单</p>
            </div>
          </li>

          <li v-else class="purchase-list-item" v-for="(listItem,index) in list" :key="index"
              @click="toOrderDetailClick(listItem)">
            <div class="purchase-list-item-top">
              <div class="purchase-list-item-left">
                <div class="purchase-list-item-title">
                  <img src="./order_list_header.png">
                  {{listItem.client_name}}
                </div>
                <div class="purchase-list-item-value" v-for="(item,index) in listItem.products" :key="index">
                  <span>{{item.product_name}}:{{item.product_counts}}{{item.unit}};</span>
                </div>
                <div class="oreder-list-item-income">
                  预计发货时间：{{listItem.deliver_time | GetYMDDateString}}
                </div>
              </div>
              <div class="purchase-list-item-right">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {StoreOrders} from "_utils/api/store";

  export default {
    data() {
      return {
        selectedIndex: 0,
        orderList: {
          doing: [],
          done: []
        }
      };
    },
    computed: {
      list() {
        if (this.selectedIndex === 0) {
          return this.orderList.doing;
        }
        return this.orderList.done;
      }
    },
    methods: {
      initData() {
        this.getStoreOrderData();
      },
      getStoreOrderData() {
        StoreOrders({}, "get")
          .then(res => {
            this.orderList = res.data; // 这里的data是不是不管类型的
          })
          .catch(() => {
          });
      },
      toOrderDetailClick(listItem) {
        let id = listItem.id;
        this.$router.push(`/txt/store/order/detail?id=${id}`);
      }
    },

    mounted() {
      this.initData();
    }
  };
</script>
<style lang="less">
  #purchase-list {
    width: 100%;
    height: 100%;
    background: @bgColor;
    display: flex;
    flex-direction: column;

    .purchase-list-data {
      flex: 1;
      overflow-x: hidden;
      overflow-y: scroll;

      .purchase-list-content {
        margin-top: 16px;
        padding: 0 16px;

        .purchase-list-header {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 16px;

          .order-header-item {
            position: relative;
            text-align: center;
            margin-right: 48px;
            color: #0099ff;
            font-size: @largeFontSize;
            font-weight: 900;
            opacity: 0.5;
            border-bottom: none;

            &.selected {
              color: #0099ff;
              opacity: 1;
            }
          }
        }

        .purchase-list-body {
          .purchase-list-empty {
            display: flex;
            flex-direction: column;

            .purchase-list-empty-box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 70px;

              img {
                width: 54px;
                height: 54px;
              }

              p {
                font-size: 16px;
                color: #dadada;
                margin-top: 8px;
              }
            }
          }

          .purchase-list-item {
            background: #fff;
            margin-bottom: 16px;
            padding: 16px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.1);

            .purchase-list-item-top {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              color: @lightBlackColor;
              font-size: @smallFontSize;

              .purchase-list-item-left {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: flex;
                flex: 1;
                flex-direction: column;

                .purchase-list-item-title {
                  display: flex;
                  align-items: center;
                  color: @blackColor;
                  font-size: 16px;
                  font-weight: 900;

                  img {
                    width: 32 / @rem;
                    height: 32 / @rem;
                    margin-right: 10 / @rem;
                  }

                  span {
                    color: #a1a1a1;
                    font-size: 20 / @rem;
                    margin-left: 10 / @rem;
                    font-weight: normal;
                    border: 2 / @rem solid #a1a1a1;
                    border-radius: 4 / @rem;
                    align-items: center;
                    justify-content: center;
                    padding: 4 / @rem 6 / @rem;

                    &.deliver {
                      text-align: center;
                      color: #ff6f0e;
                      border-color: #ff6f0e;
                    }
                  }
                }

                .purchase-list-item-value {
                  padding-left: 43 / @rem;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;

                  span {
                    font-size: 10px;
                    color: #a1a1a1;
                  }
                }

                .oreder-list-item-income {
                  font-size: 10px;
                  padding-left: 43 / @rem;
                }
              }

              .purchase-list-item-right {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: relative;
                font-size: 14px;

                .mu-circular-progress {
                  transform: rotate(180deg);
                }

                .progress-percent {
                  width: 40px;
                  text-align: center;
                  position: absolute;
                  top: 23 / @rem;
                  right: 50%;
                  margin-right: -20px;
                }

                p {
                  margin-top: 10 / @rem;
                }
              }
            }

            .purchase-list-item-bottom {
              .mu-linear-progress {
                height: 8 / @rem;

                .mu-linear-progress-background {
                  background: #d8d8d8;
                  opacity: 1;
                }

                .mu-linear-progress-determinate {
                  background: @mainColor;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
