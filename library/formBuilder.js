window.callForm = (path, data={}, config) => {
  try {
    
  const id = 'form' + Date.now()
  
  //div to mount to
  const div = document.createElement("div");
  div.id = id

  //finding path and clearing it
  const pathElement = document.querySelector(path)
  while (pathElement.firstChild) {
    pathElement.removeChild(pathElement.lastChild);
  }

  pathElement.appendChild(div)

  //Component build

let renderer = (rootId, formValues, formConfig) => {
  (function(e){function t(t){for(var r,n,l=t[0],a=t[1],u=t[2],p=0,d=[];p<l.length;p++)n=l[p],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&d.push(i[n][0]),i[n]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);c&&c(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),s()}function s(){for(var e,t=0;t<o.length;t++){for(var s=o[t],r=!0,l=1;l<s.length;l++){var a=s[l];0!==i[a]&&(r=!1)}r&&(o.splice(t--,1),e=n(n.s=s[0]))}return e}var r={},i={0:0},o=[];function n(t){if(r[t])return r[t].exports;var s=r[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=r,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var c=a;o.push([0,1]),s()})({0:function(e,t,s){e.exports=s("2f39")},"118e":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.tabs?s("Stepper",{attrs:{fields:e.sortedFields,tabs:e.tabs,settings:e.settings||!1}}):e._l(e.sortedFields,(function(t){return s("div",{key:e.sortedFields.indexOf(t)},[s("FormRow",{attrs:{row:t}})],1)}))],2)},i=[],o=(s("a434"),s("ddb0"),s("ded3")),n=s.n(o),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.row?s("div",{staticClass:"row q-col-gutter-x-md q-col-gutter-y-lg"},e._l(e.row,(function(e){return s("div",{key:e.key,staticClass:"col"},[s("InputSorter",{attrs:{inputInfo:e}})],1)})),0):e._e()},a=[],u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.isRendered?s("div",["simple"===e.inputType?s("SimpleInput",{attrs:{type:e.inputInfo.type,value:e.inputInfo.value,keyName:e.inputInfo.key,rest:e.inputInfo,store:e.store},on:{input:e.onInput,blur:e.onBlur,focus:e.onFocus}}):e._e(),"select"===e.inputType?s("SelectInput",{attrs:{value:e.inputInfo.value,options:e.inputInfo.options,keyName:e.inputInfo.key,rest:e.inputInfo,store:e.store},on:{input:e.onInput,blur:e.onBlur,focus:e.onFocus}}):e._e(),"checkbox"===e.inputType?s("CheckBox",{attrs:{value:e.inputInfo.value,keyName:e.inputInfo.key,rest:e.inputInfo,store:e.store},on:{input:e.onInput,blur:e.onBlur,focus:e.onFocus}}):e._e(),"slider"===e.inputType?s("Slider",{attrs:{value:e.inputInfo.value,keyName:e.inputInfo.key,rest:e.inputInfo,store:e.store},on:{input:e.onInput,blur:e.onBlur}}):e._e(),"date"===e.inputType?s("DateInput",{attrs:{value:e.inputInfo.value,keyName:e.inputInfo.key,rest:e.inputInfo,store:e.store},on:{input:e.onInput}}):e._e(),"multiple"===e.inputType?s("Multiple",{attrs:{value:e.inputInfo.value,multiKey:e.inputInfo.key,rest:e.inputInfo,store:e.store},on:{input:e.onInput}}):e._e(),"html"===e.inputType?s("Html",{attrs:{keyName:e.inputInfo.key,rest:e.inputInfo},on:{focus:e.onFocus}}):e._e()],1):e._e()},c=[],p=(s("e6cf"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-gutter-md"},[void 0===e.rest.visible||e.rest.visible?s("q-input",{ref:"input",attrs:{value:e.valueStore,label:e.rest.required?(e.rest.label||"")+" *":e.rest.label,type:e.type,name:e.keyName,mask:e.rest.mask,"fill-mask":e.rest.fillMask||!1,"reverse-fill-mask":e.rest.reverseFill,"unmasked-value":e.rest.unmaskedValue,clearable:e.rest.clearable,prefix:e.rest.prefix,suffix:e.rest.suffix,autogrow:e.rest.autogrow,hint:e.rest.hint,readonly:e.rest.readonly,disable:e.rest.disable,rules:e.rules},on:{focus:e.onFocus,blur:e.onBlur,input:e.onInput}}):e._e()],1)}),d=[],h=s("c0d6"),f={name:"SimpleInput",props:{type:{type:String,required:!1,default:"text"},keyName:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0}},data(){return{valueStore:this.getStoreValue(),rules:this.checkRules(this.rest.rules,this.rest.required)}},methods:{onFocus(e){this.$emit("focus",e)},onBlur(e){this.$emit("blur",e)},onInput(e){this.input(e),this.$emit("input",e)},input(e){this.rest.multiKey?h["a"].updateKeyValue(this.keyName,e,this.rest.multiKey,this.rest.multiIndex):h["a"].updateKeyValue(this.keyName,e)},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),e},setConfig(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},setValue(e){this.input(e),this.$emit("input",e),this.valueStore=e,this.$forceUpdate()},checkRules(e,t){let s;return s=t?"object"===typeof e?[e=>e&&"string"===typeof e||this.rest.requiredMessage||"Please fill",...this.rest.rules]:[e=>e&&"string"===typeof e||this.rest.requiredMessage||"Please fill"]:this.rest.rules,s}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},m=f,b=s("2877"),y=s("27f9"),v=s("eebe"),g=s.n(v),S=Object(b["a"])(m,p,d,!1,null,null,null),k=S.exports;g()(S,"components",{QInput:y["a"]});var I=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-gutter-md"},[void 0===e.rest.visible||e.rest.visible?s("q-select",{ref:"input",attrs:{value:e.parsedValue,options:e.parsedOptions,name:e.keyName,readonly:e.rest.readonly,disable:e.rest.disable,label:e.rest.required?(e.rest.label||"")+" *":e.rest.label,rules:e.rules},on:{input:e.onInput,focus:e.onFocus,blur:e.onBlur}}):e._e()],1)},q=[],x={name:"SelectInput",props:{options:{type:Array,required:!1,default:[]},keyName:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0}},data(){return{valueStore:this.getStoreValue(),localOptions:this.options,rules:this.checkRules(this.rest.rules,this.rest.required)}},computed:{parsedOptions(){const e=[];return this.localOptions.map((t=>{const s=n()({},t);e.push({label:s.name,value:s.id})})),e},parsedValue(){let e;return this.localOptions&&this.localOptions.map((t=>{const s=n()({},t);this.valueStore===s.id&&(e={label:s.name,value:s.id})})),e},setProp(e="",t){e||console.log("WARNING! No prop name was given"),this.rest[e]=t,this.$forceUpdate()}},methods:{input(e){let t=e&&"object"===typeof e?n()({},e):"";t.value&&(t=t.value),"string"===typeof e&&(t=e),this.rest.multiKey?h["a"].updateKeyValue(this.keyName,t,this.rest.multiKey,this.rest.multiIndex):this.store.updateKeyValue(this.keyName,t)},onInput(e){this.input(e),this.$emit("input",e)},onFocus(e){this.$emit("focus",e)},onBlur(e){this.$emit("blur",e)},checkRules(e,t){let s;return s=t?"object"===typeof e?[e=>e||this.rest.requiredMessage||"Please select option",...this.rest.rules]:[e=>e||this.rest.requiredMessage||"Please select option"]:this.rest.rules,s},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),e},setOptions(e){this.localOptions=e},setConfig(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},setValue(e){this.input(e),this.$emit("input",e),this.valueStore=e,this.$forceUpdate()}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},N=x,_=s("ddd8"),w=Object(b["a"])(N,I,q,!1,null,null,null),j=w.exports;g()(w,"components",{QSelect:_["a"]});var $=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-gutter-md"},[void 0===e.rest.visible||e.rest.visible?s("q-field",{ref:"checkbox",attrs:{value:e.valueStore,rules:e.rules,borderless:"",dense:""},scopedSlots:e._u([{key:"control",fn:function(){return[s("q-checkbox",{ref:"input",attrs:{value:e.valueStore,label:e.rest.required?(e.rest.label||"")+" *":e.rest.label,name:e.keyName,disable:e.rest.disable,rules:e.rules},on:{focus:e.onFocus,blur:e.onBlur,input:e.onInput}})]},proxy:!0}],null,!1,294939349)}):e._e()],1)},V=[],B={name:"CheckBox",props:{keyName:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0}},data(){return{valueStore:this.getStoreValue(),rules:this.checkRules(this.rest.rules,this.rest.required)}},methods:{onFocus(e){this.$emit("focus",e)},onBlur(e){this.$emit("blur",e)},onInput(e){this.input(e),this.$refs.checkbox.validate(),this.$emit("input",e)},input(e){this.rest.multiKey?h["a"].updateKeyValue(this.keyName,e,this.rest.multiKey,this.rest.multiIndex):h["a"].updateKeyValue(this.keyName,e)},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),Array.isArray(e)&&!e.length&&(e=!1),Boolean(e)},setConfig(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},setValue(e){this.input(e),this.$emit("input",e),this.valueStore=e,this.$forceUpdate()},checkRules(e,t){let s;return s=t?"object"===typeof e?[e=>e&&"boolean"===typeof e||this.rest.requiredMessage||"Please fill",...this.rest.rules]:[e=>e&&"boolean"===typeof e||this.rest.requiredMessage||"Please fill"]:this.rest.rules,s}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},O=B,K=s("8572"),C=s("8f8e"),F=Object(b["a"])(O,$,V,!1,null,null,null),M=F.exports;g()(F,"components",{QField:K["a"],QCheckbox:C["a"]});var R=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-gutter-md"},[s("q-field",{attrs:{borderless:"",label:e.rest.required?(e.rest.label||"")+" *":e.rest.label,rules:e.rules,value:e.valueStore}},[void 0===e.rest.visible||e.rest.visible?s("q-slider",{ref:"input",attrs:{value:e.valueStore,name:e.keyName,min:e.rest.min,max:e.rest.max,label:e.rest.showValue,step:e.rest.step,reverse:e.rest.reverse||!1,vertical:e.rest.vertical,disable:e.rest.disable,readonly:e.rest.readonly,color:e.rest.color,"label-color":e.rest.labelColor,"label-text-color":e.rest.labelTextColor},on:{change:e.onChange,input:e.onInput}}):e._e()],1)],1)},P=[],Q={name:"Slider",props:{label:{type:String,required:!1,default:""},keyName:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0}},data(){return{valueStore:Number(this.getStoreValue()),rules:this.checkRules(this.rest.rules,this.rest.required)}},methods:{onChange(e){this.$emit("blur",e)},onInput(e){this.input(e),this.$emit("input",e)},input(e){this.rest.multiKey?h["a"].updateKeyValue(this.keyName,e,this.rest.multiKey,this.rest.multiIndex):h["a"].updateKeyValue(this.keyName,e)},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),e},setProp(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},checkRules(e,t){let s;return s=t?"object"===typeof e?[e=>Number(e)>0||this.rest.requiredMessage||"Please fill",...this.rest.rules]:[e=>Number(e)||this.rest.requiredMessage||"Please fill"]:this.rest.rules,s}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},A=Q,E=s("c1d0"),W=Object(b["a"])(A,R,P,!1,null,null,null),D=W.exports;g()(W,"components",{QField:K["a"],QSlider:E["a"]});var T=function(){var e=this,t=e.$createElement,s=e._self._c||t;return void 0===e.rest.visible||e.rest.visible?s("div",[e.rest.withInput||void 0===e.rest.withInput?s("div",{staticClass:"q-gutter-md"},[s("q-input",{key:e.fuckenMask,ref:"input",attrs:{value:e.rangeInputValue,mask:e.rest.inputMask||e.textInputMask,rules:e.rules,label:e.rest.required?(e.rest.label||"")+" *":e.rest.label},on:{input:e.onSimpleInput},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[s("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[s("DateInp",{attrs:{label:e.rest.required?(e.rest.label||"")+" *":e.rest.label,keyName:e.keyName,rest:e.rest,store:e.store,hasInput:e.hasInput},on:{input:e.onInput,focus:e.onFocus,blur:e.onBlur}})],1)],1)]},proxy:!0}],null,!1,719914939)})],1):s("div",{staticClass:"q-gutter-md"},[s("p",{staticClass:"text-subtitle1 q-mb-none"},[e._v("\n      "+e._s(e.rest.required?(e.rest.label||"")+" *":e.rest.required)+"\n    ")]),s("DateInp",{attrs:{label:e.rest.required?(e.rest.label||"")+" *":e.rest.label,keyName:e.keyName,rest:e.rest,store:e.store,hasInput:e.hasInput,value:e.valueStore},on:{input:e.onInput,focus:e.onFocus,blur:e.onBlur}})],1)]):e._e()},G=[],U=s("bd4c"),z=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-date",{ref:"calendar",attrs:{value:e.rest.range?e.rangeValues:e.valueStore,color:e.rest.color,"text-color":e.rest.textColor,minimal:e.rest.mini,locale:e.locale,"default-year-month":e.rest.defaultYearMonth?e.rest.defaultYearMonth:"2020/03","default-view":e.rest.defaultView,"navigation-min-year-month":e.rest.navigationMinYearMonth,"navigation-max-year-month":e.rest.navigationMaxYearMonth,readonly:e.rest.readonly,range:!!e.rest.range,disable:e.rest.disable,mask:e.rest.mask||"DD.MM.YYYY","today-btn":"",rules:e.rest.rules},on:{input:e.onInput,focus:e.onFocus,blur:e.onBlur}},[e.hasInput?s("div",{staticClass:"row items-center justify-end"},[s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],ref:"btn",attrs:{label:"Close",color:"primary",flat:""}})],1):e._e()])},Y=[],H={name:"Date",props:{type:{type:String,required:!1,default:"text"},label:{type:String,required:!1,default:""},keyName:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0},hasInput:{type:Boolean,required:!1,default:!0}},data(){return{required:void 0!==this.rest.required&&this.rest.required,valueStore:this.getStoreValue()}},computed:{locale(){let e={days:[],daysShort:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthsShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],firstDayOfWeek:1};return"ru"===this.rest.localization?e:"en"===this.rest.localization?null:("object"===typeof this.rest.localization&&(e=this.rest.localization),e)},rangeValues(){let e={};return"object"===typeof this.valueStore&&this.valueStore&&(e=this.valueStore.start&&this.valueStore.finish?{from:this.valueStore.start,to:this.valueStore.finish}:n()({},this.valueStore)),e}},methods:{onFocus(e){this.$emit("focus",e)},onBlur(e){this.$emit("blur",e)},onInput(e){this.$emit("input",e)},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),e}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},J=H,L=s("52ee"),X=s("9c40"),Z=s("7f67"),ee=Object(b["a"])(J,z,Y,!1,null,null,null),te=ee.exports;g()(ee,"components",{QDate:L["a"],QBtn:X["a"]}),g()(ee,"directives",{ClosePopup:Z["a"]});const{formatDate:se}=U["b"];var re={name:"DateInput",components:{DateInp:te},props:{type:{type:String,required:!1,default:"text"},keyName:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0}},data(){return{hasInput:!(!this.rest.withInput&&void 0!==this.rest.withInput),valueStore:this.getStoreValue(),fuckenMask:1,rules:this.checkRules(this.rest.rules,this.rest.required)}},computed:{rangeInputValue(){let e={};return e=this.valueStore,"object"===typeof e&&e.from&&e.to?e=String(e.from)+String(e.to):"object"===typeof e&&e.start&&e.finish&&(e=String(e.start)+String(e.finish)),e},textInputMask(){let e="";return e=this.rest.range?"##.##.#### - ##.##.####":"##.##.####","ru"===this.rest.localization||"en"===this.rest.localization&&(e=this.rest.range?"####/##/## - ####/##/##":"####/##/##"),e}},methods:{onFocus(e){this.$emit("focus",e)},onBlur(e){this.$emit("blur",e)},onInput(e){this.fuckenMask+=1;let t=e;"object"===typeof e&&e&&e.start&&e.finish&&(t={from:e.start,to:e.finish}),this.input(t),this.$emit("input",t)},onSimpleInput(e){let t=e;if(this.rest.range){const s=e.split(" - ");t={from:s[0],to:s[1]}}this.input(t),this.$emit("input",t)},input(e){this.rest.multiKey?h["a"].updateKeyValue(this.keyName,e,this.rest.multiKey,this.rest.multiIndex):h["a"].updateKeyValue(this.keyName,e),this.valueStore=e},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),e},setConfig(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},setValue(e){this.input(e),this.$emit("input",e),this.valueStore=e,this.$forceUpdate()},checkRules(e,t){let s;return s=t?"object"===typeof e?[e=>e&&"string"===typeof e||this.rest.requiredMessage||"Please fill",...this.rest.rules]:[e=>e&&"string"===typeof e||this.rest.requiredMessage||"Please fill"]:this.rest.rules,s}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},ie=re,oe=s("0016"),ne=s("7cbe"),le=Object(b["a"])(ie,T,G,!1,null,null,null),ae=le.exports;g()(le,"components",{QInput:y["a"],QIcon:oe["a"],QPopupProxy:ne["a"]});var ue=function(){var e=this,t=e.$createElement,s=e._self._c||t;return void 0===e.rest.visible||e.rest.visible?s("div",{staticClass:"q-my-md"},[s("p",{staticClass:"text-subtitle1 q-mb-none"},[e._v(e._s(e.rest.label))]),e._l(e.valueStore,(function(t,r){return s("div",{key:t.key,staticClass:"col"},[s("FieldMapper",{attrs:{fields:e.rest.fields||[],multiKey:e.multiKey,values:e.valueStore[r],rowIndexMultiple:Number(r)}}),s("div",{staticClass:"col text-right"},[s("q-btn",{staticClass:"q-my-sm",attrs:{size:"small",label:e.buttons.deleteField.text||"x",color:e.buttons.deleteField.color||"red","text-color":e.buttons.deleteField.textColor||"white",disable:e.buttons.deleteField.disabled},on:{click:function(t){return e.deleteField(r)}}})],1)],1)})),s("q-btn",{attrs:{label:e.buttons.addField.text||"+",color:e.buttons.addField.color||"green","text-color":e.buttons.addField.textColor,disable:e.buttons.addField.disabled},on:{click:e.addField}}),s("q-field",{ref:"checkbox",attrs:{value:e.valueStore.length,rules:e.rest.rules,borderless:"",dense:""},scopedSlots:e._u([{key:"control",fn:function(){},proxy:!0}],null,!1,632100494)})],2):e._e()},ce=[],pe={name:"Multiple",components:{FieldMapper:()=>Promise.resolve().then(s.bind(null,"118e"))},props:{multiKey:{type:String,required:!0},rest:{type:Object,required:!0},store:{type:Object,required:!0}},data(){return{valueStore:this.store.getValueByKey(this.multiKey),buttons:this.rest.buttons?this.rest.buttons:{addField:{},deleteField:{}}}},methods:{deleteField(e){let t=[...this.valueStore];t.splice(e,1),this.valueStore=t,h["a"].deleteMultiField(this.multiKey,e)},addField(){let e=this.valueStore,t={};if(!this.rest.shouldAddPreviousValue&&this.rest.value[0])for(const[s,r]of Object.entries(this.rest.value[0]))t[s]="";else this.rest.fields.forEach(((e,s)=>{t[e.key]=e.value||""}));e.push(t),this.valueStore=e,h["a"].updateKeyValue(this.multiKey,e)},setConfig(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},setValue(e){this.input(e),this.$emit("input",e),this.valueStore=e,this.$forceUpdate()}},watch:{"store.state.watcher":function(){const e=this.store.getValueByKey(this.multiKey);e!==this.valueStore&&(this.valueStore=e)}}},de=pe,he=Object(b["a"])(de,ue,ce,!1,null,null,null),fe=he.exports;g()(he,"components",{QBtn:X["a"],QField:K["a"],QCheckbox:C["a"]});var me=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-gutter-md"},[void 0===e.rest.visible||e.rest.visible?s("q-card-section",{ref:"editor",attrs:{name:e.keyName,disable:e.rest.disable},domProps:{innerHTML:e._s(e.valueStore)},on:{focus:e.onFocus}}):e._e()],1)},be=[],ye={name:"Html",props:{keyName:{type:String,required:!0},rest:{type:Object,required:!0}},data(){return{valueStore:this.getStoreValue()}},methods:{onFocus(e){this.$emit("focus",e)},getStoreValue(){let e;return e=this.rest.multiKey?h["a"].getValueByKey(this.keyName,this.rest.multiKey,this.rest.multiIndex):h["a"].getValueByKey(this.keyName),e},setConfig(e="",t){if(2===arguments.length)e?this.rest[e]=t:console.log("WARNING! No name provided!");else if(1===arguments.length)if(e&&"object"===typeof e)for(const[s,r]of Object.entries(e))this.rest[s]=r;else console.log("WARNING! No value object provided!");this.$forceUpdate()},setValue(e){this.input(e),this.$emit("input",e),this.valueStore=e,this.$forceUpdate()}},watch:{"store.state.watcher":function(){const e=this.getStoreValue();e!==this.valueStore&&(this.valueStore=e)}}},ve=ye,ge=s("a370"),Se=Object(b["a"])(ve,me,be,!1,null,null,null),ke=Se.exports;g()(Se,"components",{QCardSection:ge["a"]});var Ie={name:"InputSorter",data(){return{store:h["a"],isRendered:void 0,vNodeStore:h["b"]}},props:{inputInfo:{type:Object,required:!0}},components:{SimpleInput:k,SelectInput:j,CheckBox:M,Slider:D,DateInput:ae,Multiple:fe,Html:ke},computed:{inputType:function(){const e=this.inputInfo.type;let t;const s=["text","password","textarea","email","search","tel","file","number","url","timedate"];if(s.find((t=>t===e)))return t="simple",t;switch(e){case"select":return t="select",t;case"checkbox":return t="checkbox",t;case"slider":return t="slider",t;case"date":return t="date",t;case"multiple":return t="multiple",t;case"html":return t="html",t;case"editor":return t="editor",t;default:return t="text",t}}},watch:{"store.state.watcher":function(){this.inputInfo.renderIf?h["a"].getValueByKey(this.inputInfo.renderIf)?this.isRendered=!0:this.isRendered=!1:this.isRendered=!0}},beforeMount(){const e=this.inputInfo.multiKey?this.inputInfo.multiKey:"";if(this.inputInfo.renderIf?h["a"].getValueByKey(this.inputInfo.renderIf)?this.isRendered=!0:this.isRendered=!1:this.isRendered=!0,this.isRendered&&e){const t=void 0!==h["a"].getValueByKey(this.inputInfo.key,e,this.inputInfo.multiIndex);if(t)return null;h["a"].updateKeyValue(this.inputInfo.key,this.inputInfo.value,e,this.inputInfo.multiIndex)}else if(this.isRendered&&!e){const e=void 0!==h["a"].getValueByKey(this.inputInfo.key);if(e)return null;this.inputInfo.value||(this.inputInfo.value=[]),h["a"].updateKeyValue(this.inputInfo.key,this.inputInfo.value)}},mounted(){h["b"].setComponent(this.inputInfo.key,this)},methods:{async onInput(e){this.inputInfo.onInput&&this.$nextTick((async function(){const t=await this.inputInfo.onInput(this.$children[0],e,this.$children[0].$refs.input,h["b"]);t&&"function"===typeof t&&t(this.$children[0])}))},async onBlur(e){this.inputInfo.onBlur&&this.$nextTick((async function(){const t=await this.inputInfo.onBlur(this.$children[0],e,this.$children[0].$refs.input,h["b"]);t&&"function"===typeof t&&t(this.$children[0])}))},async onFocus(e){this.inputInfo.onFocus&&this.$nextTick((async function(){const t=await this.inputInfo.onFocus(this.$children[0],e,this.$children[0].$refs.input,h["b"]);t&&"function"===typeof t&&t(this.$children[0])}))}}},qe=Ie,xe=Object(b["a"])(qe,u,c,!1,null,null,null),Ne=xe.exports,_e={name:"FormRow",components:{InputSorter:Ne},props:{row:{type:Array||void 0,required:!0}}},we=_e,je=Object(b["a"])(we,l,a,!1,null,null,null),$e=je.exports,Ve=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-stepper",{ref:"stepper",attrs:{value:e.step,animated:"","header-nav":e.tabs.tabNavigation},on:{input:e.onInput,"before-transition":e.beforeStep},scopedSlots:e._u([{key:"navigation",fn:function(){return[s("q-stepper-navigation",[e.buttons.next&&e.step<=e.tabs.steps.length?s("q-btn",{class:e.step===e.tabs.steps.length?"hidden":"q-mr-sm",attrs:{color:e.buttons.next.color,label:e.buttons.next.label||"Next","text-color":e.buttons.back.textColor||"black"},on:{click:e.onNextClick}}):e._e(),e.buttons.back&&e.step>1?s("q-btn",{staticClass:"q-mr-sm",attrs:{color:e.buttons.back.color,label:e.buttons.back.label||"Back","text-color":e.buttons.back.textColor||"black"},on:{click:e.onBackClick}}):e._e(),e.buttons.submit&&e.step===e.tabs.steps.length?s("q-btn",{staticClass:"q-mr-sm",attrs:{type:"submit",color:e.buttons.submit.color||"primary",label:e.buttons.submit.label||"Submit","text-color":e.buttons.submit.textColor||"black"},on:{click:e.trySubmit}}):e._e(),e.buttons.reset?s("q-btn",{staticClass:"q-mr-sm",attrs:{type:"reset",color:e.buttons.reset.color||"primary",label:e.buttons.reset.label||"Reset","text-color":e.buttons.reset.textColor||"black"}}):e._e()],1)]},proxy:!0}])},e._l(e.tabs.steps,(function(t,r){return s("q-step",{key:r,attrs:{name:Number(r)+1,title:t.title,icon:t.icon,error:Boolean(e.errors.find((function(e){return e===Number(r+1)})))}},e._l(e.fields[r],(function(e,t){return s("div",{key:t},[s("FormRow",{attrs:{row:e}})],1)})),0)})),1)},Be=[],Oe={name:"Stepper",components:{FormRow:$e},props:{tabs:{type:Object,required:!0},fields:{type:Array,required:!0},settings:{type:Object||Boolean,required:!0,default:!1}},data(){return{step:1,buttons:this.tabs.buttons,errors:[]}},methods:{async onNextClick(){if(this.tabs.validateButtonNavigation){const e=await this.$parent.$parent.validate();e&&this.$refs.stepper.next()}else this.step+=1},onBackClick(){this.$refs.stepper.previous()},async onInput(e){let t;this.tabs.validateTabNavigation?(t=await this.$parent.$parent.validate(),t&&(this.step=e)):this.step=e},async beforeStep(e,t){const s=await this.$parent.$parent.validate();s?this.errors=this.errors.filter((e=>e!==t)):this.errors.push(t)},async trySubmit(){await this.beforeStep(null,this.step),0===this.errors.length?this.$emit("submit"):this.step=this.errors[0]}}},Ke=Oe,Ce=s("f531"),Fe=s("87fe"),Me=s("b19c"),Re=Object(b["a"])(Ke,Ve,Be,!1,null,null,null),Pe=Re.exports;g()(Re,"components",{QStepper:Ce["a"],QStep:Fe["a"],QStepperNavigation:Me["a"],QBtn:X["a"]});var Qe={name:"FieldMapper",components:{FormRow:$e,Stepper:Pe},props:{fields:{type:Array,required:!0},values:{type:Object,required:!1},tabs:{type:Object||void 0,required:!1},multiKey:{type:String,required:!1},rowIndexMultiple:{type:Number||void 0,required:!1},settings:{type:Object,required:!1}},computed:{sortedFields(){const e=e=>{const t=[],s=[];e.map((e=>{if(this.multiKey&&(e.multiKey=this.multiKey,e.multiIndex=this.rowIndexMultiple),this.values&&void 0!==this.values[e.key]?e.value=this.values[e.key]:void 0===e.value&&(e.value=""),void 0===e.type&&(e.type="text"),void 0===e.key&&(e.key="undefinedKeyN"+Math.random()),void 0===e.rowIndex)s.push([e]);else{const s=t[e.rowIndex-1];t[e.rowIndex-1]=s?[...s,n()({},e)]:[n()(n()({},e),{},{value:String(e.value)})]}}));let r=t.filter((e=>null!=e));return r.splice(r.length-1,0,...s),r};let t=e(this.fields);if(!this.tabs)return t;let s=[];t.map(((e,t)=>{e.map((e=>{const t=e.tabIndex||1,r=s[t-1];s[t-1]=r?[...r,n()({},e)]:[n()({},e)]}))})),s=s.filter((e=>null!=e));const r=[];return s.map(((t,s)=>{r.push(e(t))})),r}}},Ae=Qe,Ee=Object(b["a"])(Ae,r,i,!1,null,null,null);t["default"]=Ee.exports},"2f39":function(e,t,s){"use strict";s.r(t);s("e6cf"),s("7d6e"),s("e54f"),s("985d"),s("31cd");var r=s("2b0e"),i=s("1f91"),o=s("42d2"),n=s("b05d"),l=s("2a19");r["a"].use(n["a"],{config:{},lang:i["a"],iconSet:o["a"],plugins:{Notify:l["a"]}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:rootId}},[e.globalConfig?s("ModalWrapper",{attrs:{settings:e.globalConfig,values:e.globalValues}}):e._e()],1)},u=[];const c={fields:[],buttons:[{type:"submit",label:"отправить",color:"primary",class:"customClassName"},{type:"reset",label:"сбросить"},{type:"close",label:"x"}],form:{async onSubmit(e,t,s){console.log("submited",t)},async onClear(e,t,s){},async onValidateSuccess(e,t,s){console.log("validated form")},async onValidateError(e,t,s,r){console.log("validation error",r)},async onMount(e,t){t.focus()}},title:"Form title"},p={n55eds:"200",mailo12:"testo@validate"};var d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.isModal?s("div",[s("q-dialog",{attrs:{persistent:e.modal.persistent,maximized:e.modal.maximized,"transition-show":e.modal.transitionShow,"transition-hide":e.modal.transitionHide,seamless:e.modal.seamless,"full-width":e.modal.fullWidth,"full-height":e.modal.fullHeigh,position:e.modal.position},model:{value:e.isOpen,callback:function(t){e.isOpen=t},expression:"isOpen"}},[s("FormWrap",{attrs:{settings:e.settings,values:e.values}})],1),e.modal.triggerButton?s("q-btn",{attrs:{type:"btn",label:e.modal.triggerButton.label,color:e.modal.triggerButton.color,"text-color":e.modal.triggerButton.textColor},on:{click:function(t){e.isOpen=!e.isOpen}}}):e._e()],1):s("FormWrap",{attrs:{settings:e.settings,values:e.values}})},h=[],f=s("ded3"),m=s.n(f),b=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("q-card",[e.settings.modal?s("q-bar",[s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{dense:"",flat:"",icon:"close"}},[s("q-tooltip",{attrs:{"content-class":"bg-white text-primary"}},[e._v("Close")])],1)],1):e._e(),s("q-form",{ref:"form",staticClass:"bg-white q-pa-md",on:{submit:e.onSubmit,reset:e.onReset,"validation-success":e.onValidateSuccess,"validation-error":e.onValidateError}},[s("div",{staticClass:"text-h6"},[e._v(e._s(e.settings.title))]),s("FieldMapper",{attrs:{fields:e.settings.fields,values:e.values,tabs:e.settings.tabs,settings:e.settings}}),e.settings.tabs?e._e():s("Buttons",{attrs:{buttons:e.settings.buttons,modal:e.settings.modal}})],1)],1)},y=[],v=(s("ddb0"),s("118e")),g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"q-my-sm"},[e.resBtn.type?s("q-btn",{class:e.resBtn.class,attrs:{label:e.resBtn.label,type:"reset",color:e.resBtn.color,"text-color":e.resBtn.textColor}}):e._e(),s("q-btn",{class:e.subBtn.class,attrs:{label:e.subBtn.label,type:"submit",color:e.subBtn.color,"text-color":e.subBtn.textColor}}),e.closeBtn.type&&e.modal?s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],class:e.closeBtn.class,attrs:{label:e.closeBtn.label,type:"button",color:e.closeBtn.color,"text-color":e.closeBtn.textColor}}):e._e()],1)},S=[],k={name:"Buttons",props:{buttons:{type:Array,required:!1,default:()=>[{type:"submit",label:"Отправить"},{type:"reset",label:"Сбросить"}]},modal:{type:Object||void 0,required:!1}},computed:{subBtn(){let e={};return this.buttons.map((t=>{"submit"===t.type&&(!t.color&&(t.color="primary"),t.class+=" q-ml-sm",e=m()({},t))})),e},resBtn(){let e={};return this.buttons.map((t=>{"reset"===t.type&&(!t.color&&(t.color="primary"),e=m()({},t))})),e},closeBtn(){let e={};return this.buttons.map((t=>{"closeModal"!==t.type&&"close"!==t.type||(!t.color&&(t.color="warning"),t.class+=" q-ml-sm",e=m()({},t))})),e}}},I=k,q=s("2877"),x=s("9c40"),N=s("7f67"),_=s("eebe"),w=s.n(_),j=Object(q["a"])(I,g,S,!1,null,null,null),$=j.exports;w()(j,"components",{QBtn:x["a"]}),w()(j,"directives",{ClosePopup:N["a"]});var V=s("c0d6"),B={name:"FormWrap",components:{FieldMapper:v["default"],Buttons:$},data(){return{form:m()({},this.settings.form)}},props:{settings:{type:Object,required:!0},values:{type:Object,required:!1}},computed:{valuesResponse(){let e=V["a"].getStore();return e}},methods:{async onSubmit(e){const t=m()({},this.valuesResponse);delete t.watcher;for(const[s,r]of Object.entries(t))"object"===typeof r&&r.from&&r.to&&(t[s]={start:r.from,finish:r.to});if(this.form.onSubmit){const e=await this.form.onSubmit(this,t,this.$refs.form);e&&"function"===typeof e&&e(this)}},async onReset(){let e,t;if(this.form.onClear){const s=await this.form.onClear(this,m()({},this.valuesResponse),this.$refs.form);e=s&&s.exeption,t=s&&s.cb}V["a"].resetStore(e),t&&"function"===typeof t&&t(this)},async onValidateSuccess(){if(this.form.onValidateSuccess){const e=await this.form.onValidateSuccess(this,m()({},this.valuesResponse),this.$refs.form);e&&"function"===typeof e&&e(this)}},async onValidateError(e){if(this.form.onValidateError){const t=await this.form.onValidateError(this,m()({},this.valuesResponse),this.$refs.form,e);t&&"function"===typeof t&&t(this)}},async reset(){this.onReset()},async submit(){this.onSubmit()}},async mounted(){if(this.form.onMount){const e=await this.form.onMount(this,this.$refs.form);e&&"function"===typeof e&&e(this)}}},O=B,K=s("f09f"),C=s("d847"),F=s("2c91"),M=s("05c0"),R=s("0378"),P=Object(q["a"])(O,b,y,!1,null,null,null),Q=P.exports;w()(P,"components",{QCard:K["a"],QBar:C["a"],QSpace:F["a"],QBtn:x["a"],QTooltip:M["a"],QForm:R["a"]}),w()(P,"directives",{ClosePopup:N["a"]});var A={name:"ModalWrapper",components:{FormWrap:Q},data(){return{modal:m()({},this.settings.modal),isModal:Boolean(this.settings.modal),isOpen:!this.settings.modal||!1!==this.settings.modal.opened,maximized:Boolean(this.settings.modal&&this.settings.modal.maximized)}},props:{settings:{type:Object,required:!0},values:{type:Object,required:!1}}},E=A,W=s("24e8"),D=Object(q["a"])(E,d,h,!1,null,null,null),T=D.exports;w()(D,"components",{QDialog:W["a"],QBtn:x["a"]});var G={name:"App",data(){return{globalConfig:formConfig,globalValues:formValues}},components:{ModalWrapper:T},beforeMount(){this.globalConfig||console.log("no config provided to form constructor")}},U=G,z=Object(q["a"])(U,a,u,!1,null,null,null),Y=z.exports,H=s("a18c"),J=s.n(H),L=async function(){const e="function"===typeof J.a?await J()({Vue:r["a"]}):J.a,t={router:e,render:e=>e(Y),el:"#"+rootId};return{app:t,router:e}};async function X(){const{app:e,router:t}=await L();new r["a"](e)}X()},"31cd":function(e,t,s){},a18c:function(e,t){},c0d6:function(e,t,s){"use strict";s.d(t,"a",(function(){return n})),s.d(t,"b",(function(){return l}));s("a434"),s("ddb0");var r=s("ded3"),i=s.n(r);const o=e=>("object"===typeof e&&e&&void 0===e.length&&(e=i()({},e),delete e.__ob__,Object.keys(e).length>0&&Object.keys(e).forEach((t=>{let s=o(e[t]);delete s.__ob__,e[t]=s}))),"object"===typeof e&&e&&void 0!==e.length&&(e=[...e],delete e.__ob__,e.length>0&&e.forEach(((t,s)=>{let r=o(t);delete r.__ob__,e[s]=r}))),e),n={debug:!1,state:{watcher:"a"},updateKeyValue(e,t,s="",r=""){"object"===typeof t&&t&&void 0===t.length&&(t=i()({},t)),"object"===typeof t&&t&&void 0!==t.length&&(t=[...t]),s?(this.debug&&console.log(`multiKeys ${s} field ${r} updated key ${e} with `,t),this.state[s]=[...this.state[s]],this.state[s][r]=i()({},this.state[s][r]),this.state[s][r][e]=t):(this.debug&&console.log(`key ${e} recieved value`,t),this.state[e]=t),this.state.watcher=t+String(new Date)},getValueByKey(e,t="",s=""){let r;return r=t?this.state[t]&&this.state[t][s]&&this.state[t][s][e]:this.state[e],this.debug&&console.log("key "+e+" request recieved. Its value ",r),r},getStore(){const e=o(this.state);return e},deleteMultiField(e,t){this.debug&&console.log(`field ${t} was deleted from multikey ${e}`);const s=[...this.state[e]];s.splice(t,1),this.state[e]=s,this.state.watcher="deleted"+e+String(new Date)},resetStore(e=""){this.debug&&console.log("store was reseted");for(const[t,s]of Object.entries(this.state))"watcher"===t?this.state.watcher="empty"+String(new Date):t!==e&&(this.state[t]="")}},l={debug:!1,state:{},setComponent(e,t){this.debug&&console.log("updated ",t),this.state[e]=t},getComponent(e){return this.state[e].$children[0]},get(e){return this.getComponent(e)}}}});
}

// set globalConfig:* to globalConfig:formConfig
// set globalValues:* to globalValues:formValues
// replace "#q-app" to "#"+rootId
// replace "q-app" to rootId

renderer(id, data, config)

} catch (error) {
  console.log(error)
}
}