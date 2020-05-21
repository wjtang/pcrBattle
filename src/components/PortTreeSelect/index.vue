<template>
  <treeselect style="width:200px;" :key="keyValue" placeholder="请选择码头" :multiple="false" :options="modifyOptions"
              @select="handleSelected" :clearable="false" :load-options="loadOrgsOptions" :disable-branch-nodes="true"
              v-model="value"/>
</template>
<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
  import { getPortTree } from '@/api/roles'
  import{ modifyObj } from '@/utils/tools'

  export default {
    name: 'portTreeSelect',
    components: {Treeselect},
    props: {
      handleSelected: {
        type: Function
      },
      keyValue: {
        type: String
      },
      portIdValue: {
        type: Number,
        default: null
      }
    },
    data(){
      return {
        options: [],
        value: null
      }
    },
    watch: {
      portIdValue(val){
        this.value = val
      }
    },
    computed: {
      modifyOptions(){
        return modifyObj(this.options)
      }
    },
    created(){
      this.value = this.portIdValue
      //获取码头树
      getPortTree().then(res => {
        res = res.data
        if (res.data.length === 1) {
            
        }
        this.options = res.data
      })
    },
    methods: {
      loadOrgsOptions({action, parentNode, callback, id}){
        callback()
      }
    }
  }
</script>
