webpackJsonp([31],{"4j0B":function(e,t,n){var a=n("DJvT");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("64035c53",a,!0)},"8VsU":function(e,t,n){var a=n("wSRq");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("c7d15c8a",a,!0)},DJvT:function(e,t,n){t=e.exports=n("I71c")(!0),t.push([e.i,"\n.add_main[data-v-373ab9e1]{\r\n  padding-top: .85rem;\r\n  font-size: .28rem;\n}\n.vux-checker-box[data-v-373ab9e1]{\r\n  border-top: 1px solid #E6E6E6;\r\n  padding: .2rem 0 .2rem 1.95rem;\n}\n.sex-item[data-v-373ab9e1] {\r\n  width: 1rem;\r\n  height: .35rem;\r\n  border: 1px solid #ccc;\r\n  display: inline-block;\r\n  border-radius: 5px;\r\n  line-height: .35rem;\r\n  text-align: center;\r\n  margin-right: .5rem;\n}\n.sex-item-selected[data-v-373ab9e1] {\r\n  border-color: #18A6AA;\n}\r\n","",{version:3,sources:["D:/vueTest/src/components/Self/AddAddress.vue"],names:[],mappings:";AACA;EACE,oBAAoB;EACpB,kBAAkB;CACnB;AACD;EACE,8BAA8B;EAC9B,+BAA+B;CAChC;AACD;EACE,YAAY;EACZ,eAAe;EACf,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,sBAAsB;CACvB",file:"AddAddress.vue",sourcesContent:["\n.add_main[data-v-373ab9e1]{\r\n  padding-top: .85rem;\r\n  font-size: .28rem;\n}\n.vux-checker-box[data-v-373ab9e1]{\r\n  border-top: 1px solid #E6E6E6;\r\n  padding: .2rem 0 .2rem 1.95rem;\n}\n.sex-item[data-v-373ab9e1] {\r\n  width: 1rem;\r\n  height: .35rem;\r\n  border: 1px solid #ccc;\r\n  display: inline-block;\r\n  border-radius: 5px;\r\n  line-height: .35rem;\r\n  text-align: center;\r\n  margin-right: .5rem;\n}\n.sex-item-selected[data-v-373ab9e1] {\r\n  border-color: #18A6AA;\n}\r\n"],sourceRoot:""}])},bOcl:function(e,t,n){"use strict";function a(e){n("8VsU"),n("4j0B")}Object.defineProperty(t,"__esModule",{value:!0});var r=n("jDLt"),s=n("q9KM"),o=n("dP6P"),d=n("748P"),i=n("OGGw"),l=n("XxOJ"),c=n.n(l),m=n("Lxo+"),A=n("4QjH"),u=n("uLmw"),p={components:{myHeader:r.a,Group:s.a,Checker:o.a,CheckerItem:d.a,XInput:i.a,XAddress:m.a,XTextarea:A.a},data:function(){return{header:{HBL_icon:"icon_back",HBC_text:"添加地址",HBR_icon:" ",HBR_show:!0,HBR_type:"addaddress",HBR_show_long:!0,HBR_text_long:"保存"},name:"",sex:"先生",tel:"",addressData:c.a,addressValue:["北京市","市辖区","朝阳区"],addressValueDetail:"",postcode:""}},methods:{sendAddrFn:function(){var e=this,t=/^[a-zA-Z\u4E00-\u9FA5]+$/,n=/^1[3|4|5|7|8][0-9]{9}$/;this.name,this.tel,this.sex,this.addressValue,this.addressValueDetail,this.postcode;t.test(this.name)?n.test(this.tel)?(comTools.showLoading(this,"保存中..."),setTimeout(function(t){comTools.hideLoading(e),e.$vux.toast.show({type:"success",text:"保存成功~",width:"7.5em"}),setTimeout(function(){e.$router.go(-1)},3e3)})):this.$vux.toast.show({type:"cancel",text:"亲，收货人电话填写有误哦~",width:"16em"}):this.$vux.toast.show({type:"cancel",text:"亲，收货人姓名填写有误哦~",width:"16em"})},getAddressName:function(){var e=this.addressValue;return Object(u.a)(e,c.a)}}},h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("myHeader",{attrs:{header:e.header},on:{sendAddr:e.sendAddrFn}}),e._v(" "),n("div",{staticClass:"add_main"},[n("group",{attrs:{"label-width":"4.5em","label-margin-right":"1.75em","label-align":"left"}},[n("x-input",{attrs:{title:"收货人",placeholder:"请输入姓名"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),n("checker",{attrs:{"default-item-class":"sex-item","selected-item-class":"sex-item-selected"},model:{value:e.sex,callback:function(t){e.sex=t},expression:"sex"}},[n("checker-item",{attrs:{value:"先生"}},[e._v("先生")]),e._v(" "),n("checker-item",{attrs:{value:"女士"}},[e._v("女士")])],1),e._v(" "),n("x-input",{attrs:{title:"手机号码",placeholder:"请输入手机号码"},model:{value:e.tel,callback:function(t){e.tel=t},expression:"tel"}}),e._v(" "),n("x-address",{attrs:{title:"所在地区","raw-value":"",list:e.addressData,"value-text-align":"left"},model:{value:e.addressValue,callback:function(t){e.addressValue=t},expression:"addressValue"}}),e._v(" "),n("x-textarea",{attrs:{title:"详细地址",placeholder:"请输入乡镇、街道、楼牌号","show-counter":!1,rows:3},model:{value:e.addressValueDetail,callback:function(t){e.addressValueDetail=t},expression:"addressValueDetail"}}),e._v(" "),n("x-input",{attrs:{title:"邮编",placeholder:"请输入邮编"},model:{value:e.postcode,callback:function(t){e.postcode=t},expression:"postcode"}})],1)],1)],1)},v=[],x={render:h,staticRenderFns:v},B=x,C=n("X4nt"),b=a,f=C(p,B,!1,b,"data-v-373ab9e1",null);t.default=f.exports},wSRq:function(e,t,n){t=e.exports=n("I71c")(!0),t.push([e.i,"\n.add_main .weui-cells{\r\n  margin-top: 0 !important;\r\n  font-size: .28rem !important;\n}\n.add_main .weui-cell{\r\n  padding: .2rem !important;\n}\n.add_main .weui-cell:before,.vux-cell-box:before{\r\n  left: 0 !important;\n}\r\n","",{version:3,sources:["D:/vueTest/src/components/Self/AddAddress.vue"],names:[],mappings:";AACA;EACE,yBAAyB;EACzB,6BAA6B;CAC9B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,mBAAmB;CACpB",file:"AddAddress.vue",sourcesContent:["\n.add_main .weui-cells{\r\n  margin-top: 0 !important;\r\n  font-size: .28rem !important;\n}\n.add_main .weui-cell{\r\n  padding: .2rem !important;\n}\n.add_main .weui-cell:before,.vux-cell-box:before{\r\n  left: 0 !important;\n}\r\n"],sourceRoot:""}])}});
//# sourceMappingURL=31.e06369c7f540f42f8cc5.js.map