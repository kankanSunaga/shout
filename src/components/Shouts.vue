<template>
  <div>
    <p>
      叫び：<input type="text" v-model="shoutText">
  </p>
  <p>
    <button @click="creatShot">作成する</button>
  </p>
    {{message}}
  </div>
</template>

<script>
import ShoutHelper from '../shoutHelper.js'

export default{
    data () {
      return { 
        shoutText: '',
        message: ''
      }
    },
    methods: {
      creatShot () {
        if (ShoutHelper.syncCreateShout(this.shoutText)) {
          this.message = "作成しました"
        } else {
          this.message = "失敗しました"
        }
      }
    }
  }
</script>