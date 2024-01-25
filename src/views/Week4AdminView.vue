<script>
import Swal from 'sweetalert2';
import AdminMain from '../components/week4/AdminMain.vue';

export default {
  components: {
    AdminMain,
},
};
</script>
<template>
  <main class="container">
    <div class="row py-2">
      <!-- 
        向 admin-main 傳遞 products 並帶入 products
       -->
      <admin-main />
    </div>
  </main>
</template>

<style>
</style>
