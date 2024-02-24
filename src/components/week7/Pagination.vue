<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  // 從外層接收 pages 物件 -> 渲染畫面
  props: {
    pages: Object,
  },
  methods: {
    // 向外層發射 showPage 並帶入 item -> 在內層這個位置，觸發外層 getData
    emitSinglePage(page) {
      this.$emit('showPage', page);
    },
  },
};
</script>
<template>
  <div class="px-4">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- 前一頁 -->
        <li :class="{ disabled: pages.current_page === 1 }" class="page-item">
          <a
            @click.prevent="emitSinglePage(pages.current_page - 1)"
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 頁碼 -->
        <li
          v-for="(item, index) in pages.total_pages"
          :key="index"
          :class="{ active: item === pages.current_page }"
          class="page-item"
        >
          <!-- 如為當前頁面 -->
          <span v-if="item === pages.current_page" class="page-link">{{
            item
          }}</span>
          <!-- 不是當前頁面，可點擊 item 頁 -->
          <a
            v-else
            @click.prevent="emitSinglePage(item)"
            class="page-link"
            href="#"
            >{{ item }}</a
          >
        </li>
        <!-- 下一頁 -->
        <li
          :class="{ disabled: pages.current_page === pages.total_pages }"
          class="page-item"
        >
          <a
            @click.prevent="emitSinglePage(pages.current_page + 1)"
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
