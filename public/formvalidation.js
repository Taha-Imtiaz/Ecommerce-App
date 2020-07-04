function signUpValidation(){
    var username = document.querySelector(".user").value;
    var pass = document.querySelector(".pass").value;
    
    var cpass = document.querySelector(".cpass").value;
   
    var email= document.querySelector(".email").value;
   
    var checkUser = /^[A-Za-z. ]{3,30}$/
    var checkPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    var checkEmail = /^[A-Za-z0-9_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/

    if(checkUser.test(username)){
        document.querySelector(".username").innerHTML = ""
       
    }
    else{
        document.querySelector(".username").innerHTML = "Username is Invalid"
        return false
        }


    if(checkPassword.test(pass) ){
        document.querySelector(".password").innerHTML = ""
       
    }
    else{
        document.querySelector(".password").innerHTML = "Password length is 6 and must include one special character"
        return false
    }
    if(cpass.match(pass)){
        document.querySelector(".cpassword").innerHTML = ""
       
    }
    else{
        document.querySelector(".cpassword").innerHTML = "Password Did not Match"
        return false
        }

        if(checkEmail.test(email)){
        document.querySelector(".emailId").innerHTML = ""
       
    }
    else{
        document.querySelector(".emailId").innerHTML = "The Email is Invalid"
        return false
    }
   
}

function loginValidation(){
    var email= document.querySelector(".loginform .loginemail").value;
    // console.log(email)
        var pass = document.querySelector(".loginform .loginpass").value;
        // console.log(pass)
   
    var checkPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    var checkEmail = /^[A-Za-z0-9_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
    
    if(checkEmail.test(email)){
        document.querySelector(".loginform .loginemailId").innerHTML = ""
       
    }
    else{
        document.querySelector(".loginform .loginemailId").innerHTML = "The Email is Invalid"
        return false
    }

    if(checkPassword.test(pass) ){
        document.querySelector(".loginform .loginpassword").innerHTML = ""
       
    }
    else{
        document.querySelector(".loginform .loginpassword").innerHTML = "Password length is 6 and must include one special character"
        return false
    }

}
function phoneValidation(){
    var mobileNo = document.querySelector(".phoneauth .phone").value;
    console.log(mobileNo)
     var checkMobile =  /^[+]923[0-9]{9}$/

     if(checkMobile.test(mobileNo) ){
        document.querySelector(".phoneauth .phoneId").innerHTML = ""
       
    }
    else{
        document.querySelector(".phoneauth .phoneId").innerHTML = "Phone Number is Invalid"
        return false
    }


}