<template>
    <div class="container">
        <h1 class="pt-5 text-center">WELCOME UNIQLOLO 網路旗艦店</h1>
    </div>
    <div class="container position-relative" style="height: 100vh;">
        <!-- <swiper> 透過 props 接收配置參數來渲染 Swiper
            :effect="'cards'" 使用卡片效果
            :grabCursor="true" 滑鼠可抓取
            :modules="swiperModules" 使用 swiperModules -->
        <swiper
            :effect="'cards'"
            :grabCursor="true"
            :modules="swiperModules"
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
</template>

<script>
// 1. 匯入 Swiper、SwiperSlide
import { Swiper, SwiperSlide } from 'swiper/vue';
// 2. 依需求匯入所需 modules
import { EffectCards } from 'swiper/modules';
// 3. side effect Swiper css
import 'swiper/css';
// 4. side effect 所需 modules 的 css
import 'swiper/css/effect-cards';
// 5. 匯入自定義 css
import '../assets/swiper.css';

export default {
    // 6. 註冊元件
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            // 7. 設置 swiperEffect 为卡片效果
            swiperEffect: 'cards',
            // 8. 將 EffectCards 加到 swiperModules 中
            swiperModules: [EffectCards]
        }
    },
    methods: {
    },
}
</script>