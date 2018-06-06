<template>
  <div class='fly-form-label'>
    <slot></slot>
    <template v-if='!$slots.default'>{{label}}</template>
    <span v-if='subLabel.trim()' class='sublabel'>{{subLabel}}</span>
    <div v-if='header.trim()' class='header'>{{header}}</div>
  </div>
</template>

<script>
  export default {
    name: 'fly-form-label',
    props: {
      label: {
        type: String,
        default: ''
      },
      subLabel: {
        type: String,
        default: ''
      },
      header: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang='scss'>
  @import '../assets/style/common/variables';

  .fly-form-label {
    font-family: $font-family;
    font-size: 14px;
    font-weight: 500;

    .sublabel {
      color: $steel;
      margin-left: 5px;
    }

    .header {
      font-family: $font-family;
      color: $steel;
      margin-top: 10px;
    }
  }
</style>
