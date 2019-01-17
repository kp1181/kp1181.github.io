var obj = JSON.parse(data);
var currentImage,id=0;

function isUrl(url){
    if( url==="")
      return false;
      //var re = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
      //var re = /\S+\.\S+/;
    var re= /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return re.test(url);
}

function isDate(date){
  if(date.value==="")
    return false;
  var re = /^\d{2}-\d{2}-\d{4}$/;
  if(re.test(String(date).toLowerCase())===false){
    return false;
  }

  var day   = parseInt(date.substring(0,2));
  var month = parseInt(date.substring(3,5));
  var year  = parseInt(date.substring(6,10));


  var enteredDate = new Date(year,month-1,day);
  if(!enteredDate.getTime()){;
    return false;
  }

  var currentTime = new Date().getTime();
  var enteredTime = enteredDate.getTime();
  if(enteredTime>=currentTime)
    return false;
  return true;
}

function isValid(name,url,info,date){
  if(name.value==""){
    alert("Name cannot be empty");
    return false;
  }
  if(isUrl(url.value) === false){
    alert("Invalid Image URL");
    return false;
  }
  if(info.value===""){
    alert("Information cannot be empty");
    return false;
  }
  if(isDate(date.value)===false ) {
    alert("Invalid date");
    return false;
  }
  return true;
}


function setImages()
{
  var imgData = obj.images;
  var table = document.getElementById("imageTable");
  var tr,td;
  for(var i=0;i<imgData.length;i++){
    var image = document.createElement("img");
    image.src=imgData[i].url;
    image.name=imgData[i].name;
    image.info=imgData[i].info;
    image.uploadedDate=imgData[i].uploadedDate;
    image.id = id++;
    imgData[i].id = image.id;
    if(i%3==0){
      tr = table.insertRow();
    }
    td = tr.insertCell();
    td.appendChild(image);
  }
}



function openModal()
{
  document.getElementById("name").value = this.name;
  document.getElementById("url").value = this.src;
  document.getElementById("info").value = this.info;
  document.getElementById("uploadedDate").value = this.uploadedDate;
  currentImage=this;
  $("#myModal").modal();

}


function load() {
  setImages();
  var images = document.getElementsByTagName("img");
  for(var i=0;i<images.length;i++)
  {
    images[i].addEventListener("click",openModal);
  }
}

$(document).on("click", "#add", function(event){

  var name = document.getElementById("name");
  var url = document.getElementById("url");
  var info = document.getElementById("info");
  var uploadedDate = document.getElementById("uploadedDate");
  var table = document.getElementById("imageTable");
  var image = document.createElement("img");
  var images = document.getElementsByTagName("img");
  var tr = document.getElementsByTagName("tr");
  var td;
  if(isValid(name,url,info,uploadedDate))
  {
    tr = tr[tr.length-1];
    if(images.length%3==0)
    {
      tr = table.insertRow();
    }

    td=tr.insertCell();

    image.src = url.value;
    image.name=name.value;
    image.info=info.value;
    image.uploadedDate=uploadedDate.value;
    image.id = id++;
    image.addEventListener("click",openModal);
    obj['images'].push({"id":image.id,"name":name.value,"url":url.value,"info":info.value,"uploadedDate":uploadedDate.value});
    td.appendChild(image);
    $("#myModal").modal('hide');
  }
  return false;
});


$(document).on("click", "#save", function(event){
  var name = document.getElementById("name");
  var url = document.getElementById("url");
  var info = document.getElementById("info");
  var uploadedDate = document.getElementById("uploadedDate");
  var table = document.getElementById("imageTable");
  var image = document.createElement("img");

  if(isValid(name,url,info,uploadedDate))
  {
    for(var i=0;i<obj.images.length;i++)
    {
      if(currentImage.id == obj.images[i].id)
      {
        obj.images[i].name = name.value;
  			obj.images[i].url = url.value;
  			obj.images[i].info = info.value;
  			obj.images[i].uploadedDate = uploadedDate.value;
        currentImage.src=url.value;
        currentImage.name=name.value;
        currentImage.info=info.value;
        currentImage.uploadedDate=uploadedDate.value;
      }
    }
    $("#myModal").modal('hide');
  }

  return false;
});


$(document).on("click", "#del", function(event){
  var name = document.getElementById("name");
  var url = document.getElementById("url");
  var info = document.getElementById("info");
  var uploadedDate = document.getElementById("uploadedDate");
  var table = document.getElementById("imageTable");
  for(var i=0;i<obj.images.length;i++)
  {
    if(currentImage.id == obj.images[i].id)
    {
      obj.images.splice(i,1);
      break;
    }
  }
	table.innerHTML = "";
  load();
  $("#myModal").modal('hide');
  return false;
});
