var nameData = JSON.parse(localStorage.nameData || null) || {};
var socket = io.connect(window.location.origin);
var tableNames;


function setup(){
  createCanvas(400, 400);
  input = createInput();
  input.position(20, 65);
  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);
  greeting = createElement('h2', 'who are you?');
  greeting.position(20, 5);
  textAlign(CENTER);
  textSize(50);
}

function draw(){
  background(255);
  // text(loadStuff(), width/2,height/2);

}

function greet() {
  var name = input.value();
  greeting.html('hello '+name+'! whats your email');
  input.value('');
  saveStuff(name);
  button.remove();
  nextButton = createButton("good job");
  nextButton.position(input.x + input.width, 65);
  nextButton.mousePressed(journey);
}

function journey(){
  var newText = input.value();
  greeting.html("still here?");
  input.value('');
  saveStuff(newText);
  nextButton.remove();
  unholyButton = createButton("clikc please");
  unholyButton.position(input.x + input.width, 65);
  unholyButton.mousePressed(showAll);
}

function showAll(){
  unholyButton.remove();
  greeting.remove();
  input.remove();
  _dataLoader("names.csv");
  lastButton = createButton("see friends");
  lastButton.position(10,10);
  lastButton.mousePressed(printOut);
}

function printOut(){
  lastButton.remove();
  console.log(tableNames.getColumn("name"));
  for(var r = 0; r < tableNames.getRowCount(); r++){
    text(tableNames.getString(r,0),10,10+5*r);
  }
}

function _dataLoader(dataBaseName,){
  tableNames = loadTable(dataBaseName,"csv","header");
  console.log("data loaded");
  console.log(tableNames.getColumn("name"));
}


// Store your data.
function saveStuff(obj) {
  nameData.name = obj;
  nameData.time = new Date().getTime();
  // localStorage.nameData = JSON.stringify(nameData);
  _emitter(nameData);
}

function loadStuff() {
  return nameData.name || "default";
}

function _emitter(data){
  socket.emit('nameSocket', data);
  //console.log(data);
}
