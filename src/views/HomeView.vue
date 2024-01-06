<script>
import TheWelcome from '../components/TheWelcome.vue'

// App.vue
export default {
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    console.log(import.meta.env.VITE_TEXT);
    const url = import.meta.env.VITE_PATH;
    this.axios.get(url).then((response) => {
      console.log(response.data)
    }),
    // or
    this.$http.get(url).then((response) => {
      console.log(response.data)
    })
  }
}
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
