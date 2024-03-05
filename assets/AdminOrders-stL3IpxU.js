import{v as L,x as U,q as w,S as h,_ as P,o as i,c,a as t,t as a,y as _,z as I,I as m,F as k,s as E,C as D,A as b,D as S,E as C,d as O,m as M,r as y,b as T}from"./index-xEOnfpOF.js";import{t as V}from"./timestampToDate-lwWXufjj.js";import{M as R,P as j}from"./Pagination-YNZOTnrG.js";var B={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:H,VITE_APP_PATH:q}=B,v=L("orderStore",{state:()=>({orderList:[],pagination:{}}),actions:{getOrders(l=1){const e=`${H}/api/${q}/admin/orders?page=${l}`;U.get(e).then(u=>{const{orders:f,pagination:s}=u.data,d=f.map(o=>({...o,calculateTotal:this.updateTotal(o)}));this.orderList=d,this.pagination=s,console.log(this.orderList)})},updateTotal(l){if(!l||!l.products)return 0;let e=0;return Object.values(l.products).forEach(u=>{e+=u.qty*u.product.price}),e}}});var N={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:z,VITE_APP_PATH:F}=N,X={props:{currentOrder:Object},data(){return{orderModal:null,tempOrder:{},inputDisabled:!0,subTotal:0}},created(){this.tempOrder={...this.currentOrder,products:{},user:{email:"",name:"",tel:"",address:""}}},watch:{currentOrder:{deep:!0,handler(l){this.tempOrder=l}}},mounted(){this.orderModal=new R(document.querySelector("#orderModal"),{keyboard:!1,backdrop:"static"}),console.log(this.tempOrder)},methods:{...w(v,["getOrders","timestampToDate"]),formatDate(l){const{formattedDay:e,formattedDate:u}=V(l);return{formattedDay:e,formattedDate:u}},togglerEdit(){this.inputDisabled=!1,this.updateTotal()},updateTotal(){this.subTotal=this.tempOrder.calculateTotal;let l=0;Object.values(this.tempOrder.products).forEach(e=>{l+=e.qty*e.product.price}),this.subTotal=l},cancelUpdateOrder(){this.subTotal=0,this.inputDisabled=!0},updateOrder(){const l=`${z}/api/${F}/admin/order/${this.tempOrder.id}`;this.axios.put(l,{data:this.tempOrder}).then(e=>{h.fire({title:e.data.message,icon:"success",showConfirmButton:!1,timer:1500})}).then(()=>{this.subTotal=0,this.inputDisabled=!0,this.orderModal.hide(),this.getOrders(),this.tempOrder=[...this.currentOrder]}).catch(e=>{h.fire({title:e.response.data.message,icon:"error",confirmButtonText:"OK"})})}}},n=l=>(S("data-v-1969b57f"),l=l(),C(),l),K={class:"modal fade",id:"orderModal",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"},G={class:"modal-dialog modal-xl modal-dialog-centered"},J={class:"modal-content"},Q={class:"modal-header bg-dark opacity-75 text-white"},W={class:"modal-title",id:"orderModalLabel"},Y=n(()=>t("br",null,null,-1)),Z=n(()=>t("i",{class:"bi bi-x-lg"},null,-1)),$=[Z],tt={class:"modal-body"},et={class:"container-fluid"},st={class:"row mb-5"},ot={class:"border rounded p-2 bg-light"},lt={class:"row mb-2"},dt={class:"col-md-5 d-flex align-items-center gap-3"},rt=n(()=>t("label",{for:"payment",class:"col-form-label"},"付款狀態：",-1)),at=["disabled"],nt=n(()=>t("option",{value:!0}," 已付款 ",-1)),it=n(()=>t("option",{value:!1}," 未付款 ",-1)),ct=[nt,it],ut={key:0,class:"bi bi-check-circle-fill text-success",style:{scale:"150%"}},_t={key:1,class:"bi bi-x-circle-fill text-danger",style:{scale:"150%"}},pt={class:"col-md-7"},mt={class:"row"},ht={class:"col-md-5"},bt=n(()=>t("h5",null,"訂購資訊",-1)),ft={class:"row mb-2"},Ot=n(()=>t("label",{for:"date",class:"col-sm-3 col-form-label"},"建立時間：",-1)),gt={class:"col-sm-9"},vt=["disabled"],yt={class:"row mb-2"},Tt=n(()=>t("label",{for:"Email",class:"col-sm-3 col-form-label"},"Email：",-1)),xt={class:"col-sm-9"},wt=["disabled"],Pt={class:"row mb-2"},kt=n(()=>t("label",{for:"name",class:"col-sm-3 col-form-label"},"收件姓名：",-1)),Et={class:"col-sm-9"},Dt=["disabled"],Vt={class:"row mb-2"},At=n(()=>t("label",{for:"tel",class:"col-sm-3 col-form-label"},"聯絡電話：",-1)),Lt={class:"col-sm-9"},Ut=["disabled"],It={class:"row mb-2"},St=n(()=>t("label",{for:"address",class:"col-sm-3 col-form-label"},"收件地址：",-1)),Ct={class:"col-sm-9"},Mt=["disabled"],Rt={class:"row mb-2"},jt=n(()=>t("label",{for:"note",class:"col-sm-3 col-form-label"},"留言：",-1)),Bt={class:"col-sm-9"},Ht=["disabled"],qt={class:"col-md-7"},Nt=n(()=>t("div",{class:"container"},[t("div",{class:"d-flex justify-content-between"},[t("h5",null,"商品內容")])],-1)),zt={class:"container table-responsive"},Ft={class:"table table-hover align-middle"},Xt=n(()=>t("thead",{class:"table-warning"},[t("tr",{class:"align-middle",style:{height:"48px"}},[t("th",{scope:"col",class:"fw-bold",style:{width:"60%"}},"商品"),t("th",{scope:"col",class:"fw-bold",style:{width:"20%"}},"數量"),t("th",{scope:"col",class:"fw-bold text-end",style:{width:"15%"}},"單價"),t("th",{style:{width:"5%"}})])],-1)),Kt={class:"d-flex align-items-center gap-2"},Gt=["src"],Jt=n(()=>t("br",null,null,-1)),Qt={key:0,class:"text-danger"},Wt={class:"pe-0"},Yt={class:"d-flex justify-content-between align-items-center"},Zt={class:"input-group input-group-sm"},$t=["onUpdate:modelValue","disabled"],te={class:"input-group-text"},ee={class:"text-end"},se={class:"fs-6 mb-0"},oe={class:"text-end p-0"},le=["disabled"],de=n(()=>t("td",null,[O(" 原始金額： "),t("br"),O(" 更新金額： "),t("br"),O(" 折扣金額： ")],-1)),re={class:"text-end text-danger fw-bold"},ae=n(()=>t("br",null,null,-1)),ne=n(()=>t("br",null,null,-1)),ie={key:0},ce=n(()=>t("td",null,null,-1)),ue={class:"modal-footer"};function _e(l,e,u,f,s,d){return i(),c("div",K,[t("div",G,[t("div",J,[t("div",Q,[t("h5",W,[t("span",null,"訂單編號："+a(s.tempOrder.id),1),Y]),t("button",{onClick:e[0]||(e[0]=(...o)=>d.cancelUpdateOrder&&d.cancelUpdateOrder(...o)),type:"button",class:"btn btn-outline-light","data-bs-dismiss":"modal","aria-label":"Close"},$)]),t("div",tt,[t("div",et,[t("div",st,[t("div",ot,[t("div",lt,[t("div",dt,[rt,t("div",null,[_(t("select",{"onUpdate:modelValue":e[1]||(e[1]=o=>s.tempOrder.is_paid=o),disabled:s.inputDisabled,class:"form-select",id:"payment"},ct,8,at),[[I,s.tempOrder.is_paid]])]),s.tempOrder.is_paid?(i(),c("i",ut)):(i(),c("i",_t))]),t("div",pt,[t("button",{onClick:e[2]||(e[2]=(...o)=>d.togglerEdit&&d.togglerEdit(...o)),type:"button",class:"btn btn-warning"},"修改訂單")])])])]),t("div",mt,[t("div",ht,[bt,t("form",null,[t("div",ft,[Ot,t("div",gt,[_(t("input",{"onUpdate:modelValue":e[3]||(e[3]=o=>d.formatDate(s.tempOrder.create_at).formattedDate=o),disabled:s.inputDisabled,type:"text",class:"form-control",id:"date"},null,8,vt),[[m,d.formatDate(s.tempOrder.create_at).formattedDate]])])]),t("div",yt,[Tt,t("div",xt,[_(t("input",{"onUpdate:modelValue":e[4]||(e[4]=o=>s.tempOrder.user.email=o),disabled:s.inputDisabled,type:"email",class:"form-control",id:"Email"},null,8,wt),[[m,s.tempOrder.user.email]])])]),t("div",Pt,[kt,t("div",Et,[_(t("input",{"onUpdate:modelValue":e[5]||(e[5]=o=>s.tempOrder.user.name=o),disabled:s.inputDisabled,type:"text",class:"form-control",id:"name"},null,8,Dt),[[m,s.tempOrder.user.name]])])]),t("div",Vt,[At,t("div",Lt,[_(t("input",{"onUpdate:modelValue":e[6]||(e[6]=o=>s.tempOrder.user.tel=o),disabled:s.inputDisabled,type:"text",class:"form-control",id:"tel"},null,8,Ut),[[m,s.tempOrder.user.tel]])])]),t("div",It,[St,t("div",Ct,[_(t("input",{"onUpdate:modelValue":e[7]||(e[7]=o=>s.tempOrder.user.address=o),disabled:s.inputDisabled,type:"text",class:"form-control",id:"address"},null,8,Mt),[[m,s.tempOrder.user.address]])])]),t("div",Rt,[jt,t("div",Bt,[_(t("textarea",{"onUpdate:modelValue":e[8]||(e[8]=o=>s.tempOrder.user.message=o),disabled:s.inputDisabled,class:"form-control",name:"note",id:"note",cols:"10",rows:"10",style:{height:"100px"}},null,8,Ht),[[m,s.tempOrder.user.message]])])])])]),t("div",qt,[Nt,t("div",zt,[t("table",Ft,[Xt,t("tbody",null,[(i(!0),c(k,null,E(s.tempOrder.products,o=>(i(),c("tr",{key:o.id},[t("td",Kt,[t("img",{src:o.product.imageUrl,class:"rounded order-img"},null,8,Gt),t("div",null,[t("small",null,a(o.product.title),1),Jt,o.coupon?(i(),c("small",Qt,"優惠碼："+a(o.coupon.code)+"、折數："+a(o.coupon.percent)+"%",1)):D("",!0)])]),t("td",Wt,[t("div",Yt,[t("div",Zt,[_(t("input",{"onUpdate:modelValue":p=>o.qty=p,disabled:s.inputDisabled,onClick:e[9]||(e[9]=(...p)=>d.updateTotal&&d.updateTotal(...p)),type:"number",min:"1",class:"form-control"},null,8,$t),[[m,o.qty]]),t("span",te,a(o.product.unit),1)])])]),t("td",ee,[t("p",se,a(o.product.price)+"元",1)]),t("td",oe,[t("button",{disabled:s.inputDisabled,onClick:e[10]||(e[10]=(...p)=>l.deleteOrder&&l.deleteOrder(...p)),type:"button",class:"btn btn-outline-danger btn-sm py-0",style:{scale:"80%"}}," x ",8,le)])]))),128))]),t("tfoot",null,[t("tr",null,[t("td",null,[t("span",null,a(`總共 ${Object.keys(s.tempOrder.products).length} 項`),1)]),de,t("td",re,[t("span",{class:b({"fw-normal":s.subTotal,"text-dark":s.subTotal,"text-decoration-line-through":s.subTotal})},a(s.tempOrder.calculateTotal)+"元 ",3),ae,t("span",{class:b({"fw-normal":!s.subTotal,"text-dark":!s.subTotal,"text-decoration-line-through":!s.subTotal})},a(s.subTotal)+"元 ",3),ne,s.tempOrder.calculateTotal!==s.tempOrder.total?(i(),c("span",ie,a(s.tempOrder.total)+"元 ",1)):(i(),c("span",{key:1,class:b({"fw-normal":s.tempOrder.calculateTotal==s.tempOrder.total,"text-dark":s.tempOrder.calculateTotal==s.tempOrder.total})},"無優惠碼",2))]),ce])])])])])])])]),t("div",ue,[t("button",{onClick:e[11]||(e[11]=(...o)=>d.cancelUpdateOrder&&d.cancelUpdateOrder(...o)),type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 取消 "),t("button",{onClick:e[12]||(e[12]=(...o)=>d.updateOrder&&d.updateOrder(...o)),type:"button",class:"btn btn-danger"}," 更新訂單 ")])])])])}const pe=P(X,[["render",_e],["__scopeId","data-v-1969b57f"]]);var me={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:g,VITE_APP_PATH:x}=me,he={components:{OrderModal:pe,Pagination:j},data(){return{title:"訂單列表",tempOrderList:[],selectedOrder:{}}},created(){this.tempOrderList=[...this.orderList]},watch:{orderList:{deep:!0,handler(l){this.tempOrderList=l}}},computed:{...M(v,["orderList","pagination","calculateTotal"])},mounted(){this.getOrders()},methods:{...w(v,["getOrders"]),formatDate(l){const{formattedDate:e,formattedTime:u}=V(l);return{formattedDate:e,formattedTime:u}},checkOrder(l){this.selectedOrder={...l},console.log("order",this.selectedOrder),this.$refs.orderModal.orderModal.show()},deleteOrder(l){const e=`${g}/api/${x}/admin/order/${l}`;this.axios.delete(e).then(u=>{h.fire({title:u.data.message,icon:"success",showConfirmButton:!1,timer:1500})}).then(()=>{this.getOrders()})},deleteOrders(){const l=`${g}/api/${x}/admin/orders/all`;this.axios.delete(l).then(e=>{h.fire({title:e.data.message,icon:"success",showConfirmButton:!1,timer:1500}),this.getOrders()})},logout(){const l=`${g}/logout`;this.axios.post(l).then(e=>{h.fire({title:e.data.message,icon:"success",showConfirmButton:!1,timer:1500}).then(()=>{document.cookie="myToken=; expires=;",this.axios.defaults.headers.common.Authorization=null,this.$router.push({name:"login"})})})}}},be={class:"container"},fe={class:"row py-2"},Oe={class:"col mt-4 mb-4"},ge={class:"container py-2"},ve=t("h2",null,"這是訂單頁面",-1),ye={class:"d-flex justify-content-between gap-2 py-2"},Te={class:"p-2 mb-0"},xe={class:"d-flex justify-content-end gap-2"},we={class:"container"},Pe={class:"table table-hover"},ke=t("thead",{class:"table-dark"},[t("tr",null,[t("th",{scope:"col",class:"fw-bold"},"日期"),t("th",{scope:"col",class:"fw-bold"},"序號"),t("th",{scope:"col",class:"fw-bold"},"訂單編號"),t("th",{scope:"col",class:"fw-bold"},"品項"),t("th",{scope:"col",class:"fw-bold"},"金額"),t("th",{scope:"col",class:"fw-bold"},"優惠卷"),t("th",{scope:"col",class:"fw-bold"},"訂單狀態"),t("th",{scope:"col",class:"fw-bold"},"付款日期"),t("th")])],-1),Ee={key:0},De=t("td",{colspan:"7"},[t("small",{class:"text-muted"}," 目前沒有任何訂單 ")],-1),Ve=[De],Ae={class:"d-block"},Le={class:"text-muted"},Ue={key:0},Ie={key:1},Se={key:0,class:"bi bi-check-circle-fill text-success",style:{scale:"150%"}},Ce={key:1,class:"bi bi-x-circle-fill text-danger",style:{scale:"150%"}},Me=t("td",null,null,-1),Re={class:"btn-group",role:"group","aria-label":"Basic outlined example"},je=["onClick"],Be=["onClick"];function He(l,e,u,f,s,d){const o=y("order-modal"),p=y("Pagination");return i(),c("main",be,[t("div",fe,[t("main",Oe,[t("div",ge,[ve,t("div",ye,[t("p",Te,a(`一頁顯示 ${Object.keys(this.tempOrderList).length} 項商品`),1),t("div",xe,[t("button",{onClick:e[0]||(e[0]=(...r)=>d.deleteOrders&&d.deleteOrders(...r)),type:"button",class:"btn btn-danger"}," 刪除全部訂單 "),t("button",{onClick:e[1]||(e[1]=(...r)=>d.logout&&d.logout(...r)),type:"button",class:"btn btn-warning"}," 登出 ")]),T(o,{ref:"orderModal",currentOrder:s.selectedOrder},null,8,["currentOrder"])])]),t("div",we,[t("table",Pe,[ke,t("tbody",null,[s.tempOrderList?D("",!0):(i(),c("tr",Ee,Ve)),(i(!0),c(k,null,E(s.tempOrderList,r=>(i(),c("tr",{key:r.title},[t("td",null,[t("span",Ae,a(d.formatDate(r.create_at).formattedDate),1),t("small",Le,a(d.formatDate(r.create_at).formattedTime),1)]),t("td",null,a(r.num),1),t("td",null,a(r.id),1),t("td",null,a(Object.keys(r.products).length),1),t("td",null,[r.total?(i(),c("span",Ue,a(r.total),1)):(i(),c("span",Ie,a(r.calculateTotal),1))]),t("td",null,[r.calculateTotal!==r.total?(i(),c("i",Se)):(i(),c("i",Ce))]),t("td",{class:b({"text-success":r.is_paid,"text-danger":!r.is_paid})},a(r.is_paid?"已付款":"未付款"),3),Me,t("td",null,[t("div",Re,[t("button",{onClick:A=>d.checkOrder(r),type:"button",class:"btn btn-outline-primary btn-sm"}," 查看訂單 ",8,je),t("button",{onClick:A=>d.deleteOrder(r.id),type:"button",class:"btn btn-outline-danger btn-sm"}," 刪除 ",8,Be)])])]))),128))])])]),T(p,{pages:l.pagination,onShowPage:l.getOrders},null,8,["pages","onShowPage"])])])])}const Fe=P(he,[["render",He]]);export{Fe as default};
