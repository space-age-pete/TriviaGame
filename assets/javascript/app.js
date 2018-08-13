var timerCount = 10;

var gameover = true;

var question_1 = {
    "questionText": "What's that in the sky?",
    "answer1": { text: "A bird!", isCorrect: false },
    "answer2": { text: "A plane!", isCorrect: false },
    "answer3": { text: "A different bird!", isCorrect: false },
    "answer4": { text: "Superman", isCorrect: true },
    "message": { text: "The correct answer was \"Superman\"", pic: "" }
}

var question_2 = {
    "questionText": "What animal is considered \"the horse of the sea\"?",
    "answer1": { text: "Fish", isCorrect: false },
    "answer2": { text: "Shark", isCorrect: false },
    "answer3": { text: "Seahorse", isCorrect: true },
    "answer4": { text: "Octopus", isCorrect: false },
    "message": { text: "The correct answer was \"Seahorse\"", pic: "" }
}

var question_3 = {
    "questionText": "What animal is considered \"the seahorse of the land\"?",
    "answer1": { text: "Horse", isCorrect: true },
    "answer2": { text: "Mule", isCorrect: false },
    "answer3": { text: "Lion", isCorrect: false },
    "answer4": { text: "Cow", isCorrect: false },
    "message": { text: "The correct answer was \"Horse\"", pic: "" }
}

var question_4 = {
    "questionText": "Which is not an album by Charles Mingus?",
    "answer1": { text: "Mingus", isCorrect: false },
    "answer2": { text: "Mingus Mingus Mingus", isCorrect: true },
    "answer3": { text: "Mingus Mingus Mingus Mingus Mingus", isCorrect: false },
    "answer4": { text: "Pithecanthropus Erectus", isCorrect: false },
    "message": { text: "The correct answer was \"Mingus Mingus Mingus\"", pic: "" }
}

var question_5 = {
    "questionText": "Are we not men?",
    "answer1": { text: "Yes", isCorrect: false },
    "answer2": { text: "No", isCorrect: false },
    "answer3": { text: "Sometimes", isCorrect: false },
    "answer4": { text: "We are Devo", isCorrect: true },
    "message": { text: "The correct answer was \"We are Devo\"", pic: "" }
}

var currentQuestion = 0;

// var answerDivReferences = ["#question", "#answer1", "#answer2", "#answer3", "#answer4"];
var answerDivReferences = ["#answer1", "#answer2", "#answer3", "#answer4"];

var questions = [question_1, question_2, question_3, question_4, question_5];

var intervalID;

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredAnswers = 0;

var answerLockedIn = false;

function resetGame() {
    timerCount = 10;
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredAnswers = 0;

    answerLockedIn = false;
    gameover = false;
}

// $("h2").mouseenter(function (event) {
//     $(event.target).css("background-color", "palevioletred");
//     $(event.target).css("cursor", "pointer");
//     //console.log($(event.target).attr("id"));
// })

$(".answer").mouseenter(function () {
    if (!answerLockedIn) {
        $(this).css("background-color", "palevioletred");
        $(this).css("color", "white");
        $(this).css("cursor", "pointer");
    }
})

$(".answer").mouseleave(function () {
    if (!answerLockedIn) {
        $(this).css("background-color", "")
        $(this).css("color", "");
    }
})

$("#startbutton").mouseenter(function () {
    if (gameover) {
        $(this).css("background-color", "palevioletred");
        $(this).css("color", "white");
        $(this).css("cursor", "pointer");
    }
})

$("#startbutton").mouseleave(function () {
    if (gameover) {
        $(this).css("background-color", "")
        $(this).css("color", "");;
    }
})

$(".answer").click(function () {
    var reference = $(this);
    if (!answerLockedIn) {
        console.log(questions[currentQuestion][reference.attr("id")].isCorrect);
        console.log(question_1[reference.attr("id")].isCorrect);
        if (questions[currentQuestion][reference.attr("id")].isCorrect) {
            // reference.text("Correct!");
            // reference.css("background-color", "green");
            // correctAnswers++;
            correct(reference);

        }
        else {
            $("#question").text(questions[currentQuestion].message.text);
            reference.css("background-color", "red");
            answerDivReferences.forEach(function (element) {
            })
            incorrectAnswers++;
        }
        nextQuestion();
    }
})

$("#startbutton").click(function () {
    if (gameover) {
        $("#contentBox").css("background-color", "white");
        $("#startbutton").text("");
        resetGame();

        LoadQuestion(question_1);
    }
})


function nextQuestion() {
    currentQuestion++;
    clearInterval(intervalID);
    answerLockedIn = true;
    if (currentQuestion < questions.length) {
        setTimeout(function () { LoadQuestion(questions[currentQuestion]); }, 2500);
    }
    else {
        setTimeout(function () {
            clearQuestion();
            $("#question").text("How'd you do?");
            $("#answer1").text("Correct Answers: " + correctAnswers);
            $("#answer2").text("Wrong Answers: " + incorrectAnswers);
            $("#answer3").text("Ran Out Of Time: " + unansweredAnswers);
            gameover = true;
            $("#startbutton").text("RETRY");
        }, 2500);

    }
}

function LoadQuestion(question) {
    console.log(correctAnswers);
    startTimer();
    clearQuestion();

    answerLockedIn = false;
    $("#question").text(question.questionText);
    $("#answer1").text(question.answer1.text);
    $("#answer2").text(question.answer2.text);
    $("#answer3").text(question.answer3.text);
    $("#answer4").text(question.answer4.text);
    // answerDivReferences.forEach(function(element){
    //     $(element).text()
    // })
}

function clearQuestion() {
    $("#question").text("");
    $("#answer1").text("");
    $("#answer2").text("");
    $("#answer3").text("");
    $("#answer4").text("");

    answerDivReferences.forEach(function (element) {
        console.log(element);
        $(element).css("background-color", "");
        $(element).css("color", "black");
    })
}

//LoadQuestion(question_1);

// $("#answer2").click(function (event) {
//     ClearQuestion();
//     // LoadQuestion(question_2);
//     console.log(event.target);
//     $(event.target).text("gENiuS!")
// })

// $("h2").click(function (event) {
//     //ClearQuestion();
//     // LoadQuestion(question_2);
//     console.log(event.target);
//     $(event.target).text("gENiuS!")
// })

function theTimer() {
    timerCount--;
    $("#timer").text(timerCount);
    if (timerCount === 0) {
        timeOut();
    }
}

function startTimer() {
    timerCount = 10;
    $("#timer").text(timerCount);
    intervalID = setInterval(theTimer, 1000);
}

function timeOut() {
    $("#question").text("You've taken too long!   " + questions[currentQuestion].message.text);
    unansweredAnswers++;
    nextQuestion();
}

function correct(reference) {
    $("#question").text("Correct!");
    reference.css("background-color", "green");
    correctAnswers++;
}