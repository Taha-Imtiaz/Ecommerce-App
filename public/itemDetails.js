var firestore=firebase.firestore();
var itemId = location.hash.substring(1,location.hash.length)
console.log(itemId)

var fetchItem = async ()=>{
    var getItem = await firestore.collection("items").doc(itemId).get()
    var getItemData = getItem.data()
    console.log(getItemData)

    var itemObj = {
        title : getItemData.title,
        description : getItemData.description,
        price : getItemData.price,
        imageLink : getItemData.imageLink,
        quantity:getItemData.quantity
       
   
    }
    return itemObj

}
var content = document.querySelector(".content")
console.log(content)
renderItems = (item)=>{
content.insertAdjacentHTML("beforeend",`
<div class= "itemimage flex"><img src = "${item.imageLink}" ></div>
<div class="itemtitle flex"> <h1>${item.title}</h1></div>
<div class="itemdescription flex"><p>${item.description}</p></div>
<div class="itemprice flex"><p>${item.price}Rs</p></div>
`)
}
var item;
var fetchRender =async () =>{
  item = await fetchItem()
 renderItems(item)
}
fetchRender()
// var addCart=document.querySelector(".add-cart");
var backPage = document.querySelector(".backPage");



// var addToCart =async ()=>{
//   await  swal({
//       text: "Your Item is Added!",
//       icon: "success",
//     });
//     if(addCart){
//         console.log(item)
//     }
// console.log(item)
//   history.back()
  
//   //location.assign(`/index.html${item}`)
//   }
var goBack = ()=>{
    history.back()
}
//addCart.addEventListener("click",addToCart)
backPage.addEventListener("click",goBack)