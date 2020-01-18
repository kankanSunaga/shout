<template>
  <div>
    <p>
      叫び：<input type="text" v-model="shoutText">
  </p>
  <p>
    <button @click="creatShot">作成する</button>
    <button @click="testGet">作成</button>
  </p>
    {{message}}
  </div>
</template>

<script>
import cognito from '../cognito'
import axios from "axios"
export default{
    data () {
      return { 
        shoutText: '',
        message: ''
      }
    },
    methods: {
      creatShot () {
        const shoutCreateUrl = "https://jwhulxr6g0.execute-api.ap-northeast-1.amazonaws.com/dev/shout/create"
        const user = cognito.userPool.getCurrentUser()
        const jwtToken = user.getSession(function(err, session) {
          if (err) {
            console.log(err);
          } else {
            return session["idToken"]["jwtToken"]
            }
        });
        const data = { "textMessage": this.shoutText, "user_name": user["username"]}

       axios.post(shoutCreateUrl, 
        data,
        {
          headers: {'Authorization': jwtToken }
        }
      ).then(response => {
          console.log('送信したテキスト: ' + response.data.text);
        }).catch(error => {
          console.log(error);
        });

      },

      testGet () {
        const url = "https://jwhulxr6g0.execute-api.ap-northeast-1.amazonaws.com/dev/shout"
        const user =  cognito.userPool.getCurrentUser()
        const data = { "textMessage": this.shoutText, "user_name": user["username"]}

        fetch(url, {
          mode: 'cors',
          method: 'POST',
          body: data
        })
        .then(response => {
          console.log(response)
        });
      }
    }
  }
</script>