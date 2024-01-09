<script>
export default {
  props: {
    product: Object
  },
  emits: ['closeProductDetail'],
  data() {
    return {
      title: '單一產品細節'
    }
  }
}
</script>

<template>
  <div class="col-md-4">
    <h2>{{ title }}</h2>
    <div class="card w-100" style="width: 18rem;"> 
      <img :src="product.imageUrl" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{ product.title}}
          <span class="badge bg-primary ms-2">{{ product.category }}</span>
        </h5>
        <p class="card-text">商品敘述：{{ product.description }}</p>
        <p class="card-text">商品內容：{{ product.content }}</p>
        <span>{{ product.price }}</span>
        <span>
          <del class="ms-2 text-secondary">{{ product.origin_price }}</del>/ 個
        </span>
      </div>
    </div>
  </div>
  <!-- slot 是預留的位置，當其他元件使用 <ProductItem></ProductItem> 時，可在其中插入任意內容 -->
  <slot></slot>
</template>

<style scoped>
</style>
