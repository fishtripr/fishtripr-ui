<template>
  <div class='fly-form-item' :style='{"width": width}'>
    <slot name='label'></slot>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'fly-form-item',
    props: {
      width: {
        type: String,
        default: '100%'
      }
    }
  }
</script>

<style lang='scss'>
  @import '../assets/style/common/variables';

  .fly-form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 15px;
    padding-bottom: 15px;

    @media #{$small-and-down} {
      width: 100% !important;
    }

    > *:first-child:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>