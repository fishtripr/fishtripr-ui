<template>
  <label class='fly-radio'
         :class="[
           {'is-disabled': isDisabled},
           {'is-focus': focus},
           {'is-checked': model === label}
         ]"
         role='radio'
         :aria-checked='model === label'
         :aria-disabled='isDisabled'
         :tabindex='tabIndex'
         @keydown.space.stop.prevent='model = isDisabled ? model : label'
  >
    <span class='fly-radio__input'
          :class="{
            'is-disabled': isDisabled,
            'is-checked': model === label
          }"
    >
      <span class='fly-radio__inner'></span>
      <input class='fly-radio__original'
             :value='label'
             type='radio'
             aria-hidden='true'
             v-model='model'
             @focus='focus = true'
             @blur='focus = false'
             @change='handleChange'
             :name='name'
             :disabled='isDisabled'
             tabindex='-1'
      >
    </span>
    <span class='fly-radio__label'>
      <slot></slot>
      <template v-if='!$slots.default'>{{label}}</template>
    </span>
  </label>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  export default {
    name: 'fly-radio',
    componentName: 'fly-radio',
    mixins: [Emitter],
    props: {
      value: {},
      label: {
        type: [String, Number, Boolean],
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: String
    },
    data() {
      return {
        focus: false
      }
    },
    computed: {
      isGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.componentName !== 'fly-radio-group') {
            parent = parent.$parent
          } else {
            this._radioGroup = parent
            return true;
          }
        }
        return false
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value
        },
        set(val) {
          if (this.isGroup) {
            this.dispatch('fly-radio-group', 'input', val)
          } else {
            this.$emit('input', val)
          }
        }
      },
      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled
          : this.disabled;
      },
      tabIndex() {
        return !this.isDisabled ? (this.isGroup ? (this.model === this.label ? 0 : -1) : 0) : -1
      }
    },
    methods: {
      handleChange() {
        this.$nextTick(() => {
          this.$emit('change', this.model)
          this.isGroup && this.dispatch('fly-radio-group', 'handleChange', this.model)
        })
      }
    }
  }
</script>

<style lang='scss'>
  @import '../assets/style/common/colors';

  .fly-radio {
    display: flex;
    justify-content: center;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;

    &:focus {
      outline: none;
    }

    .fly-radio__input {
      white-space: nowrap;
      cursor: pointer;
      outline: 0;
      line-height: 1;
      vertical-align: middle;
      position: relative;
      display: inline-block;
      border: 1px solid $pale-teal;
      border-radius: 100%;
      width: 14px;
      height: 14px;
      background-color: white;
      box-sizing: border-box;

      &.is-checked .fly-radio__inner {
        border-color: $pale-teal;
        background: white;

        &::after {
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background-color: $pale-teal;
          content: "";
          position: absolute;
          left: 16%;
          top: 18%;
        }
      }

      .fly-radio__original {
        opacity: 0;
        outline: 0;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
      }
    }

    .fly-radio__label {
      font-family: 'Montserrat';
      font-weight: 300;
      color: $charcoal-grey;
      font-size: 14px;
      padding-left: 10px;
    }
  }
</style>
