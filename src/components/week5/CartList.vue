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
            <td style="width: 160px">
              <img :src="item.product.imageUrl" class="rounded img-fluid " style="height: 50px">
            </td>
            <td style="width: 100px">
              <div class="d-flex align-items-center">
                <div class="input-group input-group-sm" style="width: 80px;">
                  <!-- 加入 :disabled 避免重複觸發 -->
                  <input :disable="item.id === updateQty" @change="putQty(item)" v-model="item.qty" type="number" min="1" class="form-control">
                  <span class="input-group-text">{{ item.product.unit }}</span>
                </div>
                <div class="m-0 border-0 ms-2" style="width: 20px;">
                  <span v-if="item.id === updateQty" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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