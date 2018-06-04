<template>
  <div class='fly-select'
       :class='[{"no-borders": !hasBorders}, size]'
  >
    <div class='fly-select_wrapper'
         ref='flySelect'
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

    <ul v-if='dropdownOpen && !loading' class='fly-select_dropdown'>
      <li :style="{minWidth: minWidth}"
          v-for='(option, i) in options'
          :key='`fly-dropdown-${i}`'
          @click='updateValue(option)'
      >
        <a class='fly-select_dropdown_item'>{{option}}</a>
      </li>
    </ul>

  </div>
</template>

<script>
  import FlyInlineSpinner from '../../FlyInlineSpinner'
  import eventBus from '../../../helpers/eventBus'
  import {addResizeListener, removeResizeListener} from '../../../utils/resize-event';

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
      hasBorders: {
        type: Boolean,
        default: true
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
      },
      open: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedValue: '',
        dropdownOpen: false,
        minWidth: ''
      }
    },
    methods: {
      dropdownSwitch() {
        this.dropdownOpen = !this.dropdownOpen
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
        this.dropdownOpen = false
      },
      handleResize() {
        this.minWidth = `${this.$refs.flySelect.getBoundingClientRect().width}px`
      }
    },
    components: {
      FlyInlineSpinner
    },
    mounted() {
      addResizeListener(this.$refs.flySelect, this.handleResize);
      eventBus.$on('focusChanged', element => {
        element !== this.$el && this.closeDropdown()
      })
    },
    beforeDestroy() {
      if (this.$refs.flySelect && this.handleResize) {
        removeResizeListener(this.$refs.flySelect, this.handleResize)
      }
    }
  }
</script>

<style lang='scss'>
  @import '../../../assets/style/common/colors';
  @import '../../../assets/style/common/fonts';

  .fly-select {
    display: flex;
    position: relative;
    align-items: center;
    width: auto;
    height: 40px;
    flex: 2;
    cursor: pointer;
    background-color: white;
    border: 1px solid $pale-grey;

    &.large {
      height: 75px;
    }

    &.no-borders {
      border: none;
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
        padding: 0 20px;
      }

      .fly-select_wrapper_input {
        display: flex;
        flex: 1;

        input {
          display: flex;
          flex: 1;
          border: none;
          font-family: $font-family;
          font-size: 0.85rem;
          color: $charcoal-grey;
          width: auto;
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
      top: 101%;
      left: -1px;
      background-color: white;
      min-height: 45px;
      max-height: 225px;
      overflow-y: scroll;
      border-left: 1px solid $pale-grey;
      border-right: 1px solid $pale-grey;
      border-bottom: 1px solid $pale-grey;
      z-index: 20;
      padding-left: 0;
      margin-top: 0;

      .fly-select_dropdown_item {
        display: flex;
        align-items: center;
        min-height: 45px;
        padding: 0 10px;
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
