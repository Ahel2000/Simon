//Array that stores the colours of the buttons
var buttonColours = ["red","blue","green","yellow"];

/* Array to store the sequence of colours during the game */
var gamePattern = [];

/* Array to store the pattern taken as input from user */
var userClickedPattern = [];

/* stores the current level of the game */
var level = 0;

/* stores if the game has started or not */
var started = false;


/* Function that plays sound on button press */
function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}


/* Function implementing animation of flash when button is pressed */
function animatePress(randomChosenColour) {
    $("#" + randomChosenColour).addClass("pressed");

    setTimeout(function(){
        $("#" + randomChosenColour).removeClass("pressed");
    },100)
}


/* Function that check if the user has entered correct pattern or not */
function checkAnswer(patternLen) {
    for(var i=0;i<patternLen;i++){
        if(userClickedPattern[i] !== gamePattern[i]){
            return false;
        }
    }

    return true;
}


/* Resets the variables to its initial conditions
when game is over */
function startOver() {
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}


/* Function to generate the next colour of the sequence randomly */
function nextSequence() {
    $("h1").text("Level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

/* Takes the user input of colour and adds to the pattern */
$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    if(userClickedPattern.length === gamePattern.length){
        var check = checkAnswer(userClickedPattern.length);
        if(check){
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            },1000);
        }else{
            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);

            $("h1").text("Game Over, Press Any Key to Restart");

            startOver();
        }
    }
})

/* Starts the game */
$(document).keypress(function() {
    if(!started){
        started = true;
        nextSequence();
    }
})


