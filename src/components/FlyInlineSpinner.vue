<template>
  <div class='loader'>
    <beat-loader :size='size' />
  </div>
</template>

<script>
  import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

  export default {
    name: 'base-inline-spinner',
    props: {
      size: {
        type: String,
        default: '10px'
      }
    },
    components: {
      BeatLoader
    }
  }
</script>


<style lang='scss'>
  .loader {
    display: inline-block;
  }
</style>
