var obj = JSON.parse(data);
var currentImage,id=0;


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
  var date = document.getElementById("uploadedDate");
  var table = document.getElementById("imageTable");
  var image = document.createElement("img");
  var images = document.getElementsByTagName("img");
  var tr = document.getElementsByTagName("tr");
  var td;
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
  obj['images'].push({"name":name.value,"url":url.value,"info":info.value,"uploadedDate":uploadedDate.value});
  td.appendChild(image);
  $("#myModal").modal('hide');
  return false;
});


$(document).on("click", "#save", function(event){
  var name = document.getElementById("name");
  var url = document.getElementById("url");
  var info = document.getElementById("info");
  var uploadedDate = document.getElementById("uploadedDate");
  var table = document.getElementById("imageTable");
  var image = document.createElement("img");

  for(var i=0;i<obj.images.length;i++)
  {
    if(currentImage.id == obj.images[i].id)
    {
      obj.images[i].name = url.value;
			obj.images[i].url = name.value;
			obj.images[i].info = info.value;
			obj.images[i].uploadedDate = uploadedDate.value;
      currentImage.src=url.value;
      currentImage.name=name.value;
      currentImage.info=info.value;
      currentImage.uploadedDate=uploadedDate.value;
    }
  }
  $("#myModal").modal('hide');
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
