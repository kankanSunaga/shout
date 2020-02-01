<template>
  <div>
    <p>
      叫び：<input type="text" v-model="shoutText">
  </p>
  <p>
    <img v-show="uploadedImage" :src="uploadedImage"/>
    <input type="file" v-on:change="onFileChange">
    <button @click="creatShot">作成する</button>
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
        uploadedImage: '',
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
        const data = { "textMessage": this.shoutText, "user_name": user["username"], "img": this.uploadedImage}

       axios.post(shoutCreateUrl, 
        data,
        {
          headers: {
            'Authorization': jwtToken,
            'content-type': 'image/png',
           }
        }
      ).then(response => {
          // const dynamoHash = JSON.parse(response);
          // console.log(dynamoHash)
          return response["body"]
        }).catch(error => {
          console.log(error);
          return error
        });

      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
      },
      // アップロードした画像を表示
      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    }
  }
</script>