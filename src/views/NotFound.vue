<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="text-center">
                    <h1 class="pt-5 text-center">404 沒有這一頁喔～</h1>
                    <RouterLink :to="{ name: 'home' }" class="btn btn-primary text-decoration-none">{{ $t('menu.home') }}</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>