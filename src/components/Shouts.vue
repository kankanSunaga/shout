<template>
  <div>
    <p>
      叫び：<input type="text" v-model="shoutText" >
  </p>
  <p>
    <button @click="creatShout">作成する</button>
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
      creatShout () {
        if (!this.shoutText){
          this.message = "文字を入力してください"
        } else {
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
            headers: {
              'Authorization': jwtToken            
            }
          }
        ).then(response => {
            console.log(response)
            this.$router.push("/index");
          }).catch(error => {
            console.log(error);
            return error
          });
      }

      },
    }
  }
</script>