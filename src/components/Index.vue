<template>
  <div>
    <p>シャウト:{{count}}回</p>

    <div v-for="(shout, index) in shouts" :key='index'>
      <div>{{ shout.message }}</div>
      <div>{{ shout.create_time }}</div>
    </div>
    
  </div>
</template>
<script>
import cognito from '../cognito'
import axios from "axios"

export default {
  data () {
    return {
      shouts: "",
      count: ""  
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
      this.shouts = shoutsDict.Items

    }).catch(error => {
      console.log(error);
      return error
    });
  }
}
</script>