<script>
export default {
  // 6. props 接收 Week2AdminView <ProductItem> 傳來的 :product="selectedProduct" 渲染資料
  props: {
    product: Object,
  },
  // emits 用來聲明 ProductItem 可以發送的 'closeProductDetail' 事件
  emits: ['closeProductDetail'],
  data() {
    return {
      title: '單一產品細節',
    };
  },
};
</script>

<template>
  <div class="col-md-4 mt-4">
    <h2>{{ title }}</h2>
    <div class="card w-100" style="width: 18rem">
      <img :src="product.imageUrl" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">
          {{ product.title }}
          <span class="badge bg-primary ms-2">{{ product.category }}</span>
        </h5>
        <p class="card-text">商品敘述：{{ product.description }}</p>
        <p class="card-text">商品內容：{{ product.content }}</p>
        <span>{{ product.price }}</span>
        <span>
          <del class="ms-2 text-secondary">{{ product.origin_price }}</del
          >/ 個
        </span>
      </div>
    </div>
  </div>
  <!-- slot 是預留的位置，當其他元件使用 <ProductItem></ProductItem> 時，可在其中插入任意內容 -->
  <slot></slot>
</template>

<style scoped></style>
