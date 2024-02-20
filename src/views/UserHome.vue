<template>
    <div class="container">
        <h1 class="pt-5 text-center">WELCOME UNIQLOLO 網路旗艦店</h1>
        <div class="d-flex justify-content-center gap-2">
          <button @click="switchToEnglish" class="btn btn-primary">English</button>
          <button @click="switchToChinese" class="btn btn-primary">中文</button>
        </div>
        <h3>{{ $t('menu.aboutUs') }}</h3>
        <h3>{{ $t('menu.productContent') }}</h3>
        <h3>{{ $t('menu.blog') }}</h3>
        <h3>{{ $t('menu.faq') }}</h3>
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
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide>
                    <swiper-slide>Slide 5</swiper-slide>
                    <swiper-slide>Slide 6</swiper-slide>
                    <swiper-slide>Slide 7</swiper-slide>
                    <swiper-slide>Slide 8</swiper-slide>
                    <swiper-slide>Slide 9</swiper-slide>
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
                    <swiper-slide>Slide 1</swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                    <swiper-slide>Slide 4</swiper-slide>
                    <swiper-slide>Slide 5</swiper-slide>
                    <swiper-slide>Slide 6</swiper-slide>
                    <swiper-slide>Slide 7</swiper-slide>
                    <swiper-slide>Slide 8</swiper-slide>
                    <swiper-slide>Slide 9</swiper-slide>
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
        }
    },
    methods: {
    switchToEnglish () {
      this.$i18n.locale = 'en'
    },
    switchToChinese () {
      this.$i18n.locale = 'zh-TW'
    }
  }
}
</script>