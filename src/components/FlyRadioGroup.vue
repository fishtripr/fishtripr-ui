<template>
  <div class='fly-radio-group'
       role='radiogroup'
       @keydown='handleKeydown'
  >
    <slot></slot>
  </div>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  const keyCode = Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  })

  export default {
    name: 'fly-radio-group',
    mixins: [Emitter],
    props: {
      value: {},
      size: String,
      fill: String,
      textColor: String,
      disabled: Boolean
    },
    mounted() {
      const radios = this.$el.querySelectorAll('[type=radio]');
      const firstLabel = this.$el.querySelectorAll('[role=radio]')[0]
      if (![].some.call(radios, radio => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0
      }

      this.$on('handleChange', value => {
        this.$emit('change', value)
      })
    },
    methods: {
      handleKeydown(e) {
        const target = e.target
        const className = target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]'
        const radios = this.$el.querySelectorAll(className)
        const length = radios.length
        const index = [].indexOf.call(radios, target)
        const roleRadios = this.$el.querySelectorAll('[role=radio]')

        switch (e.keyCode) {
          case keyCode.LEFT:
          case keyCode.UP:
            e.stopPropagation()
            e.preventDefault()

            if (index === 0) {
              roleRadios[length - 1].click()
            } else {
              roleRadios[index - 1].click()
            }
            break;

          case keyCode.RIGHT:

          case keyCode.DOWN:
            if (index === (length - 1)) {
              e.stopPropagation()
              e.preventDefault()
              roleRadios[0].click()
            } else {
              roleRadios[index + 1].click()
            }
            break

          default:
            break
        }
      }
    }
  }
</script>

<style lang='scss'>
  .fly-radio-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
