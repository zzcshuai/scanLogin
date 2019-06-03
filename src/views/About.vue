<template>
  <div id="join">
    <cube-page type="tabs" title="Tab Demos">
      <div slot="content">
        <cube-button-group>
          <cube-button @click="goTo('tab-bar')">TabBar Demos</cube-button>
          <cube-button @click="goTo('tab')">Tab Demos</cube-button>
          <cube-button @click="goTo('scroll-tab')">ScrollTab Demo</cube-button>
        </cube-button-group>
        <cube-view></cube-view>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from '@/components/cube-page.vue'
import CubeButtonGroup from '@/components/cube-button-group.vue'
import CubeView from '@/components/cube-view.vue'

export default {
  name: 'about',
  data () {
    return {}
  },
  components: {
      CubePage,
      CubeButtonGroup,
      CubeView,
  },
  methods: {
    goTo(type){
      console.log(type)
    },
  },
  mounted(){

  }
}
</script>
<style scoped lang="less">

</style>
