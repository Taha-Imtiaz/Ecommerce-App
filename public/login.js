
//Fetching all the buttons and fields
// const mymodal = document.querySelector('.my-modal');

var signup = document.querySelector(".signup");
var signupform = document.querySelector(".signupform");
var login = document.querySelector(".login");
var googlelogin = document.querySelector(".googlelogin");
// var logout = document.querySelector(".logout");

var modal = document.querySelector(".modal");
var span = document.querySelector(".close");
var loginspan = document.querySelector(".loginmodal .close");
var loginmodal = document.querySelector(".loginmodal");
// console.log(loginmodal)
// var span = document.querySelector(".close");

var phoneAuth =document.querySelector(".signinwithphone");
var phoneSpan=document.querySelector(".phonesignin .close");
var phonesignin=document.querySelector(".phonesignin")
var sendCodeBtn=document.querySelector(".sendcode")
// Get DOM Elements


// Events for signup
signup.addEventListener('click', openModal);
span.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Events for login
login.addEventListener('click', loginopenModal);
loginspan.addEventListener('click', logincloseModal);
window.addEventListener('click', loginoutsideClick);

//Events for phoneAuth

phoneAuth.addEventListener('click', phoneAuthopenModal);
phoneSpan.addEventListener('click', phoneAuthcloseModal);
window.addEventListener('click', phoneAuthoutsideClick);

// Open
function openModal() {
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

function loginopenModal() {

  loginmodal.style.display = 'flex';
  loginmodal.style.justifyContent = 'center';
  loginmodal.style.alignItems = 'center';
}

// Close
function logincloseModal() {
loginmodal.style.display = 'none';

}

// Close If Outside Click
function loginoutsideClick(e) {
  if (e.target == loginmodal) {
    loginmodal.style.display = 'none';
  }
}

//Events for phone Auth

function phoneAuthopenModal() {
  phonesignin.style.display = 'flex';
  phonesignin.style.justifyContent = 'center';
  phonesignin.style.alignItems = 'center';
}

// Close
function phoneAuthcloseModal() {
 phonesignin.style.display = 'none';
}

// Close If Outside Click
function phoneAuthoutsideClick(e) {
  if (e.target ==phonesignin) {
   phonesignin.style.display = 'none';
  }
}
//show and hide password in login form 
var showHidePassword =()=>{
var passwordInput = document.querySelector(".loginpass")
var hide1 = document.querySelector("#hide1")
var hide2 = document.querySelector("#hide2")

//console.log(passwordInput.type)
if(passwordInput.type ==="password"){
  passwordInput.type = "text"
  hide1.style.display="block";
  hide2.style.display="none"
}
else{
  passwordInput.type = "password"
  hide1.style.display="none";
  hide2.style.display="block"
}
}
//showHidePassword()
var auth=firebase.auth()
var firestore=firebase.firestore()

//Handling SignUp
//fetching all the fields

var signupUsername = document.querySelector(".user");
var signupPs = document.querySelector(".pass")
var confirmsignupPs = document.querySelector(".cpass")
var email = document.querySelector(".email")
// console.log(signupUsername,signupPs,confirmsignupPs,email)

var handleSignUp=async (e)=>{
  e.preventDefault()
  var displayName = signupUsername.value.trim()
  var password = signupPs.value.trim()
  var cpassword = confirmsignupPs.value.trim()
  var mail = email.value.trim()
console.log(displayName,password,cpassword,mail)

  if(displayName && password && cpassword && mail){
    try {
      //Create a new user
      var user =await auth.createUserWithEmailAndPassword(mail,password);
      console.log(user)
      var userId = user.user.uid

      //Creating a userObj
      var userObj= {
        displayName : displayName,
        mail : mail,
        joinAt:firebase.firestore.Timestamp.fromDate(new Date())
      }
      // Adding a user to firebase database

      await firestore.collection("users").doc(userId).set(userObj)
      
      //Redirecting a user to products.html with his id
      location.assign(`index.html#${userId}`)

    } catch (error) {
      alert(error)
    }
  }
}

signupform.addEventListener("submit",(e)=>{
  handleSignUp(e)
})

//handle login
var loginform =document.querySelector(".loginform");
var loginemail=document.querySelector(".loginemail")
var loginpassword = document.querySelector(".loginpass")
var phoneAuth=document.querySelector(".phoneauth")
var handlelogin = async (e)=>{
  
e.preventDefault()
var mail=loginemail.value.trim()
var password= loginpassword.value.trim()

if(mail && password){
  try {
    var user =await auth.signInWithEmailAndPassword(mail, password)
    var userId = user.user.uid;
   
    //redirecting the user with his id

    location.assign(`/index.html#${userId}`)
    // console.log(userId)

  } catch (error) {
   alert(error)
  }
}

}
loginform.addEventListener("submit",(e)=>handlelogin(e))

//forgot password authentication
var forgotPs = document.querySelector(".forgetps");
// $(document).ready(function(){
//   $(".resetPs").hide()

// })

var changeLocation = ()=>{
  var currentlocation=location.href;
  location.assign(`resetpassword.html`)

 
  
}

forgotPs.addEventListener("click",changeLocation)

//google signin Authentication

//for new user
var handleGoogleLogin = async ()=>{
 try {

  var provider =  new firebase.auth.GoogleAuthProvider();
  var user =await auth.signInWithPopup(provider)
  var userId =user.user.uid;
  console.log(user)

  if(user.additionalUserInfo.isNewUser){
    //add a user info to firestore

    var userObj ={
      name : user.additionalUserInfo.profile.name,
      email : user.additionalUserInfo.profile.email,
      joinAt:firebase.firestore.Timestamp.fromDate(new Date())
    }
    await firestore.collection("users").doc(userId).set(userObj)

    //Redirect a user to login page
    location.assign(`/index.html#${userId}`)
  }
  else{
   
    //Redirect a user to login page
    location.assign(`/index.html#${userId}`)
  }
   
 } catch (error) {
   alert(error)
 }
 
}

googlelogin.addEventListener("click",handleGoogleLogin)

//Phone login
var handlePhoneLogin =async(e)=>{
  e.preventDefault();
  var phoneNumber =document.querySelector(".phone").value;
  var appVerifier = window.recaptchaVerifier;
  try {
     auth.signInWithPhoneNumber(phoneNumber,appVerifier).then((confirmationResult)=>{

      window.confirmationResult = confirmationResult;
      codeResult = confirmationResult;
      console.log(codeResult);
      alert("Message Sent");
      
    })

  } catch (error) {
  alert(error)
  }
}

function codeVerify(){
  try {
    
  } catch (error) {
      alert(error)
  }
var codeValue=document.querySelector(".verificationcode").value;
codeResult.confirm(codeValue).then((result)=>{
alert("Successfully Registered");
var user = result.user;
// var userId=user.user.uid;
//  console.log(user);
// location.assign(`/index.html`)
}).catch(function(error){
  console.log(error)
})
}

sendCodeBtn.addEventListener("click",(e)=>handlePhoneLogin(e))
window.onload =function(){
  render()
}
function render(){
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha');
recaptchaVerifier.render()
}
