<template>
    <div class="container">
        <h1 class="pt-5 text-center">我的購物車</h1>
        <div class="row">
            <div class="col">
                <cart-list class="w-100 py-3" />
            </div>
            <div class="col">
                <order-detail class="w-100 mt-4 p-3" @sendOrder="createOrder" ref="orderDetail" />
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import CartList from '@/components/week6/CartList.vue';
import OrderDetail from '@/components/week5/OrderDetail.vue';

export default {
    components: {
        CartList,
        OrderDetail
    },
    data() {
        return {
            apiUrl: import.meta.env.VITE_APP_URL,
            apiPath: import.meta.env.VITE_APP_PATH,
        }
    },
    methods: {
        ...mapActions(cartStore, ['getCart']),
        // POST 結帳
        createOrder(data) {
            const order = {
                data,
            };
            const url = `${this.apiUrl}/api/${this.apiPath}/order`;
            this.axios
            .post(url, order)
            .then((res) => {
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                // OrderDetail重置表單
                this.$refs.orderDetail.resetForm();
                this.getCart();
            })
            .catch((err) => {
                Swal.fire({
                    title: err.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            });
        },
    }
}
</script>