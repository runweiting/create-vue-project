<template>
    <div class="container" data-aos="fade-up">
        <h1 class="pt-5 text-center">WELCOME UNIQLOLO 網路旗艦店</h1>
    </div>
    <div class="container position-relative" style="height: 100vh;">
        <div class="row">
            <div class="col">
                <!-- <swiper> 透過 props 接收配置參數來渲染 Swiper
                    :effect="'cards'" 使用卡片效果
                    :grabCursor="true" 滑鼠可抓取
                    :modules="swiperModules" 使用 swiperModules -->
                <swiper
                :effect="swiperEffects.cards.effect"
                :grabCursor="true"
                :modules="swiperEffects.cards.modules"
                :pagination="{ clickable: true }"
                :autoplay="{ delay: 3000, disableOnInteraction: true }"
                >
                    <swiper-slide v-for="item in mensWearCards" :key="item.id">
                        <router-link :to="`/products/${item.id}`">
                            <img :src="item.imageUrl" :alt="item.title">
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="col">
                <swiper
                :grabCursor="true"
                :effect="swiperEffects.creative.effect"
                :modules="swiperEffects.creative.modules"
                :creativeEffect="swiperEffects.creative.creativeEffect"
                :pagination="{ clickable: true }"
                :autoplay="{ delay: 4000 }"
                >
                    <swiper-slide v-for="item in womensWearCards" :key="item.id">
                        <router-link :to="`/products/${item.id}`">
                            <img :src="item.imageUrl" :alt="item.title">
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
// 1. 匯入 Swiper、SwiperSlide
import { Swiper, SwiperSlide } from 'swiper/vue';
// 2. side effect Swiper css
import 'swiper/css';
// 3. side effect 所需 modules 的 css
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'
// 4. 匯入自定義 css
import '../assets/swiper/effectCards.css';
// 5. 依需求匯入所需 modules
import { EffectCards, EffectCreative, Pagination, Autoplay } from 'swiper/modules';

import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/userProductsStore';
import cartStore from '@/stores/cartStore';

export default {
    // 6. 註冊元件
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            // 7. 設置 swiperEffect 为卡片效果
            // 8. 將 EffectCards 加到 swiperModules 中
            swiperEffects: {
                cards: {
                    effect: 'cards',
                    modules: [EffectCards, Pagination, Autoplay],
                    loop: true,
                    config: null // cards 效果不需要配置
                },
                creative: {
                    effect: 'creative',
                    modules: [EffectCreative, Pagination, Autoplay],
                    loop: true,
                    creativeEffect: {
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    },
                }
            },
            mensWearCards: [],
            womensWearCards: [],
        }
    },
    mounted() {
        this.loadingData();
    },
    computed: {
        ...mapState(productsStore, ['productList']),
    },
    methods: {
        ...mapActions(productsStore, ['getProducts']),
        ...mapActions(cartStore, ['getCart']),
        async loadingData() {
            await Promise.all([this.getProducts(), this.getCart()]);
            this.mensWearCards = this.productList.filter(item => item.category === "男裝");
            this.womensWearCards = this.productList.filter(item => item.category === "女裝");
        },
    }
}
</script>

<style scope>
</style>