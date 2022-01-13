status1="";
video="";
objects=[];
function preload(){
video=createVideo('video.mp4');
video.hide();
}


function draw(){
image(video,0,0,480,380);
if(status1!=""){
    objectDetector.detect(video,gotresult)
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status:Objects are  Detected";
        fill("pink");
        percent=floor(objects[i].confidence*100)
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("salmon");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if(objects[i].label==object_name){
            video.stop();
            objectDetector.detect(gotresult);
            document.getElementById("number_of_objects").innerHTML="Number of detected are ="+ objects.length;
        }
        else{
            document.getElementById("number_of_objects").innerHTML="Object is not found :(";
        }
    }
}

}

function setup(){
canvas=createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.size(480,380);
video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status:detecting objects";
    object_name=document.getElementById("object_name".value)
}

function modelloaded(){
    console.log("modelloaded");
    status1=true;
}

function gotresult(error,results){
if(error){
    console.log(error);
}
    console.log(results);
objects=results;


}

