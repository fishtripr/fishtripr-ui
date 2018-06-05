<template>
  <div class='demo-page'>
    <div class='section-1'>
      <fly-form-group>
        <fly-form-item>
          <fly-form-label slot='label'>
            fly-radio-group
          </fly-form-label>
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
        </fly-form-item>
      </fly-form-group>
    </div>

    <div class='section-2'>
      <fly-form-group>
        <fly-select placeholder='Destination'
                    size='large'
                    :options='destinationOptions'
                    @select='updateDestination'
                    @deselect='destination = ""'>
        </fly-select>
        <fly-select placeholder='Destination'
                    :has-borders='false'
                    size='large'
                    :options='destinationOptions'
                    @select='updateDestination'
                    @deselect='destination = ""'>
        </fly-select>
        <fly-select placeholder='Destination'
                    :options='destinationOptions'
                    @select='updateDestination'
                    @deselect='destination = ""'>
        </fly-select>
      </fly-form-group>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'demo-page',
    data() {
      return {
        travellers: '',
        destination: '',
        destinationOptions: ['France', 'Bolivia', 'Finland']
      }
    },
    methods: {
      updateDestination(option) {
        this.destination = option
      }
    }
  }
</script>

<style lang='scss' scoped>
  .demo-page {
    display: flex;
    flex-direction: column;
    padding: 40px;

    .section-1 {
      display: flex;
    }

    .section-2 {
      display: flex;
    }
  }

</style>
