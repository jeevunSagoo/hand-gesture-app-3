Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (pic) {
        document.getElementById("result").innerHTML = '<img id="img_pic" src="' + pic + '">'
    });
}

emojimodel = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RGT8VLDU8/model.json", modelloaded)

function modelloaded() {
    console.log("model loaded succesfully");
}

prediction1 = "";
prediction2 = "";

function texttospeech() {
    speak_text = "prediction 1 is " + prediction1 + " and prediction 2 is " + prediction2;
    speak_audio = new SpeechSynthesisUtterance(speak_text);
    window.speechSynthesis.speak(speak_audio);
}

function check() {
    img = document.getElementById("img_pic");
    emojimodel.classify(img, got_result);
}

function got_result(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        prediction1 = r[0].label;
        prediction2 = r[0].label;
        document.getElementById("result_emotion_name1").innerHTML = prediction1;
        document.getElementById("result_emotion_name2").innerHTML = prediction2;
        texttospeech();
        if (prediction1 == "happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128077;"
        }
        else if (prediction1 == "not good") {
            document.getElementById("update_emoji1").innerHTML = "&#128078;"
        }
        else if (prediction1 == "ok") {
            document.getElementById("update_emoji1").innerHTML = "&#128076;"
        }

        if (prediction2 == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }
        else if (prediction2 == "not good") {
            document.getElementById("update_emoji2").innerHTML = "&#128078;"
        }
        else if (prediction2 == "ok") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }
    }
}