<template>
    <main class="col mt-4 mb-4">
        <div class="container py-2">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
    </main>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    data () {
        return {
        editor: ClassicEditor,
        editorData: '<p>Hello world!!</p>',
        editorConfig: {
            toolbar: ['heading', '|', 'bold', 'italic', 'link']
        }
        }
    }
}
</script>

<style scoped>
</style>