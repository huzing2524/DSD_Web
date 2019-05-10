
const Supplement_Task = 'Supplement_Task'  //需要补料的生产任务
const Supplement_Remark = 'Supplement_Remark'    // 补料原因
const Supplement_Materials = 'Supplement_Materials' // 补料单
const Return_Task = 'Return_Task'   // 需要退料的生产任务
const Return_Remark = 'Return_Remark'
const Return_Materials = 'Return_Materials'
const Goods_Add_Type = 'Goods_Add_Type'
const Product_Add_Type = 'Product_Add_Type'
const Process_Data = 'Process_Data'
const Product_Detail = 'Product_Detail'
const Goods_Detail = 'Goods_Detail'
export default {
  namespaced: true,
  state: {
    product: '1',
    productSub: {},
    supplementTask: {},      // 创建补料单时需要补料的生产任务
    supplementRemark: '',    // 创建补料单时填写的补料原因
    supplementMaterials: [], // 创建补料单时选择的物料单
    returnTask: {},     // 创建退料单时选择的生产的任务
    returnRemark: '',   // 创建退料单填写的退料原因
    returnMaterials: [],// 创建退料单是选择的物料单
    goodsAddType: '',   // 0: 创建物料  1：新增物料
    productAddType: '', // 0: 创建产品  1：新增产品
    processData: {},     // 生产任务的工序
    productDetail: {},   // 产品详情
    goodsDetail: {},      // 物料详情   
  },
  mutations: {
    [Supplement_Task](state, payload) {
      state.supplementTask = payload
    },
    [Supplement_Remark](state, payload) {
      state.supplementRemark = payload
    },
    [Supplement_Materials](state, payload) {
      state.supplementMaterials = payload
    },
    [Return_Task](state, payload) {
      state.returnTask = payload
    },
    [Return_Remark](state, payload) {
      state.returnRemark = payload
    },
    [Return_Materials](state, payload) {
      state.returnMaterials = payload
    },
    [Goods_Add_Type](state, payload) {
      state.goodsAddType = payload
    },
    [Product_Add_Type](state, payload) {
      state.productAddType = payload
    },
    [Process_Data](state, payload) {
      state.processData = payload
    },
    [Product_Detail](state, payload) {
      state.productDetail = payload
    },
    [Goods_Detail](state, payload) {
      state.goodsDetail = payload
    }
  }
}