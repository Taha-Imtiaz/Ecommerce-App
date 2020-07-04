var auth = firebase.auth()
var firestore=firebase.firestore();
var itemId = location.hash.substring(1,location.hash.length)
console.log(itemId)

var fetchSpecificItem =async (itemId)=>{
var itemQuery = await firestore.collection("items").doc(itemId).get();
var itemData= itemQuery.data()
return itemData
}
var Edit = document.querySelector(".Edit");
var Delete = document.querySelector(".Delete")
var image = document.querySelector(".image");
console.log(image)
var imageURL = undefined


var updateHandler =  async (e)=>{
e.preventDefault();
console.log("Edit")
var title = document.querySelector(".title").value.trim()
var description = document.querySelector(".des").value.trim()
var addAt = document.querySelector(".date").value.trim();
var price =document.querySelector(".price").value.trim();
var quantity =document.querySelector(".quantity").value.trim();
// console.log(quantity)
var imageLink = imageURL;

if (title && description && addAt && price && quantity && imageLink){
    try {
        var updatedItem ={
            title:title,
            description:description,
            addAt:new Date(addAt),
            price:parseInt(price),
            quantity:parseInt(quantity),
            imageLink:imageLink
        } 
         console.log("updated")
       await firestore.collection("items").doc(itemId).update(updatedItem);
      
        location.assign(`index.html`)
        
    } catch (error) {
        alert(error)
    }
}
}

var uploadImages=(e)=>{
    var selectedFile =e.target.files[0];
    var fileName = selectedFile.name;

    // Create a root reference
    var storageRef = firebase.storage().ref(`/images/${fileName}`);
    var uploadTask =storageRef.put(selectedFile);

    // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
    imageURL = await downloadURL
    console.log(imageURL)
    console.log('File available at', imageURL);
    console.log("image uploaded successfully")
  });
});
  }

image.addEventListener("change",(e)=>uploadImages(e)) 


auth.onAuthStateChanged(async Item =>{
    var item = await fetchSpecificItem(itemId)
    //console.log(e);
    
    var title = document.querySelector(".title")
    var description = document.querySelector(".des")
    var addAt = document.querySelector(".date");
    var price =document.querySelector(".price");
    var quantity =document.querySelector(".quantity");
    var prevPic =document.querySelector(".prevPic");
    
    //autofill form
    title.value = item.title;
    description.value = item.description;
    addAt.value = item.addAt.toDate().toISOString().split("T")[0];
    //console.log(item.addAt.toDate().toISOString().split("T")[0])
    price.value = item.price;
    quantity.value =item.quantity;
    prevPic.src =item.imageLink

   Edit.addEventListener("click",e =>updateHandler(e)) 
   
   var deleteHandler = async()=>{

    await firestore.collection("items").doc(itemId).delete()
    location.assign(`index.html`)
   }


    Delete.addEventListener("click",()=>deleteHandler())
})

