$document.ready(function(){
  $.getjson('gallery.json',function(data){
    $.each(data.items,function(i,f){
        $().append("<li>img src="+f.path+"/></li>");
    });
  });
});
