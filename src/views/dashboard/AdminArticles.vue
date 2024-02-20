<template>
    <main class="col mt-4 mb-4">
        <div class="container py-2">
            <h2>這是編輯文章頁面</h2>
        </div>
    </main>
    <article-list />
</template>

<script>
import ArticleList from '@/components/week7/ArticleList.vue';

export default {
    components: {
        ArticleList
    }
}
</script>