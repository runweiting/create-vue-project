<template>
  <div>
    <select v-model="currentCategory" class="form-select form-select-sm">
      <option value="">全部</option>
      <option v-for="item in categoryList" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import categoryStore from '@/stores/categoryStore';

export default {
  emits: ['category-selected'],
  data() {
    return {
      currentCategory: '',
    };
  },
  watch: {
    // 帶入類別參數
    currentCategory() {
      this.$emit('category-selected', this.currentCategory, 1)
    },
  },
  computed: {
    ...mapState(categoryStore, ['categoryList']),
  },
};
</script>
