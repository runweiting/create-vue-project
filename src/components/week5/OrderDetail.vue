<template>
  <div class="col-8" style="padding-inline: 4.5rem">
    <h2>{{ title }}</h2>
    <!-- 在 <VForm> 往 v-slot 傳入 errors 錯誤訊息，所以 <VField> 和 <ErrorMessage> 都可讀取 errors -->
    <VForm v-slot="{ errors }" ref="form" @submit="onSubmit">
      <div class="form-floating mb-3">
        <VField
          v-model="data.user.email"
          rules="required|email"
          :class="{ 'is-invalid': errors['email'] }"
          type="email"
          class="form-control"
          id="floatingEmail"
          name="email"
          placeholder="請輸入email"
        />
        <label for="floatingEmail" class="form-label">Email</label>
        <ErrorMessage name="email" class="invalid-feedback" />
      </div>
      <div class="form-floating mb-3">
        <VField
          v-model="data.user.name"
          rules="required"
          :class="{ 'is-invalid': errors['姓名'] }"
          type="text"
          class="form-control"
          id="floatingName"
          name="姓名"
          placeholder="請輸入姓名"
        />
        <label for="floatingName" class="form-label">收件人姓名</label>
        <ErrorMessage name="姓名" class="invalid-feedback" />
      </div>
      <div class="form-floating mb-3">
        <VField
          v-model="data.user.tel"
          rules="required|min:8|max:10"
          :class="{ 'is-invalid': errors['電話'] }"
          type="tel"
          class="form-control"
          id="floatingTel"
          name="電話"
          placeholder="請輸入電話"
        />
        <label for="floatingTel" class="form-label">收件人電話</label>
        <ErrorMessage name="電話" class="invalid-feedback" />
      </div>
      <div class="form-floating mb-3">
        <VField
          v-model="data.user.address"
          rules="required"
          :class="{ 'is-invalid': errors['地址'] }"
          type="text"
          class="form-control"
          id="floatingAddress"
          name="地址"
          placeholder="請輸入地址"
        />
        <label for="floatingAddress" class="form-label">收件人地址</label>
        <ErrorMessage name="地址" class="invalid-feedback" />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          v-model="data.message"
          id="message"
          cols="30"
          rows="10"
          class="form-control"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </VForm>
  </div>
</template>

<script>
import { ErrorMessage } from 'vee-validate';
import { mapActions } from 'pinia';
import couponsStore from '@/stores/couponsStore';

export default {
  emits: ['sendOrder'],
  data() {
    return {
      title: '訂購訊息',
      // 結帳資料
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  components: { ErrorMessage },
  methods: {
    ...mapActions(couponsStore, ['clearCoupon']),
    onSubmit() {
      this.$emit('sendOrder', this.data);
      this.clearCoupon();
    },
    resetForm() {
      this.$refs.form.resetForm();
      this.data.message = '';
    },
  },
};
</script>
