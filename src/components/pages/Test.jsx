import React from 'react'
import { hello_http } from '../../firebase';
import axios from 'axios';
import { useState } from 'react';



export default function Test(props){

  const [data , setData]=useState(null)

  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


    async function handleClick(event){
    
        try{

          const file = selectedFile

          const reader = new FileReader();

          const blob = new Blob([file], { type: file.type });
          reader.readAsBinaryString(blob);
    
          event.preventDefault();
          let LocalUsername = event.target.username.value
          console.log(file)
          var bodyFormData = new FormData();
          bodyFormData.append('name', LocalUsername);
          bodyFormData.append("file", blob,file.name);


          axios({
            method: "post",
            url: "http://127.0.0.1:8080/login",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
              setData(response.data)
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    
      }catch(e){
    
          console.error(e)
    
    
      }
      }
    
    return (    <div className="container">

    <h1>تسجيل الدخول</h1>
    <h1>{data}</h1>
    <form className="myform" onSubmit={handleClick} >

      <input
        id='username'
        name="username"
        type="text" placeholder="اسم المستخدم"></input>


<input type="file" onChange={handleFileChange} />

      <br></br>

      <button type="submit" >دخول</button>

    </form>

  </div>)
}