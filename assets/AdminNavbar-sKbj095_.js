import{_ as i,S as l,r as c,o as d,c as _,a,b as e,w as o,F as m,d as s}from"./index-pcAwSSA1.js";var u={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"runweiting",VITE_TEXT:"這是部屬完成的環境",BASE_URL:"/create-vue-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_APP_URL:v}=u,h={created(){const t=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.axios.defaults.headers.common.Authorization=t},mounted(){this.checkAdmin()},methods:{checkAdmin(){const t=`${v}/api/user/check`;this.axios.post(t).catch(()=>{l.fire({title:"驗證錯誤，請重新登入",icon:"error",confirmButtonText:"OK"}).then(()=>{this.$router.push({name:"login"})})})}}},p={class:"navbar navbar-expand-lg navbar-dark bg-dark"},b={class:"container px-4"},f=a("a",{class:"navbar-brand mb-0",href:"index.html"},"UNIQLOLO",-1),x=a("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[a("span",{class:"navbar-toggler-icon"})],-1),g={class:"collapse navbar-collapse justify-content-end",id:"navbarNav"},k={class:"navbar-nav gap-2"},T={class:"nav-item"},A={class:"nav-item"},E={class:"nav-item"},$={class:"nav-item"};function N(t,P,V,L,R,w){const n=c("RouterLink"),r=c("router-view");return d(),_(m,null,[a("header",null,[a("nav",p,[a("div",b,[f,x,a("div",g,[a("ul",k,[a("li",T,[e(n,{to:{name:"admin/products"},class:"nav-link text-decoration-none"},{default:o(()=>[s("商品列表")]),_:1})]),a("li",A,[e(n,{to:{name:"admin/orders"},class:"nav-link text-decoration-none"},{default:o(()=>[s("訂單列表")]),_:1})]),a("li",E,[e(n,{to:{name:"admin/articles"},class:"nav-link text-decoration-none"},{default:o(()=>[s("編輯文章")]),_:1})]),a("li",$,[e(n,{to:{name:"home"},class:"nav-link text-decoration-none"},{default:o(()=>[s("回到前台")]),_:1})])])])])])]),a("main",null,[e(r)])],64)}const I=i(h,[["render",N]]);export{I as default};
