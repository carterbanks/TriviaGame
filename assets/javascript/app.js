$(document).ready(function () {

    // There will need to be a variable for correct answers, incorrect answers, 
    //unanswered questions, time remaining, a boolean answered, interval, 
    //index to load new question and answers with reloading the page, and object variable for the actual game
    
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; 
    var answered = false; 
    var correct;
    var triviaGame = [{
            question: " How many ounces is the standard growler?",
            answer: ["16 Ounces", "32 Ounces", "64 Ounces", "128 Ounces"],
            correct: "2", 
            image: ("assets/images/growler.jpg")
    
        }, {
            question: "Which of the following American Presidents was not a homebrewer?",
            answer: ["George Washington", "Thomas Jefferson", "Barack Obama", "They were all homebrewers"],
            correct: "3",
            image: ("assets/images/mount-rushmore-monument-landmark-scenic.jpg")
    
        }, {
            question: "What does the German word 'Hefe' mean?",
            answer: ["Hopps", "Cow", "Yeast", "Beer"],
            correct: "2",
            image: ("assets/images/beer-yeast.jpg")
    
        }, {
            question: "Why did the Pilgrims originally land on Plymouth Rock?",
            answer: ["Their ship was sinking", "Their ship ran out of beer", "There was a masked madman aboard their ship", "They were lost at sea and needed directions"],
            correct: "1",
            image: ("assets/images/2-plymouth-rock-landing-granger.jpg")
    
        }, {
            question: "Which of the following beers is to be poured straight down into the glass as opposed to tilted?",
            answer: ["Stone IPA", "Fat Tire", "Vanilla Porter", "Nitro Milkstout"],
            correct: "3",
            image: ("assets/images/nitro-pour.jpg")
    
        }, {
            question: "Which of the following would be considered a 'barley wine'?",
            answer: ["A beer that reaches 8-12% alcohol by volume", "A beer that is sold in a wine bottle", "A beer that contains less that 0.5% alcohol by volume", "A beer that is brewed with wine"],
            correct: "0",
            image: ("assets/images/barley-wine.jpg")
    
        }, {
            question: "IPA is an acronym for...",
            answer: ["Indiana Pale Ale", "Indian Porter Ale", "Independently Poured Ale", "Indian Pale Ale"],
            correct: "3",
            image: ("assets/images/India-Pale-Ale-from-Shepherd-Neame-obrazek.jpg")
    
        }, {
            question: "All of the following types of beer would be considered 'Ales' except...",
            answer: ["Porters", "Lagers", "Pale Ales", "Stouts"],
            correct: "1",
            image: ("assets/images/ales.jpg")
    
        },{
            question: "Which of the following would not be considered a 'Lager'?",
            answer: ["Pilsner", "Märzen", "Bock", "Triple IPA"],
            correct: "3",
            image: ("assets/images/lagers.jpg")
    
        }, {
            question: "Which of the following types of beer tend to offer flavor notes that include chocolate, coffee and/or roasted grains?",
            answer: ["Porter", "IPA", "Lager", "Saison"],
            correct: "0",
            image: ("assets/images/smoked-porter.jpg")
    
        }, {
            question: "In which American state is Dogfish Head brewed in?",
            answer: ["Oregon", "Montana", "Deleware", "Idaho"],
            correct: "2",
            image: ("assets/images/dogfish-head.jpg")
    
        }, {
            question: "Cenosillicaphobia is the fear of what?",
            answer: ["An expired beer", "An empty glass", "Being intoxicated", "Craft beer"],
            correct: "1",
            image: ("assets/images/cenosillicaphobia.png")
    
        },{
            question: "Which of the following statements is false",
            answer: ["Craft beer is good for your bones", "Ancient Egyptians living in Giza often recieved rations of beer three times per day as payment", "Frosty glasses will cause your beer to foam", "The first brewers were men"],
            correct: "3",
            image: ("assets/images/women-brewers.jpg")
    
        }, {
            question: "For how long did the world's longest hangover last?",
            answer: ["Two days", "A fortnight", "Three weeks", "Four weeks"],
            correct: "3",
            image: ("assets/images/the-hangover.jpeg")
    
        },{
            question: "Most Americans live within how many miles of a craft brewery?'",
            answer: ["5 miles", "10 miles", "15 miles", "20 miles"],
            correct: "1",
            image: ("assets/images/brooklyn-brewery.jpg")
            
        }]; 
    
        // Create an audio element with JavaScript
        var audioElement = document.createElement("audio");
    
        // Set it's source to the location
        // of our Captain Planet theme song file.
        // audioElement.setAttribute("src", "assets/audio/L;KAHSDFKLJHASDF");
    
        // Theme Button
        $(".theme-button").on("click", function () {
            audioElement.play();
        });
    
        // Pause Button
        $(".pause-button").on("click", function () {
            audioElement.pause();
        });
    
    // Functions for the game ---------------------------------------------------------------------
    // This function starts the game
    function startGame() {
            $(".start-button").remove();
            $("h1").remove();   
            $(".theme-button").remove();
            $(".pause-button").remove();
            $(".jumbotron").css("background-image", "none");
            audioElement.pause();
            correctAnswers = 0;
            incorrectAnswers = 0;
            unansweredQuestions = 0;
            loadQandA();
        }
    
    // This function loads the Questions and Answers
    function loadQandA() {
        // This will set the variable answered to false, timeRemaining to 15
        // and we are setting variable intervalID to setInterval to a timer and to countdown 1000ms 
        answered = false;   
        timeRemaining = 16;
        intervalID = setInterval (timer, 1000); 
    
        // we create an if/else statement 
        // If answered is false, then we wiull run function timer()
        if (answered === false) { 
            timer();    
        } 
        // We create a correct variable to store the correct answer to the triviaGame object variables above. 
        // We also place the triviaGame Object variable into the indexQandA variable so we can cycle through the various items in the object variable.
        correct = triviaGame[indexQandA].correct; 
        // We create a question variable to load the triviaGame Questions from the variable object. 
        var question = triviaGame[indexQandA].question; 
        // We load the question variable into the question class 
        $(".question").html(question);  
        // We need to loop through the answer options in each question so we create a for loop 
        for (var i = 0; i < 4; i++) {
            // we create an answer variable that will populate the answer options available.  
            var answer = triviaGame[indexQandA].answer[i];
            // We then append these answer options to the answers class.  We create a class and a unique ID for each answer. 
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }
    
        // This click function is where we call out the right or wrong answers in the game. 
        $("h4").click(function () {
            //We are stating when the h4 tag is click, we look up the unique ID placed on the h4 tag.
            var id = $(this).attr('id');
            // alert(id);
            // If else statement is describing if the id above matches the correct variable in the triviaGameObject,
            //then state the answer and run either the correctAnswer or incorrectAnswer functions.  
            if (id === correct) {
                answered = true; // stops the timer
                // audioElement.setAttribute("src", "assets/audio/SDFGSDFGSDFG");
                // alert("correct answer");
                $('.question').text(triviaGame[indexQandA].answer[correct] + "! That is correct!");
                correctAnswer();
                audioElement.play();
            } else {
                answered = true; //stops the timer
                // audioElement.setAttribute("src", "assets/audio/asdfsdfgsdag");
                // alert("incorrect answer");
                $('.question').text(triviaGame[indexQandA].answer[id] + "? Wrong! The correct answer is: " + triviaGame[indexQandA].answer[correct] + ".");
                incorrectAnswer();
                audioElement.play();
            }
        });
    }
    //This function controls the timer in the rounds 
    function timer() {
        // This if else statement is creating the conditions necessary to clear out the intervals for each question. 
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            // audioElement.setAttribute("src", "assets/audio/asfgsdhdfgh");
            $('.question').text("Answer: " + triviaGame[indexQandA].answer[correct] + "!");
            audioElement.play();
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
            
        } else {
            timeRemaining--;
            $('.timeRemaining').text('You have ' + timeRemaining + ' seconds to answer.');
        }
    }
    
    // This function creates the conditions to increment the correct answers varaible while also reseting the round. 
    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("Very good, you may take a sip!")
        resetRound();
    }
    
    // This function creates the conditions to increment the incorrect answers varaible while also reseting the round.
    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("Are you drunk? You're gonna have to do better than that!")
        resetRound();
    
    }
    
    // This function creates the conditions to increment the unanswered varaible while also reseting the round.
    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("You lose! The next round is on you!")
        resetRound();
    }
    
    // This function creates the conditions to reset the rounds in between each question asked. 
    function resetRound() {
        // This allowsus to remove the previous answers 
        $('.answersAll').remove();
        //This gives us an image associated with the previous question 
        $('.answers').append('<img class=answerImage img-responsive src="' + triviaGame[indexQandA].image + ' ">'); 
        // increments index which will load next question when loadQandA() is called again
        indexQandA++; 
        // Creates If else statement to provide the conditions necessary to stop asking for questions once the trivia game object variable is asked
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                // audioElement.setAttribute("src", "assets/audio/laksjdf;lkjasdf");
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                 $('.answers').append('<img class=answerImage img-responsive width="400" height="300" src="assets/images/giphy2.gif">');
                audioElement.play();
                 setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };
    
    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();
    
    });
    });