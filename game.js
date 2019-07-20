let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let startGame = false;
let level = 0;



$(document).on('keypress', () =>{
    if(!startGame){
        startGame = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    } 
});

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatedPressed(userChosenColor);
    
    checkedAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatedPressed(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkedAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press any Key ti Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    startGame = false;
}
