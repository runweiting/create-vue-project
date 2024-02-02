<script>
export default {
    data() {
        return {
            // 新增 apiUrl、apiPath
            apiUrl: import.meta.env.VITE_URL,
            apiPath: import.meta.env.VITE_PATH,
            title: '訂購訊息',
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h2>{{ title }}</h2>
                <form>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingEmail" name="email" placeholder="請輸入email">
                        <label for="floatingEmail" class="form-label">Email</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingName" name="姓名" placeholder="請輸入姓名">
                        <label for="floatingName" class="form-label">收件人姓名</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingTel" name="電話" placeholder="請輸入電話">
                        <label for="floatingTel" class="form-label">收件人電話</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingAddress" name="地址" placeholder="請輸入地址">
                        <label for="floatingAddress" class="form-label">收件人地址</label>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">留言</label>
                        <textarea id="message" cols="30" rows="10" class="form-control"></textarea>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-danger">送出訂單</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>