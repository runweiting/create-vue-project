<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/productsStore';
import categoryStore from '@/stores/categoryStore';

export default {
    data() {
        return {
            currentCategory: '',
        }
    },
    watch: {
        // 帶入類別參數
        currentCategory() {
            this.getProducts(1, this.currentCategory);
            console.log(this.currentCategory)
        }
    },
    computed: {
        ...mapState(categoryStore, ['categoryList']),
    },
    methods: {
        ...mapActions(productsStore, ['getProducts'])
    }
}
</script>

<template>
    <div>
        <select v-model="currentCategory" class="form-select form-select-sm">
            <option value="">全部</option>
            <option v-for="item in categoryList" :key="item" :value="item">{{ item }}</option>
        </select>
    </div>
</template>