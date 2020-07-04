var auth=firebase.auth()
var firestore=firebase.firestore()

var resetPsBtn =document.querySelector(".resetPsBtn");
  console.log(resetPsBtn)

  var RecoverPassword =async ()=>{
    var resetemailBtn=document.querySelector(".resetemail").value.trim();
    if(resetemailBtn){ 
      try {
      
     await swal("Congratulations!", "Email has been send to you Please check your email!", "success");
      var resetemail =  await auth.sendPasswordResetEmail(resetemailBtn);
    location.assign(`login.html`)
      
      } catch (error) {
        console.log(error)
      }
    }
  }

  resetPsBtn.addEventListener("click",RecoverPassword)