<template>
  <div class="col-4 mt-4 mb-4" style="position: sticky">
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
          <tr class="align-middle" style="height: 48px">
            <th scope="col" class="fw-bold">品名</th>
            <th scope="col" class="fw-bold">數量/單位</th>
            <th scope="col" class="fw-bold text-end">單價</th>
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
            <td class="text-end">{{ cartTotal }}元</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import loadingStore from '@/stores/loadingStore';

export default {
  data() {
    return {
      title: '購物車列表',
    };
  },
  computed: {
    ...mapState(cartStore, ['cartList', 'cartTotal']),
    ...mapState(loadingStore, ['loadingStatus'])
  },
  methods: {
    ...mapActions(cartStore, ['putCart', 'deleteCart', 'deleteCarts']),
  },
};
</script>

<style scoped>
.cart-img {
  object-fit: cover;
  height: 50px;
}
</style>
