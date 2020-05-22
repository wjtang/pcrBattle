<template>
  <div>
    <transition name="fade" mode="out-in">
      <component :is="currentView"></component>
    </transition>
  </div>
</template>

<script>
  import List from './list'

  export default {
    name: 'frilinkSysIndex',
    data() {
      return {
        index: 0,
        views: ['List'],
        pages: ['frilinkSys-list']
        // pages: ['port-bulk-list', 'port-bulk-detail']
      }
    },
    computed: {
      currentView() {
        return this.views[this.index]
      }
    },
    methods: {
      changeView(index) {
        this.index = index
      },
      back() {
        this.changeView(0)
      }
    },
    components: {
      List
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" type="text/scss">

</style>
