<script>

export default {
  props: ['carts', 'total', 'updateQty'],
  emits: ['updateData', 'deleteData', 'deleteAllData'],
  data() {
    return {
      title: '購物車列表',
    }
  },
  methods: {
    putQty(item) {
      this.$emit('updateData', item)
    },
    deleteItem(id) {
      this.$emit('deleteData', id)
    },
    deleteAll() {
      this.$emit('deleteAllData')
    }
  },
}
</script>

<template>
  <div class="col-4 mt-4 mb-4" style="position: sticky;">
    <div class="container py-2 d-flex justify-content-between">
      <h2>{{ title }}</h2>
      <button @click="deleteAll" type="button" class="btn btn-outline-danger btn-sm" style="height: 38px">清空購物車</button>
    </div>
    <div class="container table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-warning">
          <tr>
            <th scope="col" class="fw-bold">品名</th>
            <th scope="col" class="fw-bold">數量/單位</th>
            <th scope="col" class="fw-bold text-end">單價</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carts" :key="item.id">
            <td style="width: 120px">
              <img :src="item.product.imageUrl" class="rounded img-fluid " style="height: 50px">
            </td>
            <td style="width: 120px" class="pe-0">
              <div class="d-flex justify-content-between align-items-center">
                <div class="input-group input-group-sm" style="width: 80px;">
                  <!-- 加入 :disabled 避免重複觸發 -->
                  <input :disable="item.id === updateQty" @change="putQty(item)" v-model="item.qty" type="number" min="1" class="form-control">
                  <span class="input-group-text">{{ item.product.unit }}</span>
                </div>
                <div class="m-0 border-0 d-flex" style="width: 40px;">
                  <button :class="{ 'd-none': item.qty > 1}" @click="deleteItem(item.id)" type="button" class="btn btn-outline-danger" style="scale: 60%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                  </button>
                  <span :class="{ 'd-none': item.qty === 1 }" v-if="item.id === updateQty" class="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                </div>
              </div>
            </td>
            <td style="width: 110px" class="text-end">
              <p class="fs-6 mb-0">{{ item.product.price }}元</p>
            </td>
            <td style="width: 30px" class="text-end p-0">
              <button @click="deleteItem(item.id)" type="button" class="btn btn-outline-danger btn-sm py-0" style="scale: 80%;">x</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <small class="text-muted">
                {{ `總共 ${ carts.length } 項` }}
              </small>
            </td>
            <td>總計</td>
            <td class="text-end">{{ total }}元</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>