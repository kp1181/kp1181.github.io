function setImages()
{
  if(localStorage.getItem('cache')==null){
    var tmp = JSON.parse(data);
    localStorage.setItem('cache', JSON.stringify(tmp));
    var obj = JSON.parse(localStorage.getItem('cache'));
  }
  else {
    var obj = JSON.parse(localStorage.getItem('cache'));
  }
  
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
