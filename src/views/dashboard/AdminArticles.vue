<template>
    <div class="container">
        <div class="row py-2">
            <main class="col mt-4 mb-4">
                <div class="container py-2">
                    <h2>這是文章頁面</h2>
                    {{ tempArticleList }}
                    <div class="d-flex justify-content-between gap-2 py-2">
                        <p class="p-2 mb-0">
                        {{ `一頁顯示 ${Object.keys(this.tempArticleList).length} 篇文章` }}
                        </p>
                        <!-- Button trigger modal -->
                        <div class="d-flex justify-content-end gap-2">
                          <button @click="openModal('new')" type="button" class="btn btn-danger">
                            新增文章
                          </button>
                          <button @click="logout" type="button" class="btn btn-warning">
                              登出
                          </button>
                        </div>
                        <!-- articleModal -->
                        <article-modal ref="articleModal" :currentArticle="selectedArticle" :is-new="isNew">
                        </article-modal>
                    </div>
                </div>
                <div class="container">
                  <table class="table table-hover">
                      <thead class="table-dark">
                        <tr>
                            <th scope="col" class="fw-bold">發佈日期</th>
                            <th scope="col" class="fw-bold">文章標題</th>
                            <th scope="col" class="fw-bold">作者名稱</th>
                            <th scope="col" class="fw-bold">是否公開</th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="tempArticleList.length === 0">
                          <td colspan="7">
                            <small class="text-muted">
                              目前沒有任何文章
                            </small>
                          </td>
                        </tr>
                        <tr v-for="item in tempArticleList" :key="item.title">
                            <td>{{ formatDate(item.create_at) }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.author }}</td>
                            <td>
                                <i v-if="item.isPublic" class="bi bi-check-circle-fill text-success" style="scale: 150%;"></i>
                                <i v-else class="bi bi-x-circle-fill text-danger" style="scale: 150%;"></i>
                            </td>
                            <td>
                                <div
                                    class="btn-group"
                                    role="group"
                                    aria-label="Basic outlined example"
                                >
                                    <button
                                    @click="openModal('edit', item)"
                                    type="button"
                                    class="btn btn-outline-primary btn-sm"
                                    >
                                    編輯
                                    </button>
                                    <button
                                    @click="deleteCoupon(item.id)"
                                    type="button"
                                    class="btn btn-outline-danger btn-sm"
                                    >
                                    刪除
                                    </button>
                                </div>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </div>
                <Pagination :pages="pagination" @showPage="getArticles" />
            </main>
        </div>
    </div>
</template>

<script>
// import Swal from 'sweetalert2';
import { mapActions, mapState } from 'pinia';
import articlesStore from '@/stores/articlesStore';
import timestampToDate from '@/components/utils/timestampToDate';

import ArticleModal from '@/components/week7/ArticleModal.vue'
import Pagination from '@/components/week7/Pagination.vue';

export default {
    components: {
        ArticleModal,
        Pagination
    },
    data() {
        return {
            title: '文章列表',
            tempArticleList: [],
            selectedArticle: {},
            isNew: false,
        }
    },
    created() {
        this.tempArticleList = [
            ...this.articleList
        ];
    },
    watch: {
        articleList: {
            deep: true,
            handler(updateArticleList) {
                this.tempArticleList = updateArticleList
            }
        }
    },
    computed: {
        ...mapState(articlesStore, ['articleList', 'pagination']),
    },
    mounted() {
        this.getArticles();
    },
    methods: {
        ...mapActions(articlesStore, ['getArticles']),
        // 轉換 timestamp
        formatDate(timestamp) {
            const { formattedDate } = timestampToDate(timestamp);
            return formattedDate;
        },
        openModal(state, item) {
            // 新增
            if (state === 'new') {
                this.selectedArticle = {};
                this.isNew = true;
                this.$refs.articleModal.articleModal.show();
                // 編輯 
            } else if (state === 'edit') {
                this.selectedArticle = { ...item };
                this.isNew = false;
                this.$refs.articleModal.articleModal.show();
            }
        }
    }
}
</script>