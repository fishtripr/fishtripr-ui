<template>
  <div class='demo-page'>
    <fly-form-group>
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
    </fly-form-group>
    <hr>
  </div>
</template>

<script>
  import './index'

  export default {
    name: 'demo-page',
    data() {
      return {
        travellers: ''
      }
    }
  }
</script>

<style lang='scss' scoped>

</style>
