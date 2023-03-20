var buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColor = ""
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false;
var bgMusic = new Audio('sounds/bg-music.mp3')
// Gives the user new button to follow
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4)
    console.log(randomNumber)
    randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)
    playSound(randomChosenColor)
    animatePress(randomChosenColor)
    console.log(randomChosenColor)
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    level++
    console.log("level:" + level)
    $('h1').text(`Level ${level}`)
}

// play sound when user clicks any button
function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3")
    colorSound.play()
}

// Animate a press effect when user clicks button
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);
}

var soundPlaying = true

// click anywhere for first time ONLY
$('body').on('keypress', function (e) {
    if (started == false && e.keyCode == 13) {
        bgMusic.volume = 0.2
        bgMusic.loop = true
        bgMusic.play()
        soundPlaying = true

        $('#music-int').css("display", "inline")
        nextSequence()
        $('h1').text("Level " + level)
        started = true;
    }

    if (e.key == 'm') {
        if (soundPlaying) {
            bgMusic.pause()
            soundPlaying = false
        } else {
            bgMusic.volume = 0.1
            bgMusic.loop = true
            bgMusic.play()
            soundPlaying = true
        }
    }
});

// check if user is right
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("correct")
            setTimeout(() => {
                nextSequence()
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        let gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play()
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

// reset all variables
function startOver() {
    $('h1').text("Uh-oh! Press Enter To Restart!")
    started = false
    gamePattern = []
    level = 0
    userClickedPattern = []
}

// when use clicks any button
$('.btn').on("click", function () {
    var userChosenColour = $(this).attr('id');
    animatePress(userChosenColour)
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length - 1);
})