<template>
  <div class='fly-select'
       :class='[objectClass, size]'
  >
    <div class='fly-select_wrapper'
         @click='dropdownSwitch'
    >
      <div v-if='$slots.icon'class='fly-select_wrapper_icon'>
        <slot name='icon'/>
      </div>
      <div class='fly-select_wrapper_input'>
        <input type='text'
               :class='{"is-loading": loading}'
               v-model='selectedValue'
               disabled='disabled'
               size='1'
               :placeholder='placeholder'
        />
      </div>
      <fly-inline-spinner v-if='loading' size='8px' />
    </div>

    <ul v-if='dropdownIsActive && !loading'
        class='fly-select_dropdown'>
      <li class='fly-select_dropdown_item'
          v-for='(option, i) in options'
          :key='`fly-dropdown${i}`'
          @click='updateValue(option)'>
        {{option}}
      </li>
    </ul>

  </div>
</template>

<script>
  import FlyInlineSpinner from './FlyInlineSpinner'
  import eventBus from '../helpers/eventBus'

  export default {
    name: 'fly-select',
    props: {
      placeholder: {
        type: String,
        default: 'Select'
      },
      options: {
        type: Array,
        required: true
      },
      topBorder: {
        type: Boolean,
        default: false
      },
      bottomBorder: {
        type: Boolean,
        default: false
      },
      leftBorder: {
        type: Boolean,
        default: false
      },
      rightBorder: {
        type: Boolean,
        default: false
      },
      value: {
        type: String|Object,
        default: ''
      },
      loading: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: 'normal',
        validaor: value => {
          return ['small', 'normal', 'large'].includes(value)
        }
      }
    },
    data() {
      return {
        selectedValue: '',
        dropdownIsActive: false,
        objectClass: {
          'border-top': this.topBorder,
          'border-bottom': this.bottomBorder,
          'border-left': this.leftBorder,
          'border-right': this.rightBorder,
        }
      }
    },
    methods: {
      dropdownSwitch() {
        this.dropdownIsActive = !this.dropdownIsActive
      },
      updateValue(option) {
        if (this.selectedValue === option) {
          this.$emit('deselect', option)
          this.$emit('input', '')
          this.selectedValue = ''
        } else {
          this.$emit('select', option)
          this.$emit('input', option)
          this.selectedValue = option
        }

        this.closeDropdown()
      },
      closeDropdown() {
        this.dropdownIsActive = false
      }
    },
    components: {
      FlyInlineSpinner
    },
    mounted() {
      eventBus.$on('focusChanged', element => {
        element !== this.$el && this.closeDropdown()
      })
    }
  }
</script>

<style lang='scss'>
  @import '../assets/style/common/colors';
  @import '../assets/style/common/fonts';

  .fly-select {
    display: flex;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    width: auto;
    height: 40px;
    flex: 2;
    cursor: pointer;
    background-color: white;

    &.large {
      height: 75px;
    }

    &.border-bottom {
      border-bottom: 1px solid $pale-grey;
    }

    &.border-top {
      border-top: 1px solid $pale-grey;
    }

    &.border-left {
      border-left: 1px solid $pale-grey;
    }

    &.border-right {
      border-right: 1px solid $pale-grey;
    }

    .fly-select_wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;

      .fly-select_wrapper_icon {
        display: flex;
        margin: 0 20px;
      }

      .fly-select_wrapper_input {
        display: flex;
        flex: 1;

        input {
          display: flex;
          border: none;
          font-family: $font-family;
          font-size: 0.85rem;
          color: $charcoal-grey;
          min-width: 1px;
          width: auto;
          flex: 1;
          cursor: pointer;
          background-color: white;

          &::placeholder {
            color: $charcoal-grey;
          }

          &.is-loading {
            &::placeholder {
              color: $pale-grey;
            }
          }
        }
      }
    }

    .fly-select_dropdown {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: white;
      width: 100%;
      min-height: 45px;
      max-height: 225px;
      overflow-y: scroll;
      border-left: 1px solid $pale-grey;
      border-right: 1px solid $pale-grey;
      border-bottom: 1px solid $pale-grey;
      z-index: 20;

      .fly-select_dropdown_item {
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 45px;
        padding: 0 20px;
        font-family: $font-family;
        font-size: 0.85rem;
        color: $charcoal-grey;

        &:hover {
          background-color: lighten($pale-grey, 6%);
        }
      }
    }
  }
</style>
