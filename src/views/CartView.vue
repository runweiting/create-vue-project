<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <CartList class="w-100 py-3" />
            </div>
            <div class="col">
                <OrderDetail class="w-100 mt-4 p-3" />
            </div>
        </div>
    </div>
</template>

<script>
import CartList from '@/components/week5/CartList.vue';
import OrderDetail from '@/components/week5/OrderDetail.vue';

export default {
    components: {
        CartList,
        OrderDetail
    }
}
</script>