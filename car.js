img = "";
Status = "";
objects = [];

function home()
{
    window.location = "index.html";
}
function setup()
{
    canvas = createCanvas(550,330);
    objectDetection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw()
{
    image(img,0,0,550,330);
    if(Status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status - objects detected";
            document.getElementById("count").innerHTML = objects.length + " objects are detected by cocossd. ";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
function preload()
{
    img = loadImage("Car.jpg");
}
function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
    objectDetection.detect(img,gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
