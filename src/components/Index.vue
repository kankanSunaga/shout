<template>
  <div>
    <p>シャウト:{{count}}回</p>

    <div v-for="(shout, index) in showShouts" :key='index' @model="isShow()">
      <div>{{ shout.message }}</div>
      <div>{{ shout.create_time }}</div>
      <shoutOption :message="shout.message" :time="shout.create_time"></shoutOption>
    </div>
    <div @model="exitDisplayShouts()">
      <button @click="addShowShoutLinst()">さらに表示</button>
  </div>
  </div>
</template>
<script>
import cognito from '../cognito'
import axios from "axios"
import ShoutOption from './ShoutOption.vue'

export default {
  components: {
    ShoutOption
  },
  data () {
    return {
      editFlag: false,
      showShouts: "",
      hideShouts: "",
      count: "",
      showClass: "",
      showIndex: 0     
    }
  },
  created() {
    const shoutIndexUrlBase = "https://jwhulxr6g0.execute-api.ap-northeast-1.amazonaws.com/dev/shout/index/"
    const token = cognito.getJwtToken ()
    const user_id = token["idToken"]["payload"]["sub"]
    const shoutIndexUrl = shoutIndexUrlBase + user_id
    axios.get(shoutIndexUrl,
      {
        headers: {
          'Authorization': token["idToken"]["jwtToken"]
        }
      }
    ).then(response => {
      const shoutsDict =  JSON.parse(response.data.body)
      this.count = shoutsDict.Count
      this.showShouts = shoutsDict.Items.slice(0, 5);
      this.hideShouts = shoutsDict.Items.slice(4, this.count);
    }).catch(error => {
      console.log(error);
      return error
    });
  },
  methods: {
    isShow () {
      if ( this.showIndex <= 5 ) {
        return "hide"
      }
    },
    exitDisplayShouts () {
      if(this.hideShouts.count === 0){
        return false
      } else {
        return true
      }
    },
    addShowShoutLinst(){
      this.showShouts = this.showShouts.concat(this.hideShouts.slice(0, 4))
      this.hideShouts.splice(0, 4)
    }
  }
}
</script>
<style >
  .hide: {
    display:none;
  }
</style>