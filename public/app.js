
/************************************** */

let login_Page = () => {
    window.location = "form.html"
}

/************************************** */

let sign_Up_Fun = () => {
    var email = document.getElementById("sign_Up_Email");
    var password = document.getElementById("sign_Up_Password");
    var firstName = document.getElementById("first_Name");
    var lastName = document.getElementById("last_Name");
    var database = firebase.database().ref("chatter");
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((user) => {

    var key = user.user.uid , User = {
      user_Name: firstName.value + " " + lastName.value,
      key: key
  }
  database.child(key).set(User);
  sessionStorage.setItem("key",key)
  swal({
    title: "Successfully Sign Up!",
    icon: "success",
  });
  email.value = "";
  password.value = "";
  firstName.value = "";
  lastName.value = "";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    swal({
      title: errorMessage,
      icon: "error",
    });
    if(errorMessage == "The email address is badly formatted.")
    {
      email.value = "";
    }
    else if(errorMessage == "Password should be at least 6 characters")
    {
      password.value = "";
    }

  });    

/************************************** */

}
let log_In_Fun = () => {
    var email = document.getElementById("log_In_Email");
    var password = document.getElementById("log_In_Password");
  
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((user) => {
    sessionStorage.setItem("key",user.user.uid)
    swal({
      title: "Successfully Sign Up!",
      icon: "success",
    });
    email.value = "";
    password.value = "";
    window.location = "chat.html"
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    swal({
      title: errorMessage,
      icon: "error",
    });
    if(errorMessage == "The email address is badly formatted.")
    {
      email.value = "";
    }
    else if(errorMessage == "The password is invalid or the user does not have a password.")
    {
      password.value = "";
    }
  });
}

/***************************************/

  firebase.database().ref("chatter").on('child_added',(data)=>
  {
    let  keyUser = sessionStorage.getItem("key");
  if (keyUser == data.val().key)
  {
   let nam = data.val().user_Name;
   sessionStorage.setItem("name",nam);
   let head = document.getElementById("heading");
   let head_Text = document.createTextNode(nam);
   head.appendChild(head_Text);

  }
  });

/************************************** */

  firebase.database().ref("chatter").on('child_added',(data)=>
   {
    
   let nam = sessionStorage.getItem("name");
   let onlineUsers = document.getElementById("onlineUsers");
   let div = document.createElement("div");
   div.setAttribute("id",data.val().key);
   div.setAttribute("class","usersDiv");
   div.setAttribute("onclick","openChatBox(this)");
   if(nam != data.val().user_Name)
   {
    var divText = document.createTextNode(data.val().user_Name);
  
   }
   div.appendChild(divText); 
   onlineUsers.appendChild(div);
 
    
   });

/************************************** */

   let openChatBox = (e) =>
   {
    sessionStorage.setItem("id",e.id);
    window.location = "message.html";
   }

/************************************** */

let key = sessionStorage.getItem("key");
let id = sessionStorage.getItem("id");

firebase.database().ref("chatter/").child(id).once('value',(data)=>{
    let senderName = document.getElementById("senderName");
    let sender = document.createTextNode(data.val().user_Name);
    senderName.appendChild(sender);

});

/************************************** */

firebase.database().ref("usser_message/" + key).on('child_added',(data)=>
   {
   

    if(data.val().key == id)
    {

      var messageBox = document.getElementById("messageBox");
       var innerMessageBox = document.createElement("div");
       var antigator = document.createElement("div");
       antigator.setAttribute("id","antigator");
        innerMessageBox.setAttribute("id","innerMessageBox");
        messageBox.appendChild(antigator);
        messageBox.appendChild(innerMessageBox);
        let messageBoxText = document.createTextNode(data.val().message);
        innerMessageBox.appendChild(messageBoxText);
      
    }
    if(data.val().key == id && data.val().idCode <= 0)
     {
       let antigatorText = document.createTextNode("They:");
       antigator.appendChild(antigatorText);
     innerMessageBox.style.backgroundColor = 'rgb(246, 38, 38)';
     
     }
     else if(data.val().key == id && data.val().idCode >= 0)
     {
      let antigatorText = document.createTextNode("You:");
      antigator.appendChild(antigatorText);
      innerMessageBox.style.backgroundColor = 'rgb(26, 116, 219)';
    

    }
    

  });
    
/***************************************/

let logOut = () =>
{
  firebase.auth().signOut()
  .then(() => {
   
    window.location = "index.html"
  }).catch((error) => {
    swal({
      title: error.message,
      icon: "error",
    });
  });
  
}

/************************************** */

let sendMessage = () =>
{
 let text = document.getElementById("inputText");
  var id = sessionStorage.getItem("id");
  var key = sessionStorage.getItem("key");
  var keyk = 1; 
 var keyi = -1;  
 firebase.database().ref("usser_message").child(key).remove();
 firebase.database().ref("usser_message").child(id).remove()
let obj1 = {
  message: text.value,
  idCode: keyk,
  key: id
}
let obj2 = {
  message: text.value,
  idCode: keyi,
  key: key
}
text.value = '';
 firebase.database().ref("usser_message/" +  key ).child(id).set(obj1);
 firebase.database().ref("usser_message/" +  id ).child(key).set(obj2);  

}






/************************************** */

let messageBoxBack = () =>
{
  window.location = "chat.html"
}

/************************************** */





