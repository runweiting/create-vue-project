<template>
  <div class="col-4 mt-4 mb-4">
    <div style="position: sticky; top: 0;">
      <div class="container d-flex justify-content-between">
        <h2>{{ title }}</h2>
        <button
          @click="deleteCarts"
          type="button"
          class="btn btn-outline-danger btn-sm"
          style="height: 38px"
          v-if="cartList.length !== 0"
        >
          清空購物車
        </button>
      </div>
      <div class="container table-responsive">
        <table class="table table-hover align-middle">
          <thead class="table-warning">
            <tr class="align-middle fw-bold" style="height: 48px">
              <th scope="col">品名</th>
              <th scope="col">數量/單位</th>
              <th scope="col" class="text-end">單價</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="cartList.length === 0">
              <td colspan="4">
                <small class="text-muted"> 購物車目前沒有任何品項 </small>
              </td>
            </tr>
            <tr v-else v-for="item in cartList" :key="item.id">
              <td style="width: 120px">
                <img :src="item.product.imageUrl" class="rounded cart-img" />
              </td>
              <td style="width: 120px" class="pe-0">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="input-group input-group-sm" style="width: 80px">
                    <!-- 加入 :disabled 避免重複觸發 -->
                    <input
                      :disable="item.id === loadingStatus.updateQty"
                      @click="putCart(item)"
                      v-model="item.qty"
                      type="number"
                      min="1"
                      class="form-control"
                    />
                    <span class="input-group-text">{{ item.product.unit }}</span>
                  </div>
                  <div class="m-0 border-0 d-flex" style="width: 40px">
                    <button
                      :class="{ 'd-none': item.qty > 1 }"
                      @click="deleteCart(item.id)"
                      type="button"
                      class="btn btn-outline-danger"
                      style="scale: 60%"
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                    <span
                      :class="{ 'd-none': item.qty === 1 }"
                      v-if="item.id === loadingStatus.updateQty"
                      class="spinner-border spinner-border-sm ms-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>
              </td>
              <td style="width: 110px" class="text-end">
                <p class="fs-6 mb-0">{{ item.product.price }}元</p>
              </td>
              <td style="width: 30px" class="text-end p-0">
                <button
                  @click="deleteCart(item.id)"
                  type="button"
                  class="btn btn-outline-danger btn-sm py-0"
                  style="scale: 80%"
                >
                  x
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <small class="text-muted">
                  {{ `總共 ${cartList.length} 項` }}
                </small>
              </td>
              <td>總計</td>
              <td v-if="!couponState.success" class="text-end">{{ cartTotal }}元</td>
              <td v-else class="text-end">{{ Math.round(couponState.data.final_total) }}元</td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4">
                <div class="input-group">
                  <input :disabled="couponState.success" v-model="couponCode" type="text" class="form-control" :placeholder="couponState.success ? couponState.message : '請輸入優惠碼'" aria-label="coupon_code" aria-describedby="coupon_code">
                  <button @click="applyCoupon(couponCode)" class="btn btn-secondary" type="button" id="coupon_code">套用優惠卷</button>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <router-link v-if="cartList.length === 0" :to="{ name: 'products' }">
                  <button type="button" class="btn btn-outline-primary w-100" style="height: 38px">
                    前往商品列表
                  </button>
                </router-link>
                <router-link v-else :to="{ name: 'cart' }">
                  <button type="button" class="btn btn-outline-success w-100" style="height: 38px">
                    前往購物車
                  </button>
                </router-link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';
import couponsStore from '@/stores/couponsStore';

export default {
  data() {
    return {
      title: '購物車列表',
      // 優惠碼
      couponCode: null,
    };
  },
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'cartTotal']),
    ...mapState(loadingStore, ['loadingStatus']),
    ...mapState(couponsStore, ['couponState'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'putCart', 'deleteCart', 'deleteCarts']),
    ...mapActions(couponsStore, ['postCoupon']),
    async applyCoupon() {
      await this.postCoupon(this.couponCode)
      .then(() => {
        this.couponCode = '';
      })
    },
  },
};
</script>

<style scoped>
.cart-img {
  object-fit: cover;
  height: 50px;
}
</style>
