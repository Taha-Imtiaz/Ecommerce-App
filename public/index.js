//alert popup to check login or logout
var auth = firebase.auth();
var firestore = firebase.firestore();
var userId = location.hash.substring(1, location.hash.length);
console.log(userId);

// auth.onAuthStateChanged(async user => {
//   if (user) {
//     await swal("Congratulations!", "You Successfully Login!", "success");
//     console.log(userId);
//   } else{
//     await swal("Sorry!", "Please Login to View Products!", "error");
//     location.assign(`login.html`);
//   }
// });
//  Logout Feature

var signoutBtn = document.querySelector(".logout");
console.log(signoutBtn);

var signOut = async () => {
  try {
    var userSignOut = await auth.signOut();
    location.assign(`login.html`);
  } catch (error) {
    swal("OOPS!", error, "error");
  }
};

signoutBtn.addEventListener("click", signOut);

//Add smooth scrolling effect to nav
$(".slide").click(function(e) {
  //alert("clicked");

  var clicklink = $(this).attr("href");
  var navHeight = $(".nav").outerHeight();

  console.log(navHeight);
  console.log(clicklink);
  console.log($(clicklink).offset().top);

  
    $("html ,body").animate(
      {
        scrollTop: $(clicklink).offset().top 
      },
      1000
    );
 
   
  e.preventDefault();
});

//make a navbar fixed
// var navbar = document.querySelector(".nav");

// var sticky = navbar.offsetTop;
// console.log(sticky);
// window.onscroll = function() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky");
//   } else {
//     navbar.classList.remove("sticky");
//   }
// };

//handlenav for less than 800px
var handleNav = () => {
  var container = document.querySelector(".container");
  var products = document.querySelector(".products");
  
  var about = document.querySelector(".about");
  // console.log(container)
  var navitems = document.querySelector(".navitems");
  var navitemdiv = document.querySelector(".navitems div");
  var classNav = navitems.classList.contains("active");
  console.log(classNav);
  if (!classNav) {
    navitems.classList.add("active");
    navitems.style.display = "block";
  } else {
    navitems.classList.remove("active");
    // navitems.style.display="none"
  }
};

var toggle = document.querySelector(".toggle ");
console.log(toggle);
toggle.addEventListener("click", handleNav);

// //making nav responsive for less than 1000px
// $(document).ready(function(){
//   $(".toggle").click(function(){
//     $(".navitems").toggleClass("active")
//   })
// })

//adding smooth scroll on clicking get started

var getStartedBtn = document.querySelector(".getstarted");

getStartedBtn.addEventListener("click", function() {
  $("html ,body").animate(
    {
      scrollTop: $(".products").offset().top
    },
    1000
  );
});

//text typing animation
var textarray = [
  "change you can see",
  "great place to be",
  "tradition of excellence since 1989",
  "fresh approach to shopping"
];
var typingDelay = 200;
var erasingDelay = 100;
//this is the delay of appearing next text
var newTextDelay = 2000;
//1st element of array
var textArrayIndex = 0;
//1st character of 1st element
var charIndex = 0;

//fetch type text element
var typeText = document.querySelector(".typetext");
//remove blinking while typing
var cursor = document.querySelector(".cursor");

function type() {
  if (charIndex < textarray[textArrayIndex].length) {
    if (!cursor.classList.contains("typing")) {
      // remove blinking while typing
      cursor.classList.add("typing");
    }
    //type the string character by character
    typeText.textContent += textarray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    // add blinking after typing
    cursor.classList.remove("typing");
    //erase the text
    setTimeout(erase, newTextDelay);
  }
}
function erase() {
  if (charIndex > 0) {
    //remove blinking while erasing
    if (!cursor.classList.contains("typing")) {
      cursor.classList.add("typing");
    }
    //erase the content character  by character
    typeText.textContent = textarray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    //add blinking after erasing
    cursor.classList.remove("typing");
    //type the next string in an array
    textArrayIndex++;
    if (textArrayIndex >= textarray.length) {
      textArrayIndex = 0;
    }
    setTimeout(type, typingDelay + 1100);
  }
}
document.addEventListener("DOMContentLoaded", function() {
  if (textarray.length) setTimeout(type, newTextDelay + 250);
});


//Upload all the information to firestore

var itemsNode = document.querySelector(".items");
var items = [];
//fetching and rendering items
var fetchItems = async () => {
  

  //fetching items
  var itemsQuery = await firestore.collection("items").orderBy("price","asc").get();
  //var itemObj=itemsQuery.data()
  itemsQuery.forEach(doc => {
    items.push({ ...doc.data(), id: doc.id });
  });
  return items;
};
var renderItems = itemArr => {
  itemsNode.innerHTML = "";
  console.log(itemArr);
  for (var item of itemArr) {
    console.log(item);
    console.log(item.id)
    console.log(itemArr)
    itemsNode.insertAdjacentHTML(
      "beforeend",
      `<div class="itemlist flex">
      <div class="details flex">
    <h1> ${item.title}</h1>
   <span> ${item.price}Rs</span>
  </div>
  <img src="${item.imageLink}" onclick="seeItemDetails('${item.id}')">
  <button onclick="addToCart('${item.id}')" id ="${item.id}">Add To Cart</button>
</div>` );


}
};
var seeItemDetails =(itemId)=>{
  location.assign(`/itemDetails.html#${itemId}`)
  
}


auth.onAuthStateChanged(async user=>{
 // console.log(user)
 if (user === null){
    await swal("Sorry!", "Please Login to View Products!", "error");
  location.assign(`login.html`);
  }

else if(user.uid ===userId){
  
    await swal("Congratulations!", "You Successfully Login!", "success");
    console.log(userId);
    var items = await fetchItems();
      renderItems(items);
     } 
})
// var fetchRender = async () => {
  
//   var items = await fetchItems();
//   renderItems(items);
// };
// fetchRender();

var addCartItem=[]

var cartitems= document.querySelector(".cartitems")
console.log(cartitems)


//console.log(itemlist)

var addToCart = async(itemId)=>{
 
//getting item data
  var getItem = await firestore.collection("items").doc(itemId).get()
  var getItemData = getItem.data()
  // console.log(getItemData)
 
   var isInCart = (addCartItem.filter(cartItem=>
   (cartItem[0].title ===getItemData.title)).length > 0)

   if(!isInCart){

    //fetching id of add to cart btn which is clicked
    var itemlist = itemsNode.querySelectorAll(".itemlist button")
   var addCartBtn = [...itemlist].filter(item=>item.id === itemId);
   var addCartBtnId = addCartBtn[0].getAttribute("id");
   console.log(addCartBtn[0])
 
    var itemClicked = items.filter(item=>item.id ===itemId)
    console.log(itemClicked)
   
    insertItemToDOM(itemClicked)
    addCartItem.push(itemClicked)
    countTotal()
    handleActionButtons(addCartBtn,itemClicked)
   
  }
}

var insertItemToDOM = (itemClicked)=>{
  
  cartitems.insertAdjacentHTML("beforeend",
  `<div class="cartitemlist flex">
  <img src ="${itemClicked[0].imageLink}" alt ="${itemClicked[0].title}">
  <h1 class = "item_name">${itemClicked[0].title}</h1>
  <h1>${itemClicked[0].price}</h1>
  <h1 class = "itemquantity">${itemClicked[0].quantity}</h1>
  <button class= "btn btn--primary btn--small btn--danger decreaseItem">&minus;</button>
  <h1 class="itemprice">${itemClicked[0].price}</h1>
  <button class= "btn btn--primary btn--small increaseItem">&plus;</button>

  <button class= "btn btn--primary btn--danger removeItem">&times;</button>
  
  </div>`
  )
  addCartFooter()
}



var handleActionButtons = (addCartBtn,itemClicked)=>{
  addCartBtn[0].innerHTML ="In Cart"
  addCartBtn[0].disabled =true
  console.log(addCartItem)
  console.log(itemClicked[0].imageLink)
  console.log(itemClicked[0].title)
  console.log(itemClicked[0].price)

var cartItemsDOM=  cartitems.querySelectorAll(".cartitemlist")


cartItemsDOM .forEach(cartItemDOM=>{
  console.log(cartItemDOM)
  if (cartItemDOM.querySelector(".item_name").innerHTML === itemClicked[0].title){

  cartItemDOM.querySelector(".increaseItem").addEventListener("click",()=>

    //loop through all array and compare it with the item added to the cart
    increaseItem(itemClicked,cartItemDOM))

  cartItemDOM.querySelector(".decreaseItem").addEventListener("click",()=>decreaseItem(itemClicked, cartItemDOM, addCartBtn))

  cartItemDOM.querySelector(".removeItem").addEventListener("click",()=>removeItem(itemClicked, cartItemDOM, addCartBtn))
}
})


}
var increaseItem = (itemClicked, cartItemDOM)=>{
 
  addCartItem.forEach(cartItem=>{
    // console.log(cartItem[0].title)
    if (cartItem[0].title === itemClicked[0].title){
      //Increase the value by 1
     // console.log(cartItem[0].quantity) 
     cartItemDOM.querySelector(".itemquantity").innerHTML = ++cartItem[0].quantity
     cartItemDOM.querySelector(".decreaseItem").classList.remove('btn--danger');
     cartItemDOM.querySelector(".itemprice").innerHTML = cartItem[0].quantity * cartItem[0].price
     countTotal()
    }
  })
}

var decreaseItem = (itemClicked,cartItemDOM, addCartBtn)=>{

  //loop through all array and compare it with the item added to the cart
  addCartItem.forEach(cartItem=>{
    // console.log(cartItem[0].quantity)
    if (cartItem[0].title === itemClicked[0].title){

      //decrease the value by 1
     // console.log(cartItem[0].quantity)

     //do not decrease the value below 1. because if the quqntity is less than 1. it should not be in cart

     if (cartItem[0].quantity > 1){

     cartItemDOM.querySelector(".itemquantity").innerHTML = --cartItem[0].quantity
      cartItemDOM.querySelector(".itemprice").innerHTML = cartItem[0].quantity * cartItem[0].price
      countTotal()
    }
     else{
       //if the quantity is less than one.
      removeItem(itemClicked,cartItemDOM, addCartBtn)
     }
     if (cartItem[0].quantity ===1){
      cartItemDOM.querySelector(".decreaseItem").classList.add('btn--danger')
     }
    }
  })
}
 var removeItem = (itemClicked,cartItemDOM ,addCartBtn)=>{

  //loop through all array and compare it with the item added to the cart
  
    // console.log(cartItem[0].quantity)
   

       cartItemDOM.classList.add('cart__item--removed')
       setTimeout(() => cartItemDOM.remove(), 300);
       
     addCartItem = addCartItem.filter(cartItem=> cartItem[0].title !== itemClicked[0].title)
     countTotal()
     addCartBtn[0].innerHTML ="Add To Cart";
     addCartBtn[0].disabled =false

     if (addCartItem.length <1){
       document.querySelector(".cart-footer").remove()
     }
     
    }
   
    var addCartFooter = () =>{
      if(document.querySelector(".cart-footer")=== null){
        cartitems.insertAdjacentHTML("afterend",
        `<div class = "cart-footer">
        <button class ="btn btn--danger clearCart">Clear Cart</button>
        <button class ="btn btn--primary checkOut">Pay</button>
        </div>
        `)
        document.querySelector(".clearCart").addEventListener("click",()=>clearCart())
       // document.querySelector(".checkOut").addEventListener("click",()=>checkOut())
        } 
        
    }
    var clearCart = ()=>{

      cartitems.querySelectorAll(".cartitemlist").forEach(cartItemDOM=>{
      cartItemDOM.classList.add('cart__item--removed')
      setTimeout(() => cartItemDOM.remove(), 300);
      })
      addCartItem = []
      document.querySelector(".cart-footer").remove()
      var itemlist = itemsNode.querySelectorAll(".itemlist button")
     itemlist.forEach(button =>{
     button.innerHTML ="Add To Cart";
     button.disabled =false
     })
    }
//     var checkOut = () => {
//     var payPalFormHTML = `
// <form id = "paypal-form" action="https://www.paypal.com/cgi-bin/webscr" method="post">
// <input type="hidden" name="cmd" value="_cart">
// <input type="hidden" name="upload" value="1">
// <input type="hidden" name="business" value="tahaimtiaz1996@gmail.com">
// `;

// addCartItem.forEach((cartItem,index) =>{
// ++index;
//   payPalFormHTML += `
//   <input type="hidden" name="item_name_${index}" value="${cartItem[0].title}>
//   <input type="hidden" name="amount_${index}" value="${cartItem[0].price}">
//   <input type="hidden" name="quantity_${index}" value="${cartItem[0].quantity}">
//   `;

// })


// payPalFormHTML += `
// <input type="submit" value="PayPal">
// </form>
// <div class = "overlay"></div>
//     `;
//   document.querySelector("body").insertAdjacentHTML("beforeend",payPalFormHTML)
//   document.getElementById("paypal-form").submit()  

// }
var countTotal = ()=>{
  var count = 0;
 addCartItem.forEach(cartItem=>{
   count +=(cartItem[0].quantity * cartItem[0].price)
 })
 document.querySelector(".checkOut").innerHTML = `Total: ${count} Rs`
 //console.log(count)
}