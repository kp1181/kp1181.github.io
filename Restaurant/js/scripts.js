var tables=JSON.parse(tables);
var items = JSON.parse(items);
var currentInput,currentTable,currentTarget;



function del(ev){
  var itemId = ev.target.id;
  currentTable.quantity -= currentTable.items[ev.target.id-10000].quantity;
  currentTable.amount -= currentTable.items[ev.target.id-10000].price * currentTable.items[ev.target.id-10000].quantity;
  currentTable.items.splice(ev.target.id-10000,1);
  currentTable.innerHTML =  currentTable.name + " | Rs. "+currentTable.amount +" | Total items: "+currentTable.totalItems;
  bill(currentTarget);

}

function edit(ev){
  if(ev.target.value<=0){
    alert("No of items should be greater than 0");
    ev.target.value = currentTable.items[ev.target.id-1000].quantity;
  }
  else{
    var inputId = ev.target.id;
    var change = ev.target.value - currentTable.items[ev.target.id-1000].quantity;
    currentTable.items[ev.target.id-1000].quantity = ev.target.value;
    currentTable.amount += change * currentTable.items[ev.target.id-1000].price;
    currentTable.quantity += change;
    currentTable.innerHTML =  currentTable.name + " | Rs. "+currentTable.amount +" | Total items: "+currentTable.totalItems;
    bill(currentTarget);
  }
}

function bill(ev){

  currentTarget = ev;

  var head = document.getElementById("head");
  var bill = document.getElementById("bill");
  var tableId = ev.target.id;
  var table = document.getElementById(tableId);
  head.innerHTML="Bill for "+table.name;
  bill.innerHTML="<tr><th>S.No</th><th>Item</th><th>Price</th><th>Quantity</th>";
  for(var i=0;i<table.items.length;i++)
  {
    var item = document.getElementById(table.items[i].id);
    var variety = bill.insertRow(i+1);
    variety.insertCell(0).innerHTML = i+1;
    variety.insertCell(1).innerHTML = item.name;
    variety.insertCell(2).innerHTML = item.price;
    variety.insertCell(3).innerHTML = '<input type="number" style="align:center;width:50px"></input>';
    document.getElementsByTagName("input")[i+2].id = 1000+i;
    document.getElementsByTagName("input")[i+2].value = table.items[i].quantity;
    variety.insertCell(4).innerHTML = '<i class="fa fa-trash"></i>';
    document.getElementsByClassName("fa fa-trash")[i].id = 10000+i;
    variety.cells[3].addEventListener("change",edit,false);
  	variety.cells[4].addEventListener("click",del,false);
  }
  row = bill.insertRow(table.items.length+1);
  row.insertCell(0).innerHTML = "";
  row.insertCell(1).innerHTML = "";
  row.insertCell(2).innerHTML = "Total : "+table.amount;
  row.insertCell(3).innerHTML = "";
  row.insertCell(4).innerHTML = "";
  currentTable = table;
  var tail = document.getElementById("tail");
  tail.addEventListener("click",pay,false);

  $("#myModal").modal();

}

function pay(){
  alert("Pay Rs."+currentTable.amount);
  $("#myModal").modal("hide");
  currentTable.amount=0;
  currentTable.totalItems=0;
  currentTable.items=[];
  currentTable.innerHTML=currentTable.name + " | Rs. "+currentTable.amount +" | Total items: "+currentTable.totalItems;
}

function drag(ev) {
	ev.dataTransfer.dropEffect = "copy";
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
  var itemId = ev.dataTransfer.getData("text");
  var item = document.getElementById(itemId);
  var tableId = ev.target.id;
  var table = document.getElementById(tableId);
  var newItem = true;
  for(var i=0;i<table.items.length;i++)
  {
    if(itemId==table.items[i].id)
    {
      newItem=false;
      table.totalItems+=1;
      table.amount+=item.price;
      table.items[i].quantity++;
      break;

    }
  }
  if(newItem==true)
  {
    var new_item = {"id":itemId,"name":item.name,"price":item.price,"quantity":1};
    table.items.push(new_item);
    table.totalItems+=1;
    table.amount+=item.price;
  }
  table.innerHTML = table.name + " | Rs. "+table.amount +" | Total items: "+table.totalItems;
}


function allowDrop(ev) {
	ev.preventDefault();
}





function loadTables()
{
  var table = document.getElementById("Tables");
  for(var i=0;i<tables.length;i++){
    var t = document.createElement("div");
    t.innerHTML= tables[i].name + " | Rs. "+tables[i].amount +" | Total items: "+tables[i].totalItems;
    t.id = tables[i].id;
    t.name = tables[i].name;
    t.totalItems = tables[i].totalItems;
    t.amount = tables[i].amount;
    t.items = tables[i].items;
    t.addEventListener("dragover",allowDrop,false);
		t.addEventListener("drop",drop,false);
		t.addEventListener("click",bill,false);
    t.className = "card card-body";

    table.appendChild(t);
  }
}


function loadItems()
{
  var item = document.getElementById("Items");
  for(var i=0;i<items.length;i++){
    var t = document.createElement("div");
    t.innerHTML= items[i].name + " | Rs. "+items[i].price ;
    t.id = items[i].id;
    t.name = items[i].name;
    t.type = items[i].type;
    t.price = items[i].price;
    t.draggable=true;
    t.addEventListener("dragstart",drag,false);
    t.className = "card card-body";

    item.appendChild(t);
  }
}

function load(){
  loadTables();
  loadItems();
}


function searchTables(){
  var input = document.getElementById('input1');
  var filter = input.value.toUpperCase();
  var table = document.getElementById("Tables");
  var div = table.getElementsByTagName("div");
  for (var i = 0; i < div.length; i++) {
    if(div[i].name.toUpperCase().indexOf(filter) > -1){
      div[i].style.display = "";
    }
    else{
      div[i].style.display = "none";
    }
  }
}

function searchMenu(){
  var input = document.getElementById('input2');
  var filter = input.value.toUpperCase();
  var table = document.getElementById("Items");
  var div = table.getElementsByTagName("div");
  for (var i = 0; i < div.length; i++) {
    if(div[i].name.toUpperCase().indexOf(filter) > -1 || div[i].type.toUpperCase().indexOf(filter) > -1){
      div[i].style.display = "";
    }
    else{
      div[i].style.display = "none";
    }
  }
}
