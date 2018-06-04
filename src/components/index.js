import Vue from 'vue'
import eventBus from '@/helpers/eventBus'
import FlyFormItem from './FlyFormItem'
import FlyFormLabel from './FlyFormLabel'
import FlyRadio from './FlyRadio'
import FlyRadioGroup from './FlyRadioGroup'
import FlyFormGroup from './FlyFormGroup'
import FlySelect from './fly-select'
import FlyInlineSpinner from './FlyInlineSpinner'

function triggerGlobalClick(e) {
  e.stopPropagation();
  process.browser && eventBus.$emit('focusChanged', this)
}

// for Nuxt.
try {
  document.addEventListener('click', triggerGlobalClick)
} catch(err) {}

Vue.mixin({
  mounted() {
    this.$el.addEventListener('click', triggerGlobalClick)
  },
  beforeDestroy() {
    this.$el.removeEventListener('click', triggerGlobalClick)
  }
})

const Components = {
  FlyFormItem,
  FlyFormLabel,
  FlyRadio,
  FlyRadioGroup,
  FlyFormGroup,
  FlySelect,
  FlyInlineSpinner
}

export default {
  install(Vue, options) {
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name])
    })
  }
}
export {eventBus}
