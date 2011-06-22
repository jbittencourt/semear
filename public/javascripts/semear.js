var canvasName = "#map-canvas";
var actionAddSeed = "";

var WIDTH;
var HEIGHT;
var map = new Map;
var ctx;
var currentDragObject;
var lastPoint = { x: 0, y: 0 };

var currentMouseState = "NONE"; //valid states are none,click_area, click_object, dragging
var currentClickedObject ;

var newSeedPosition = { x: 0, y: 0 };

function start()
{
	ctx = $(canvasName)[0].getContext("2d");
	WIDTH = $("#map-canvas").width();
	HEIGHT = $("#map-canvas").height();
	
	$(canvasName)[0].addEventListener("mousedown", mouseDown, false);
    $(canvasName)[0].addEventListener("mouseup", mouseUp, false);
    $(canvasName)[0].addEventListener("mousemove", mouseMove, false);
    
	return setInterval(draw, 10);
}

// Draw Function
function draw()
{
	clear();
	var key;
	for (key in map.seeds)	{  
		map.seeds[key].update();
		map.seeds[key].draw();
	}
}

function clear() 
{
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
}


function mouseDown(e)
{
   var x = e.pageX - e.target.offsetLeft;
   var y = e.pageY - e.target.offsetTop;
   
   
   lastPoint.x = x;
   lastPoint.y = y;
   
   currentMouseState = "CLICK_AREA";
   
 	var key;
	for (key in map.seeds)	{
      var seed = map.seeds[key];
      if (seed.isInside(new Point2D(x,y))) {
         $(canvasName)[0].addEventListener('mousemove', mouseDrag, false);
         currentMouseState = "CLICK_OBJECT";
         currentClickedObject = seed;
      }
   }  
}

function mouseUp(e) {
   $(canvasName)[0].removeEventListener('mousemove', mouseDrag, false);

   if(currentMouseState == "CLICK_AREA") {
       newSeed(lastPoint.x, lastPoint.y);
   }
   
   if(currentMouseState == "CLICK_OBJECT") {
       currentClickedObject.onClick(e);
   }

   currentMouseState = "NONE";
   lastPoint.x = -1;
   lastPoint.y = -1;
   
 
}

function mouseDrag(e) {
    
    var x = e.pageX - e.target.offsetLeft;
    var y = e.pageY - e.target.offsetTop;

    currentMouseState = "DRAGGING";

    var deltaX = x - lastPoint.x;
    var deltaY = y - lastPoint.y;

    currentClickedObject.position.x += deltaX;
    currentClickedObject.position.y += deltaY;

    lastPoint.x = x;
    lastPoint.y = y;
    
    draw();
}

function mouseMove(e) {
    var x = e.pageX - e.target.offsetLeft;
    var y = e.pageY - e.target.offsetTop;
    var key;
    for (key in map.seeds)	{
      var seed = map.seeds[key];
      if (seed.isInside({x:x,y:y})) {
         if(seed.isMouseOver()==false) seed.mouseOver();
      } else {
          if(seed.isMouseOver()) {
              seed.mouseOut()
          }
      }
   }
   
  draw();
}

function setAddSeedAction(path) {
    actionAddSeed = path;
}

function newSeed(x,y) {
    $("#newSeedDialog").show();
    newSeedPosition.x = x;
    newSeedPosition.y = y;
}

function createSeed() {
    $("#newSeedDialog").hide();
    name = $("#word").val().toLowerCase();
    i = map.seeds.length;
    map.seeds[name] = new Seed(name,newSeedPosition.x, newSeedPosition.y )

    $.post(actionAddSeed, {'word':name,'index':i}, completeLoadSeed, "json");
}

function completeLoadSeed(data) {
    remote_seed = data.seed.seed;
    var seed = map.seeds[remote_seed.word.toLowerCase()];
    if(remote_seed.color != null) {
        eval('seed.stdColors = '+remote_seed.color) ;
        draw();
    }
}

function saveMap() {
    $("#spinner").show();
    $.post(saveMapAction, { 'map': JSON.stringify(map) }, completeSave, "json");
}

function completeSave(data) {
    $("#messages").html(data.message);
    $("#spinner").hide();
}

// Use JQuery to wait for document load
$(document).ready(function()
{
	start();
});
