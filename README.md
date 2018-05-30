# Fishtripr Components for Vue.js

## Installation and Usage:
1. Just use `yarn add @fishtripr/fishtripr-ui`
2. Now you can include the script by using `require('@fishtripr/fishtripr-ui')` or `import '@fishtripr/fishtripr-ui'`
3. For Nuxt, just add the package to `nuxt.config.js`
```javascript
build: {
  vendor: ['@fishtripr/fishtripr-ui']
}
```

## List of components:
All components are registered with the Vue global and are available for use. You do not need to re-register them.

### Event Bus
You can use the Fishtripr Component's own event bus to pass data around. 
#### List of events supported:

##### `focusChanged` 
Parameters: `Element` which was clicked

**Usage:**
```javascript
import {eventBus} from '@fishtripr/fishtripr-ui';

eventBus.$on('focusChanged', (element) => {
  // Do a few things if focus changes your element.
});
```

---
More events will be supported as needed.


##### Fishtripr Radio

**Usage:**
```
<fly-form-item>
  <fly-form-label slot='label'>
    Who will be travelling ?
  </fly-form-label>
  <fly-radio-group v-model='travellers'>
    <fly-radio label='alone'></fly-radio>
    <fly-radio label='couple'></fly-radio>
    <fly-radio label='family'></fly-radio>
    <fly-radio label='friends'></fly-radio>
    <fly-radio label='group'></fly-radio>
  </fly-radio-group>
</fly-form-item>
```
