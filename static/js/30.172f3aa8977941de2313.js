webpackJsonp([30],{"1DuL":function(e,t,n){var a=n("ZuZG");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("655f9a54",a,!0)},AS5T:function(e,t,n){"use strict";function a(e){n("1DuL"),n("WsZ4")}Object.defineProperty(t,"__esModule",{value:!0});var r=n("jDLt"),s=n("q9KM"),i=n("dP6P"),o=n("748P"),d=n("OGGw"),l=n("XxOJ"),c=n.n(l),m=n("Lxo+"),u=n("4QjH"),A={components:{myHeader:r.a,Group:s.a,Checker:i.a,CheckerItem:o.a,XInput:d.a,XAddress:m.a,XTextarea:u.a},data:function(){return{header:{HBL_icon:"icon_back",HBC_text:"添加地址",HBR_icon:" ",HBR_show:!0,HBR_type:"addaddress",HBR_show_long:!0,HBR_text_long:"保存"},id:"",name:"",sex:"",tel:"",addressData:c.a,addressValue:[],addressValueDetail:"",postcode:""}},methods:{sendAddrFn:function(){var e=this,t=/^[a-zA-Z\u4E00-\u9FA5]+$/,n=/^1[3|4|5|7|8][0-9]{9}$/;t.test(this.name)?n.test(this.tel)?(comTools.showLoading(this,"修改中..."),setTimeout(function(t){comTools.hideLoading(e),e.$vux.toast.show({type:"success",text:"修改成功~",width:"7.5em"}),setTimeout(function(){e.$router.go(-1)},3e3)})):this.$vux.toast.show({type:"cancel",text:"亲，收货人电话填写有误哦~",width:"16em"}):this.$vux.toast.show({type:"cancel",text:"亲，收货人姓名填写有误哦~",width:"16em"})}},created:function(){var e=this.$store.state.addressObj;console.log(this.$store.state.addressObj),this.id=e.id,this.name=e.name,this.sex=e.gender,this.tel=e.tel,this.postcode=e.postcode,this.addressValue=e.addressValue,this.addressValueDetail=e.addressValueDetail,this.name=e.name}},p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("myHeader",{attrs:{header:e.header},on:{sendAddr:e.sendAddrFn}}),e._v(" "),n("div",{staticClass:"edit_main"},[n("group",{attrs:{"label-width":"4.5em","label-margin-right":"1.75em","label-align":"left"}},[n("x-input",{attrs:{title:"收货人",placeholder:"请输入姓名"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("checker",{attrs:{"default-item-class":"sex-item","selected-item-class":"sex-item-selected"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[n("checker-item",{attrs:{value:"先生"}},[e._v("先生")]),e._v(" "),n("checker-item",{attrs:{value:"女士"}},[e._v("女士")])],1),e._v(" "),n("x-input",{attrs:{title:"手机号码",placeholder:"请输入手机号码"},model:{value:e.tel,callback:function(t){e.tel=t},expression:"tel"}}),e._v(" "),n("x-address",{attrs:{title:"所在地区","raw-value":"",list:e.addressData,"value-text-align":"left"},model:{value:e.addressValue,callback:function(t){e.addressValue=t},expression:"addressValue"}}),e._v(" "),n("x-textarea",{attrs:{title:"详细地址",placeholder:"请输入乡镇、街道、楼牌号","show-counter":!1,rows:3},model:{value:e.addressValueDetail,callback:function(t){e.addressValueDetail=t},expression:"addressValueDetail"}}),e._v(" "),n("x-input",{attrs:{title:"邮编",placeholder:"请输入邮编"},model:{value:e.postcode,callback:function(t){e.postcode=t},expression:"postcode"}})],1)],1)],1)},h=[],x={render:p,staticRenderFns:h},v=x,f=n("X4nt"),B=a,C=f(A,v,!1,B,"data-v-5a779f24",null);t.default=C.exports},TYja:function(e,t,n){t=e.exports=n("I71c")(!0),t.push([e.i,"\n.edit_main[data-v-5a779f24]{\r\n  padding-top: .85rem;\r\n  font-size: .28rem;\n}\n.vux-checker-box[data-v-5a779f24]{\r\n  border-top: 1px solid #E6E6E6;\r\n  padding: .2rem 0 .2rem 1.95rem;\n}\n.sex-item[data-v-5a779f24] {\r\n  width: 1rem;\r\n  height: .35rem;\r\n  border: 1px solid #ccc;\r\n  display: inline-block;\r\n  border-radius: 5px;\r\n  line-height: .35rem;\r\n  text-align: center;\r\n  margin-right: .5rem;\n}\n.sex-item-selected[data-v-5a779f24] {\r\n  border-color: #18A6AA;\n}\r\n","",{version:3,sources:["D:/vueTest/src/components/Self/EditAddress.vue"],names:[],mappings:";AACA;EACE,oBAAoB;EACpB,kBAAkB;CACnB;AACD;EACE,8BAA8B;EAC9B,+BAA+B;CAChC;AACD;EACE,YAAY;EACZ,eAAe;EACf,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,sBAAsB;CACvB",file:"EditAddress.vue",sourcesContent:["\n.edit_main[data-v-5a779f24]{\r\n  padding-top: .85rem;\r\n  font-size: .28rem;\n}\n.vux-checker-box[data-v-5a779f24]{\r\n  border-top: 1px solid #E6E6E6;\r\n  padding: .2rem 0 .2rem 1.95rem;\n}\n.sex-item[data-v-5a779f24] {\r\n  width: 1rem;\r\n  height: .35rem;\r\n  border: 1px solid #ccc;\r\n  display: inline-block;\r\n  border-radius: 5px;\r\n  line-height: .35rem;\r\n  text-align: center;\r\n  margin-right: .5rem;\n}\n.sex-item-selected[data-v-5a779f24] {\r\n  border-color: #18A6AA;\n}\r\n"],sourceRoot:""}])},WsZ4:function(e,t,n){var a=n("TYja");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("2be395ec",a,!0)},ZuZG:function(e,t,n){t=e.exports=n("I71c")(!0),t.push([e.i,"\n.edit_main .weui-cells{\r\n  margin-top: 0 !important;\r\n  font-size: .28rem !important;\n}\n.edit_main .weui-cell{\r\n  padding: .2rem !important;\n}\n.edit_main .weui-cell:before,.vux-cell-box:before{\r\n  left: 0 !important;\n}\r\n","",{version:3,sources:["D:/vueTest/src/components/Self/EditAddress.vue"],names:[],mappings:";AACA;EACE,yBAAyB;EACzB,6BAA6B;CAC9B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,mBAAmB;CACpB",file:"EditAddress.vue",sourcesContent:["\n.edit_main .weui-cells{\r\n  margin-top: 0 !important;\r\n  font-size: .28rem !important;\n}\n.edit_main .weui-cell{\r\n  padding: .2rem !important;\n}\n.edit_main .weui-cell:before,.vux-cell-box:before{\r\n  left: 0 !important;\n}\r\n"],sourceRoot:""}])}});
//# sourceMappingURL=30.172f3aa8977941de2313.js.map