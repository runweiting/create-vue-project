<template>
  <div class="px-2">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 前一頁箭頭圖示 -->
        <li
          :class="{ disabled: pagination.current_page === 1 }"
          class="page-item"
        >
          <a
            @click.prevent="selectedPage(pagination.current_page - 1)"
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 頁碼 1.2.3.. -->
        <li
          v-for="(item, index) in pagination.total_pages"
          :key="index"
          :class="{ active: item === pagination.current_page }"
          class="page-item"
        >
          <!-- 如為當前頁面 -->
          <span v-if="item === pagination.current_page" class="page-link">{{
            item
          }}</span>
          <!-- 不是當前頁面，可點擊 item 頁 -->
          <a
            v-else
            @click.prevent="selectedPage(item)"
            class="page-link"
            href="#"
            >{{ item }}</a
          >
        </li>
        <!-- 下一頁 -->
        <li
          :class="{
            disabled: pagination.current_page === pagination.total_pages,
          }"
          class="page-item"
        >
          <a
            @click.prevent="selectedPage(pagination.current_page + 1)"
            class="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userProductsStore from '@/stores/userProductsStore';

export default {
  emits: ['page-selected'],
  data() {
    return {
      currentCategory: null,
    }
  },
  computed: {
    ...mapState(userProductsStore, ['pagination']),
  },
  methods: {
    ...mapActions(userProductsStore, ['getProducts']),
    selectedPage(page) {
      console.log(page);
      this.$emit('page-selected', this.currentCategory, page);
    },
  },
};
</script>
