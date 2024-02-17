import{_ as m,u as c,S as s,o as p,c as f,a as e,h as u,s as d}from"./index-SKB7VdvU.js";const h={data(){return{apiUrl:"https://vue3-course-api.hexschool.io/v2",apiPath:"runweiting",user:{username:"",password:""}}},created(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");o&&(this.axios.defaults.headers.common.Authorization=o)},methods:{login(){if(c()){s.fire({title:"已成功登入，不需重複登入",icon:"success",confirmButtonText:"OK"}),this.goToWeek4Admin();return}const o=`${this.apiUrl}/admin/signin`;this.axios.post(o,this.user).then(t=>{const{expired:r,token:a}=t.data;document.cookie=`myToken=${a}; expires=${new Date(r)}`,s.fire({title:"您已成功登入",icon:"success",confirmButtonText:"OK"}).then(()=>{this.goToWeek4Admin()}),this.user={}}).catch(t=>{t.response&&t.response.status===400?s.fire({title:"登入帳號或密碼錯誤",text:"請輸入正確的帳號和密碼",icon:"error",confirmButtonText:"OK"}):(this.user.username===""||this.user.password==="")&&s.fire({title:"請輸入登入信箱和密碼",icon:"error",confirmButtonText:"OK"})})},goToWeek4Admin(){c()?(s.fire({title:"這是後台商品頁面",icon:"success",confirmButtonText:"OK"}),this.$router.push({name:"dashboard"})):(s.fire({title:"請先登入",icon:"error",confirmButtonText:"OK"}),this.$router.push({name:"login"}))}}},_={class:"container"},x=e("h1",{class:"pt-5 text-center"},"登入後台",-1),g={class:"row py-5 flex-column align-items-center"},w=e("div",{class:"col-md-6 text-center mb-3"},[e("h3",null,"請先登入")],-1),k={class:"col-md-6"},T={class:"form-floating mb-3"},v=e("label",{for:"floatingInput"},"Email address",-1),b={class:"form-floating mb-3"},B=e("label",{for:"floatingPassword"},"Password",-1),y=e("p",{class:"text-secondary text-center pt-5"},"© create-vue-project",-1);function K(o,t,r,a,i,l){return p(),f("main",_,[x,e("div",g,[w,e("div",k,[e("form",null,[e("div",T,[u(e("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>i.user.username=n),type:"email",class:"form-control",id:"floatingInput",placeholder:"name@example.com",autocomplete:"email"},null,512),[[d,i.user.username]]),v]),e("div",b,[u(e("input",{"onUpdate:modelValue":t[1]||(t[1]=n=>i.user.password=n),type:"password",class:"form-control",id:"floatingPassword",placeholder:"Password",autocomplete:"current-password"},null,512),[[d,i.user.password]]),B]),e("div",null,[e("button",{onClick:t[2]||(t[2]=(...n)=>l.login&&l.login(...n)),type:"button",class:"btn btn-primary w-100"}," 登入 ")])]),y])])])}const $=m(h,[["render",K]]);export{$ as default};
