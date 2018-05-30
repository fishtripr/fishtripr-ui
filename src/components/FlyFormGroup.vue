<template>
  <div class='fly-form-group' :class='{"is-vertical": align === "vertical", "is-horizontal": align === "horizontal"}'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'fly-form-group',
    props: {
      align: {
        type: String,
        default: 'horizontal',
        validator: value => ['horizontal', 'vertical'].indexOf(value) !== 1
      }
    }
  }
</script>

<style lang='scss'>
  .fly-form-group {
    display: flex;

    &.is-horizontal {
      flex-direction: row;
      > *:not(:last-child) {
        margin-right: 30px;
      }
    }

    &.is-vertical {
      flex-direction: column;
    }
  }
</style>
