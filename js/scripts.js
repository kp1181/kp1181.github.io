function setImages()
{
  var obj = JSON.parse(data);
  var imgData = obj.images;
  var table = document.getElementById("imageTable");
  var tr,td;
  for(var i=0;i<imgData.length;i++){
    var image = document.createElement("img");
    image.src=imgData[i].url;
    if(i%3==0){
      tr = table.insertRow();
    }
    td = tr.insertCell();
    td.appendChild(image);
  }
}
