import Vue from 'vue'
import AppDialog from '_components/app_dialog'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  // Button,
  // Loading,
  // Tip,
  // Toolbar,
  // TabBar,
  // TabPanels,

  // form
  // Checkbox,
  // CheckboxGroup,
  // Checker,
  Radio,
  // RadioGroup,
  Input,
  Textarea,
  Select,
  // Switch,
  // Rate,
  // Validator,
  // Upload,
  // Form,

  // popup
  // Popup,
  Toast,
  // Picker,
  // CascadePicker,
  // DatePicker,
  // TimePicker,
  // SegmentPicker,
  Dialog,
  // ActionSheet,
  // Drawer,
  // ImagePreview,

  // scroll
  Scroll, DatePicker,
  // Slide,
  // IndexList,
  // Swipe,
  // Sticky,
  // ScrollNav,
  // ScrollNavBar
  createAPI
} from 'cube-ui'

/**
 调用方式：
    this.$createAppDialog({
              content: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
              confirmTitle: '确定',
              cancelTitle: '取消',
              onConfirm: () => { console.log('lch--confirm-') },
              onCancel:() => { console.log('lch----cancel---') }
            }).show()
 */
createAPI(Vue,AppDialog,['confirm','cancel'],true)
// Vue.use(Button)
// Vue.use(Loading)
// Vue.use(Tip)
// Vue.use(Toolbar)
// Vue.use(TabBar)
// Vue.use(TabPanels)

// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Checker)
Vue.use(Radio)
// Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
// Vue.use(Switch)
// Vue.use(Rate)
// Vue.use(Validator)
// Vue.use(Upload)
// Vue.use(Form)

// Vue.use(Popup)
Vue.use(Toast)
// Vue.use(Picker)
// Vue.use(CascadePicker)
Vue.use(DatePicker)
// Vue.use(TimePicker)
// Vue.use(SegmentPicker)
Vue.use(Dialog)
// Vue.use(ActionSheet)
// Vue.use(Drawer)
// Vue.use(ImagePreview)

Vue.use(Scroll)
// Vue.use(Slide)
// Vue.use(IndexList)
// Vue.use(Swipe)
// Vue.use(Sticky)
// Vue.use(ScrollNav)
// Vue.use(ScrollNavBar)
