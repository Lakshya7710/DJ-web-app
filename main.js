song=0;
left_wristX=0;
left_wristY=0;
right_wristX=0;
right_wristY=0;
leftWrist_score=0;
rightWrist_score=0;
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("model is loaded");
}

function draw(){
    image(video,0,0,500,400);   
    fill("red");
    stroke("red");
    if(leftWrist_score > 0.2){
    circle(left_wristX,left_wristY,80);
    InNumberleft_wristY=Number(left_wristY);
    remove_desimals=floor(InNumberleft_wristY);
    volume=remove_desimals/500;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    song.setVolume(volume);
    }

    if(rightWrist_score > 0.2){

    circle(right_wristY,right_wristX,80);

    if(right_wristY > 0 && right_wristY <= 100){
     document.getElementById("speed").innerHTML="Speed = 0.5x";
     song.rate(0.5);
    }

    if(right_wristY > 100 && right_wristY <= 200){
        document.getElementById("speed").innerHTML="Speed = 1.0x";
        song.rate(1.0);
       }

       if(right_wristY > 200 && right_wristY <= 300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
       }

       if(right_wristY > 300 && right_wristY <= 400){
        document.getElementById("speed").innerHTML="Speed = 2.0x";
        song.rate(2.0);
       }

    }
   
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWrist_score=results[0].pose.keypoints[9].score;
        left_wristX=results[0].pose.leftWrist.x;
        left_wristY=results[0].pose.leftWrist.y;

        rightWrist_score=results[0].pose.keypoints[10].score;
        right_wristX=results[0].pose.rightWrist.x;
        right_wristY=results[0].pose.rightWrist.y;
        console.log("left wrist x =" + left_wristX + " left wrist y =" + left_wristY);
        console.log("right wrist x =" + right_wristX + " right wrist y =" + right_wristY);
    }
}