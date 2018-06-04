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
  @import '../assets/style/common/variables';

  .fly-form-group {
    display: flex;
    width: 100%;

    &.is-horizontal {
      flex-direction: row;

      > *:not(:last-child) {
        margin-right: 30px;
      }

      @media #{$medium-and-down} {
        flex-direction: column;
        > *:not(:last-child) {
          margin-bottom: 30px;
        }
      }
    }

    &.is-vertical {
      flex-direction: column;
    }
  }
</style>
