let width, height, classifier, video, flippedVideo, food;
let videoWidth, videoHeight, options;

function preload() {
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VS4ynlmiX/model.json')
}

function setup() {
    width = innerWidth;
    height = innerHeight - 4;
    createCanvas(width, height);

    // options = {
    //     video: {

    //         facingMode: {
    //             exact: "environment"
    //         }
    //     }
    // };

    videoWidth = 320;
    videoHeight = 260;
    video = createCapture(VIDEO);
    video.size(videoWidth, videoHeight);
    video.hide();

    flippedVideo = ml5.flipImage(video);

    classifyVideo();
}

function draw() {
    background(255, 0, 0);
    displayText();
    imageMode(CENTER);
    image(flippedVideo, width / 2, height / 2, videoWidth, videoHeight);
}

function displayText() {
    fill(255);
    textSize(64);
    text('SeeFood', width / 2 - 130, 100);
    textSize(24);
    text('Shazam for Food!', width / 2 - 95, 150);
    textSize(16);
    text('Cas', width / 2 - 60, height / 2);
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


