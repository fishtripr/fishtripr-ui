<template>
  <div class='fly-radio'>
    <label :for='defaultId'
           role='radio'
    >
      <input :id='defaultId'
             type='radio'
             :tabindex='tabIndex'
             v-model='model'
             :name='name'
             :disabled='isDisabled'
             :value='option'
             :checked='isChecked'
             @change='handleChange'>
      <span>
        <slot />
        <template v-if='!$slots.default'>{{option}}</template>
      </span>
    </label>
  </div>
</template>

<script>
  import Emitter from '@/mixins/emitter'
  import {getRandomId} from '@/helpers'

  export default {
    name: 'fly-radio',
    componentName: 'fly-radio',
    mixins: [Emitter],
    props: {
      name: String,
      option: {
        type: [String, Number, Boolean],
        default: false,
      },
      value: [String, Number, Boolean],
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        focus: false,
        defaultId: this.id || getRandomId('fly-radio')
      }
    },
    computed: {
      isGroup() {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'fly-radio-group') {
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
      isChecked() {
        return this.option === this.value;
      },
      tabIndex() {
        return !this.isDisabled ? (this.isGroup ? (this.model === this.value ? 0 : -1) : 0) : -1
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

<style lang='scss' scoped>
  @import '../assets/sass/mixins';
  @import '../assets/style/common/variables';

  .fly-radio {
    label {
      display: block;
      padding: 5px 15px 5px 2em;
      position: relative;
      font-weight: normal;
      color: $charcoal-grey;
      z-index: 1;
      line-height: 14px;
      text-align: left;
      @include ellipsis();

      input {
        position: absolute;
        left: -99999px;

        &:disabled ~ span {
          color: $steel;

          &:after {
            background: $pale-grey;
          }

          &:before {
            border-color: $pale-grey;
          }
        }

        &:focus {
          outline: none;
        }

        &:checked {
          & ~ span:after {
            position: absolute;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            background: $seafoam-blue;
            content: '';
            left: 3px;
            top: 48%;
            transform: translateY(-50%);
          }

          &:disabled {
            & ~ span:after {
              background: $pale-grey;
            }

            & ~ span:before {
              border-color: $pale-grey;
            }
          }
        }
      }

      & > span {
        font-size: 0.875rem;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          border-radius: 50%;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: solid 1px $seafoam-blue;
          top: 48%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
