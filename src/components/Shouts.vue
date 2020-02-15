<template>
  <div>
    <p>
      叫び：<input type="text" v-model="shoutText" >
  </p>
  <p>
    <button @click="pushButton">作成する</button>
  </p>
    <div>
      さらに作成する:<input type="checkbox" id="checkbox" v-model="checked">
    </div>
    {{ message }}
    {{ sendText }}
  </div>
</template>

<script>
import cognito from '../cognito'
import axios from "axios"
export default{
    data () {
      return { 
        shoutText: '',
        message: '',
        sendText: '',
        checked: false
      }
    },
    methods: {
      pushButton(){
        const result = this.creatShout ()
        if ( !result ) {
          this.message = "作成に失敗しました"
        } else if ( this.checked && result ) {
          this.setupNextShout()
        } else {
          this.$router.push("/index");
        }
      },
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

        const result = axios.post(shoutCreateUrl, 
          data,
          {
            headers: {
              'Authorization': jwtToken            
            }
          }
          ).then(response => {
            console.log(response)
            return true
          }).catch(error => {
            console.log(error)
            return false 
         });
         return result
        }
      },
      setupNextShout() {
        const mesageBase = "登録されたShout:"
        this.sendText = mesageBase + this.shoutText
        this.shoutText = ''
      },
    }
  }
</script>