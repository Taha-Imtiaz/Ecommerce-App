
function addProducts(){
    var image = document.querySelector(".image");
    var imageValue=image.value
    // console.log(image)

    var splitimageUrl=imageValue.split("\\");
    console.log(splitimageUrl[splitimageUrl.length-1])

    //  image.insertAdjacentHTML("afterend",`img src=${'splitimageUrl[splitimageUrl.length-1]'}`)
    // image.setAttribute("src",splitimageUrl[splitimageUrl.length-1])


    var titlename = document.querySelector(".title").value;
    console.log(titlename)
     var des = document.querySelector(".des").value;
    console.log(des)
     var price = document.querySelector(".price").value;
    console.log(price)
    
    var quantity = document.querySelector(".quantity").value;
    console.log(quantity)
    

    var checkTitle = /^[A-Za-z0-9. ]{3,30}$/
    var checkDes = /^[A-Za-z0-9. ]{3,}$/
    var checkPrice =  /^[0-9]{1,}$/
    var checkQuantity =  /^[1-9]{1,}$/

    if(checkTitle.test(titlename)){
        document.querySelector(".titlename").innerHTML = ""
       
    }
    else{
        document.querySelector(".titlename").innerHTML = "Title is Invalid"
        return false
        }


    if(checkDes.test(des) ){
        document.querySelector(".Description").innerHTML = ""
       
    }
    else{
        document.querySelector(".Description").innerHTML = "Description must be valid"
        return false
    }
    
        if(checkQuantity.test(quantity)){
        document.querySelector(".priceId").innerHTML = ""
       
    }
    else{
        document.querySelector(".priceId").innerHTML = "The Price is Invalid"
        return false
    }
    if(checkPrice.test(price)){
        document.querySelector(".quantityname").innerHTML = ""
       
    }
    else{
        document.querySelector(".quantityname").innerHTML = "The Quantity is Invalid"
        return false
    }
}