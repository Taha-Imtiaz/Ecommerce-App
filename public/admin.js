var auth= firebase.auth()
var firestore=firebase.firestore();

var selectedFile
var imageURL = undefined
var addBtn=document.querySelector(".addbtn h1");
var deleteBtn=document.querySelector(".deletebtn h1");
var modal = document.querySelector(".modal");
var span = document.querySelector(".close");


addBtn.addEventListener("click",openModal)
span.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

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
  //hide submit button
  $(document).ready(function(){
    $(".submit").hide()
  })
  $("#imageFile").on("change",function(){
    selectedFile =event.target.files[0]
    $(".submit").show()
  })
var image =document.querySelector(".image")

  //Upload images on firebase storage
  var uploadImages=()=>{

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
  image.addEventListener("change",uploadImages) 
  // console.log(imageURL)  

  var addItemForm = document.querySelector(".addform");
console.log(addItemForm)
  

  var addItem =async (e)=>{
    console.log("clicked")
    e.preventDefault()
  var title = document.querySelector(".title").value.trim();
  var description = document.querySelector(".des").value.trim();
  // console.log(description)
   var addAt = document.querySelector(".date").value.trim();
  var price =document.querySelector(".price").value.trim();
  var quantity =document.querySelector(".quantity").value.trim();
  var imageLink = imageURL
console.log(imageLink)
  if (description && addAt && price && quantity && imageLink){
    var ItemObj={
      title:title,
      description:description,
       addAt:new Date(addAt),
      price:parseInt(price),
     quantity:parseInt(quantity),
      imageLink:imageLink

     

    } 
    console.log(imageLink)
    await firestore.collection("items").add(ItemObj)
    console.log(imageLink)
   // fetchRender()
   location.assign(`index.html`)
  }
}
  addItemForm.addEventListener("submit",(e)=>{
    addItem(e)
  })

  var materialIcon = document.querySelector(".material-icons");

  var itemsNode = document.querySelector(".items");
  var fetchItems = async () => {
    var items = [];
  
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
        `<div class="itemlist flex" onclick = "editItem('${item.id}')">
        <div class="details flex">
      <h1> ${item.title}</h1>
     <span> ${item.price}Rs</span>
    </div>
    <img src="${item.imageLink}" >
   
  </div>` );
  }
  };
  
  var fetchRender = async () => {
    
   
    var items = await fetchItems();
    renderItems(items);
  };

  materialIcon.addEventListener("click",fetchRender)
  var seeAllItems =()=>{
    var classItems = itemsNode.classList.contains("active")
   
    if (!classItems) {
     itemsNode.classList.add("active");
      itemsNode.style.display = "grid";
      
    } else {
     itemsNode.classList.remove("active");
       itemsNode.style.display="none"
    }
  }
  var editItem = (itemId)=>{
   // console.log(itemId)
   location.assign(`/editItems.html#${itemId}`)
  }