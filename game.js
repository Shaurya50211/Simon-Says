var buttonColours = ["red", "blue", "green", "yellow"]
var randomChosenColor = ""
var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false;

function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4)
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

function playSound(name) {
    var colorSound = new Audio("sounds/"+name+".mp3")
    colorSound.play()
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);
}

$('body').on('keypress', function (e) {
    if (started == false) {
        nextSequence()
        $('h1').text("Level " + level)
        started = true;
    }
});

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

function startOver() {
    $('h1').text("Uh-oh! Press Any Key To Restart!")
    started = false
    gamePattern = []
    level = 0
}

$('.btn').on("click", function() {
    var userChosenColour = $(this).attr('id');
    animatePress(userChosenColour)
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length-1);
})