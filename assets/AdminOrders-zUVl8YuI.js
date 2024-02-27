import{v as V,x as $,q as E,S as b,_ as x,o as _,c as u,a as t,F as v,s as y,t as r,y as h,z as k,I as p,D as A,E as U,m as I,r as O,b as w,A as S}from"./index-aA6L1oq6.js";import{M,P as L}from"./Pagination-3iPaokWM.js";var C={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:R,VITE_APP_PATH:B}=C,T=V("orderStore",{state:()=>({orderList:[],pagination:{}}),actions:{getOrders(e=1){const s=`${R}/api/${B}/admin/orders?page=${e}`;$.get(s).then(i=>{const{orders:m,pagination:d}=i.data;this.orderList=m,this.pagination=d,console.log(i.data)})},timestampToDate(e){const s=new Date(e*1e3),i=s.getFullYear(),m=s.getMonth()+1,d=s.getDate(),c=s.getHours(),l=s.getMinutes(),o=s.getSeconds(),a=`${i}/${m}/${d}`,f=`${c}:${l}:${o}`,D=`${i}/${m}/${d} ${c}:${l}:${o}`;return{formattedDate:a,formattedTime:f,formattedDay:D}}}});var j={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:H,VITE_APP_PATH:q}=j,z={props:{currentOrder:Array},data(){return{orderModal:null,tempOrder:[],inputDisabled:!0,calculateTotal:null}},created(){this.tempOrder=[...this.currentOrder]},watch:{currentOrder:{deep:!0,handler(e){this.tempOrder=e}}},mounted(){this.orderModal=new M(document.querySelector("#orderModal"),{keyboard:!1,backdrop:"static"}),console.log(this.tempOrder)},methods:{...E(T,["getOrders","timestampToDate"]),togglerEdit(){this.inputDisabled=!1,this.updateTotal()},updateTotal(){const e=[];this.tempOrder.forEach(s=>{Object.values(s.products).forEach(i=>{console.log(i),console.log(i.qty),e.push(i.qty*i.product.price)})}),console.log(e),this.calculateTotal=e.reduce((s,i)=>s+i,0),console.log(this.calculateTotal),console.log(this.tempOrder)},updateOrder(){const e=`${H}/api/${q}/admin/order/${this.tempOrder.id}`;this.axios.put(e,{data:this.tempOrder[0]}).then(s=>{b.fire({title:s.data.message,icon:"success",showConfirmButton:!1,timer:1500})}).then(()=>{this.orderModal.hide(),this.getOrders(),this.tempOrder=[...this.currentOrder],this.inputDisabled=!0}).catch(s=>{b.fire({title:s.response.data.message,icon:"error",confirmButtonText:"OK"})})}}},n=e=>(A("data-v-b1a8dc1e"),e=e(),U(),e),F={class:"modal fade",id:"orderModal",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"},X={class:"modal-dialog modal-xl modal-dialog-centered"},N={class:"modal-header bg-dark opacity-75 text-white"},K={class:"modal-title",id:"orderModalLabel"},Y=n(()=>t("br",null,null,-1)),G=n(()=>t("button",{type:"button",class:"btn btn-outline-light","data-bs-dismiss":"modal","aria-label":"Close"},[t("i",{class:"bi bi-x-lg"})],-1)),J={class:"modal-body"},Q={class:"container-fluid"},W={class:"row mb-5"},Z={class:"border rounded p-2 bg-light"},tt={class:"row mb-2"},et={class:"col-md-5 d-flex align-items-center gap-3"},st=n(()=>t("label",{for:"payment",class:"col-form-label"},"付款狀態：",-1)),ot=["onUpdate:modelValue","disabled"],lt=n(()=>t("option",{value:!0}," 已付款 ",-1)),at=n(()=>t("option",{value:!1}," 未付款 ",-1)),dt=[lt,at],nt={key:0,class:"bi bi-check-circle-fill text-success",style:{scale:"150%"}},it={key:1,class:"bi bi-x-circle-fill text-danger",style:{scale:"150%"}},ct={class:"col-md-7"},rt={class:"row"},_t={class:"col-md-5"},ut=n(()=>t("h5",null,"訂購資訊",-1)),ht={class:"row mb-2"},pt=n(()=>t("label",{for:"date",class:"col-sm-3 col-form-label"},"建立時間：",-1)),mt={class:"col-sm-9"},bt=["onUpdate:modelValue","disabled"],ft={class:"row mb-2"},gt=n(()=>t("label",{for:"Email",class:"col-sm-3 col-form-label"},"Email：",-1)),vt={class:"col-sm-9"},yt=["onUpdate:modelValue","disabled"],Tt={class:"row mb-2"},Ot=n(()=>t("label",{for:"name",class:"col-sm-3 col-form-label"},"收件姓名：",-1)),wt={class:"col-sm-9"},Pt=["onUpdate:modelValue","disabled"],Et={class:"row mb-2"},xt=n(()=>t("label",{for:"tel",class:"col-sm-3 col-form-label"},"聯絡電話：",-1)),Dt={class:"col-sm-9"},Vt=["onUpdate:modelValue","disabled"],$t={class:"row mb-2"},kt=n(()=>t("label",{for:"address",class:"col-sm-3 col-form-label"},"收件地址：",-1)),At={class:"col-sm-9"},Ut=["onUpdate:modelValue","disabled"],It={class:"row mb-2"},St=n(()=>t("label",{for:"note",class:"col-sm-3 col-form-label"},"留言：",-1)),Mt={class:"col-sm-9"},Lt=["onUpdate:modelValue","disabled"],Ct={class:"col-md-7"},Rt=n(()=>t("div",{class:"container"},[t("div",{class:"d-flex justify-content-between"},[t("h5",null,"商品內容"),t("span",{class:"fs-6 text-danger"},"優惠碼：")])],-1)),Bt={class:"container table-responsive"},jt={class:"table table-hover align-middle"},Ht=n(()=>t("thead",{class:"table-warning"},[t("tr",{class:"align-middle",style:{height:"48px"}},[t("th",{scope:"col",class:"fw-bold",style:{width:"60%"}},"商品"),t("th",{scope:"col",class:"fw-bold",style:{width:"15%"}},"數量"),t("th",{scope:"col",class:"fw-bold text-end",style:{width:"20%"}},"單價"),t("th",{style:{width:"5%"}})])],-1)),qt={class:"d-flex align-items-center gap-1"},zt=["src"],Ft={class:"pe-0"},Xt={class:"d-flex justify-content-between align-items-center"},Nt={class:"input-group input-group-sm"},Kt=["onUpdate:modelValue","disabled"],Yt={class:"input-group-text"},Gt={class:"text-end"},Jt={class:"fs-6 mb-0"},Qt={class:"text-end p-0"},Wt=["disabled"],Zt=n(()=>t("td",null,"訂單金額",-1)),te={class:"text-end fs-5 text-danger fw-bold"},ee={key:0},se={key:1},oe=n(()=>t("td",null,null,-1)),le={class:"modal-footer"},ae=n(()=>t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 取消 ",-1)),de=["onClick"];function ne(e,s,i,m,d,c){return _(),u("div",F,[t("div",X,[(_(!0),u(v,null,y(d.tempOrder,l=>(_(),u("div",{key:"orderID-"+l.id,class:"modal-content"},[t("div",N,[t("h5",K,[t("span",null,"訂單編號："+r(l.id),1),Y]),G]),t("div",J,[t("div",Q,[t("div",W,[t("div",Z,[t("div",tt,[t("div",et,[st,t("div",null,[h(t("select",{"onUpdate:modelValue":o=>l.is_paid=o,disabled:d.inputDisabled,class:"form-select",id:"payment"},dt,8,ot),[[k,l.is_paid]])]),l.is_paid?(_(),u("i",nt)):(_(),u("i",it))]),t("div",ct,[t("button",{onClick:s[0]||(s[0]=(...o)=>c.togglerEdit&&c.togglerEdit(...o)),type:"button",class:"btn btn-warning"},"修改訂單")])])])]),t("div",rt,[t("div",_t,[ut,t("form",null,[t("div",ht,[pt,t("div",mt,[h(t("input",{"onUpdate:modelValue":o=>e.timestampToDate(l.create_at).formattedDay=o,disabled:d.inputDisabled,type:"text",class:"form-control",id:"date"},null,8,bt),[[p,e.timestampToDate(l.create_at).formattedDay]])])]),t("div",ft,[gt,t("div",vt,[h(t("input",{"onUpdate:modelValue":o=>l.user.email=o,disabled:d.inputDisabled,type:"email",class:"form-control",id:"Email"},null,8,yt),[[p,l.user.email]])])]),t("div",Tt,[Ot,t("div",wt,[h(t("input",{"onUpdate:modelValue":o=>l.user.name=o,disabled:d.inputDisabled,type:"text",class:"form-control",id:"name"},null,8,Pt),[[p,l.user.name]])])]),t("div",Et,[xt,t("div",Dt,[h(t("input",{"onUpdate:modelValue":o=>l.user.tel=o,disabled:d.inputDisabled,type:"text",class:"form-control",id:"tel"},null,8,Vt),[[p,l.user.tel]])])]),t("div",$t,[kt,t("div",At,[h(t("input",{"onUpdate:modelValue":o=>l.user.address=o,disabled:d.inputDisabled,type:"text",class:"form-control",id:"address"},null,8,Ut),[[p,l.user.address]])])]),t("div",It,[St,t("div",Mt,[h(t("textarea",{"onUpdate:modelValue":o=>l.user.message=o,disabled:d.inputDisabled,class:"form-control",name:"note",id:"note",cols:"10",rows:"10",style:{height:"100px"}},null,8,Lt),[[p,l.user.message]])])])])]),t("div",Ct,[Rt,t("div",Bt,[t("table",jt,[Ht,t("tbody",null,[(_(!0),u(v,null,y(l.products,o=>(_(),u("tr",{key:o.product.title},[t("td",qt,[t("img",{src:o.product.imageUrl,class:"rounded order-img"},null,8,zt),t("small",null,r(o.product.title),1)]),t("td",Ft,[t("div",Xt,[t("div",Nt,[h(t("input",{"onUpdate:modelValue":a=>o.qty=a,disabled:d.inputDisabled,onClick:s[1]||(s[1]=(...a)=>c.updateTotal&&c.updateTotal(...a)),type:"number",min:"1",class:"form-control"},null,8,Kt),[[p,o.qty]]),t("span",Yt,r(o.product.unit),1)])])]),t("td",Gt,[t("p",Jt,r(o.product.price)+"元",1)]),t("td",Qt,[t("button",{disabled:d.inputDisabled,onClick:s[2]||(s[2]=(...a)=>e.deleteOrder&&e.deleteOrder(...a)),type:"button",class:"btn btn-outline-danger btn-sm py-0",style:{scale:"80%"}}," x ",8,Wt)])]))),128))]),t("tfoot",null,[t("tr",null,[t("td",null,[t("span",null,r(`總共 ${Object.keys(l.products).length} 項`),1)]),Zt,t("td",te,[d.inputDisabled?(_(),u("span",ee,r(l.total)+"元 ",1)):(_(),u("span",se,r(d.calculateTotal)+"元 ",1))]),oe])])])])])])])]),t("div",le,[ae,t("button",{onClick:o=>c.updateOrder(l),type:"button",class:"btn btn-danger"}," 更新訂單 ",8,de)])]))),128))])])}const ie=x(z,[["render",ne],["__scopeId","data-v-b1a8dc1e"]]);var ce={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:g,VITE_APP_PATH:P}=ce,re={components:{OrderModal:ie,Pagination:L},data(){return{title:"訂單列表",selectedOrder:[]}},computed:{...I(T,["orderList","pagination"])},mounted(){this.getOrders()},methods:{...E(T,["getOrders","timestampToDate"]),checkOrder(e){this.selectedOrder=[...e],console.log("order",this.selectedOrder),this.$refs.orderModal.orderModal.show()},deleteOrder(e){const s=`${g}/api/${P}/cart/${e}`;this.axios.delete(s).then(i=>{b.fire({title:i.data.message,icon:"success",showConfirmButton:!1,timer:1500}),this.getOrders()})},deleteOrders(){const e=`${g}/api/${P}/carts`;this.axios.delete(e).then(s=>{b.fire({title:s.data.message,icon:"success",showConfirmButton:!1,timer:1500}),this.getOrders()})},logout(){const e=`${g}/logout`;this.axios.post(e).then(s=>{b.fire({title:s.data.message,icon:"success",showConfirmButton:!1,timer:1500}).then(()=>{document.cookie="myToken=; expires=;",this.axios.defaults.headers.common.Authorization=null,this.$router.push({name:"login"})})})}}},_e={class:"container"},ue={class:"row py-2"},he={class:"col mt-4 mb-4"},pe={class:"container py-2"},me=t("h2",null,"這是訂單頁面",-1),be={class:"d-flex justify-content-between gap-2 py-2"},fe={class:"p-2 mb-0"},ge={class:"d-flex justify-content-end gap-2"},ve={class:"container"},ye={class:"table table-hover"},Te=t("thead",{class:"table-dark"},[t("tr",null,[t("th",{scope:"col",class:"fw-bold"},"日期"),t("th",{scope:"col",class:"fw-bold"},"序號"),t("th",{scope:"col",class:"fw-bold"},"訂單編號"),t("th",{scope:"col",class:"fw-bold"},"品項"),t("th",{scope:"col",class:"fw-bold"},"金額"),t("th",{scope:"col",class:"fw-bold"},"訂單狀態"),t("th",{scope:"col",class:"fw-bold"},"付款日期"),t("th")])],-1),Oe={class:"d-block"},we={class:"text-muted"},Pe=t("td",null,null,-1),Ee={class:"btn-group",role:"group","aria-label":"Basic outlined example"},xe=["onClick"],De=["onClick"];function Ve(e,s,i,m,d,c){const l=O("order-modal"),o=O("Pagination");return _(),u("main",_e,[t("div",ue,[t("main",he,[t("div",pe,[me,t("div",be,[t("p",fe,r(`一頁顯示 ${Object.keys(this.orderList).length} 項商品`),1),t("div",ge,[t("button",{onClick:s[0]||(s[0]=(...a)=>c.deleteOrders&&c.deleteOrders(...a)),type:"button",class:"btn btn-danger"}," 刪除全部訂單 "),t("button",{onClick:s[1]||(s[1]=(...a)=>c.logout&&c.logout(...a)),type:"button",class:"btn btn-warning"}," 登出 ")]),w(l,{ref:"orderModal",currentOrder:d.selectedOrder},null,8,["currentOrder"])])]),t("div",ve,[t("table",ye,[Te,t("tbody",null,[(_(!0),u(v,null,y(e.orderList,a=>(_(),u("tr",{key:a.title},[t("td",null,[t("span",Oe,r(e.timestampToDate(a.create_at).formattedDate),1),t("small",we,r(e.timestampToDate(a.create_at).formattedTime),1)]),t("td",null,r(a.num),1),t("td",null,r(a.id),1),t("td",null,r(Object.keys(a.products).length),1),t("td",null,r(a.total),1),t("td",{class:S({"text-success":a.is_paid,"text-danger":!a.is_paid})},r(a.is_paid?"已付款":"未付款"),3),Pe,t("td",null,[t("div",Ee,[t("button",{onClick:f=>c.checkOrder(a),type:"button",class:"btn btn-outline-primary btn-sm"}," 查看訂單 ",8,xe),t("button",{onClick:f=>c.deleteOrder(a.id),type:"button",class:"btn btn-outline-danger btn-sm"}," 刪除 ",8,De)])])]))),128))])])]),w(o,{pages:e.pagination,onShowPage:e.getOrders},null,8,["pages","onShowPage"])])])])}const Ae=x(re,[["render",Ve]]);export{Ae as default};
