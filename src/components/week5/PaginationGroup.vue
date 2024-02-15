<template>
    <div class="px-2">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <!-- 前一頁 -->
                <li :class="{'disabled': pagination.current_page === 1}"
                class="page-item">
                    <a @click.prevent="getProducts(pagination.current_page - 1)"
                    class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!-- 頁碼 -->
                <li v-for="(item, index) in pagination.total_pages"
                :key="index" :class="{'active': item === pagination.current_page}"
                class="page-item">
                    <!-- 如為當前頁面 -->
                    <span v-if="item === pagination.current_page"
                    class="page-link">{{ item }}</span>
                    <!-- 不是當前頁面，可點擊 item 頁 -->
                    <a v-else @click.prevent="getProducts(item)"
                    class="page-link" href="#">{{ item }}</a>
                </li>
                <!-- 下一頁 -->
                <li :class="{'disabled': pagination.current_page === pagination.total_pages}"
                class="page-item">
                    <a @click.prevent="getProducts(pagination.current_page + 1)"
                    class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/productsStore';

export default {
  computed: {
    ...mapState(productsStore, ['pagination']),
  },
  methods: {
    ...mapActions(productsStore, ['getProducts']),
  },
};
</script>
