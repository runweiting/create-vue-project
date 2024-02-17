<script>
export default {
  // props 用於父元件向子元件傳遞數據，其屬性代表子元件能夠接受的屬性
  // 當 Week1View 父元件使用 <ProductItem .../> 時，可透過 :product 將數據傳遞到子元件
  props: {
    // product: Object 表示 ProductItem 接受一個名為 product 的 prop，且其類型為 Object
    product: Object,
  },
  /* emits 用於聲明子元件能夠發送的自定義事件，['closeProductDetail'] 表示子元件發送一個自定義事件
  父元件 Week1View 可以監聽事件，當 ProductItem 發送過去時，
  在 <ProductItem .../> 中使用 @closeProductDetail="closeProductDetail" 監聽事件，
  並在父元件中執行 closeProductDetail 方法
  */
  emits: ['closeProductDetail'],
  data() {
    return {
      title: '單一產品細節',
    };
  },
};
</script>

<template>
  <div class="col-md-4 py-4">
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
