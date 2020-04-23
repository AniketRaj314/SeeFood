let width, height, classifier, video, flippedVideo, food;
let videoWidth, videoHeight, options, clickPhoto, flg;

function preload() {
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VS4ynlmiX/model.json')
}

function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    createCanvas(width, height);

    options = {
        video: {

            facingMode: {
                exact: "environment"
            }
        }
    };
    food = 'Please wait for results';
    videoWidth = 320;
    videoHeight = 260;
    video = createCapture(options);
    video.size(videoWidth, videoHeight);
    video.hide();
    flg = 0;

    clickPhoto = createButton("Take a picture");
    clickPhoto.position(width / 2 - 45, height - 100);
    clickPhoto.mousePressed(displayResult);
    flippedVideo = ml5.flipImage(video);

    classifyVideo();
}

function draw() {
    background(255, 0, 0);
    displayText();
    imageMode(CENTER);
    if(flg) {
        displayResult();
    }
    image(flippedVideo, width / 2, height / 2, videoWidth, videoHeight);
}

function displayResult() {
    fill(255);
    textSize(32);
    text(food, width / 2 - 60, height - 130);
    flg = 1;
    noLoop();
}

function displayText() {
    fill(255);
    textSize(64);
    text('SeeFood', width / 2 - 130, 100);
    textSize(24);
    text('Shazam for Food!', width / 2 - 95, 150);
    textSize(16);
    text('Loading Camera...', width / 2 - 60, height / 2);
}

function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
        return;
    }

    food = results[0].label;
    classifyVideo();
}


