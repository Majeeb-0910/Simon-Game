// 
var buttonColours = ["red", "blue", "green", "yellow","red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keydown(function () {
    if (!started) {
        $('#level-title').text("Level: "+level);
        nextSequence();
        started = true;
    }
})

// player feedback
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    pressedAnimation(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 8);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
        // btn animation and sound
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function pressedAnimation(btnName) {
    $('.'+btnName).addClass("pressed");
    setTimeout(()=>{
        $('.'+btnName).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {nextSequence();}, 1000);
  
        }
  
    } else {
        $('.body').addClass("game-over");
        $('#level-title').text("Game-Over  Reached: "+level+" Press A Key to Start ");
        // reset the values 
        started = false;
        gamePattern = [];
        level = 0;
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        
    setTimeout(()=>{
        $('.body').removeClass("game-over");
    },3500);
        console.log("wrong");
    }
  
}


