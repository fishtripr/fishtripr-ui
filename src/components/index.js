import Vue from 'vue';
import eventBus from '@/helpers/eventBus';
import FlyFormItem from './FlyFormItem';
import FlyFormLabel from './FlyFormLabel';
import FlyRadio from './FlyRadio';
import FlyRadioGroup from './FlyRadioGroup';
import FlyFormGroup from './FlyFormGroup';

function triggerGlobalClick(e) {
  e.stopPropagation();
  eventBus.$emit('focusChanged', this);
}
document.addEventListener('click', triggerGlobalClick);

Vue.mixin({
  mounted() {
    this.$el.addEventListener('click', triggerGlobalClick);
  },
  beforeDestroy() {
    this.$el.removeEventListener('click', triggerGlobalClick);
  },
});

const Components = {
  FlyFormItem,
  FlyFormLabel,
  FlyRadio,
  FlyRadioGroup,
  FlyFormGroup
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
export {eventBus};
