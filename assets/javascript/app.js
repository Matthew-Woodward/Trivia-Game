$(document).ready(function () {


	$('#image').css('display', 'none');

	var timerNumber = 31;

	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;

	var answers = [];
	var currentQuestion = 0;



	var trivia = [
		q1 = {
			question: 'Which color is not represented on the Mexican flag?',
			correct: 2,
			multChoice: ['Green', 'Red', 'Yellow', 'White'],

		},
		q2 = {
			question: 'What is a "skink"?',
			correct: 1,
			multChoice: ['Chocolate Bar', 'Lizard', 'Small River', 'Tree'],

		},
		q3 = {
			question: 'The ulna is a long bone in which part of the body?',
			correct: 3,
			multChoice: ['Ear', 'Leg', 'Neck', 'Arm'],

		},
		q4 = {
			question: 'Micky Dolenz, Michael Nesmith, Peter Tork, and Davy Jones were members of which band?',
			correct: 0,
			multChoice: ['The Monkees', 'The Animals', 'The Beatles', 'The Buggles'],

		},
		q5 = {
			question: 'Which steam locomotive carries the number "4472"?',
			correct: 0,
			multChoice: ['Flying Scotsman', 'Duchess of Sutherland', 'Evening Star', 'Mallard'],

		},
		q6 = {
			question: 'Digitalis is a plant commonly known as what?',
			correct: 3,
			multChoice: ['Campanula', 'Delphinium', 'Penstemon', 'Foxglove'],

		},
		q7 = {
			question: 'What is Lapsang souchong?',
			correct: 1,
			multChoice: ['A breed of dog', 'A type of tea', 'A language', 'A mountain range'],

		},
		q8 = {
			question: 'In the TV show "South Park," after Kenny died "for good", this character was the gang\'s first replacement:',
			correct: 2,
			multChoice: ['Token', 'Jimmy', 'Butters', 'Timmy'],

		}
	];

	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};

	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};

	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	var questionWrite = function () {
		if (currentQuestion <= 7) {
			$('#questionDiv').html('<h2>' + trivia[currentQuestion].question + '</h2>');
			answers = trivia[currentQuestion].multChoice;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};


	var answerClear = function () {
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};


	var start = function () {
		counter = setInterval(countDown, 1000);

		$('#startTitle').empty();


		hide('#start');

		questionWrite();
	};

	var clearScreen = function () {
		$('#startTitle').empty();
		$('#questionDiv').empty();
		$('#scoreDiv').empty();
		answerClear();
	}

	var countDown = function () {
		timerNumber--;
		$('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');

		if (timerNumber == 0) {
			gameOver();
		}
	};

	var stop = function () {
		clearInterval(counter);
	};

	var reset = function () {
		stop();
		timerNumber = 31;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#startTitle', 'Press Start Button to Begin!');
		show('#start');
		hide('#reset');
	};

	var gameOver = function () {

		stop();


		clearScreen();


		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scoreDiv').append('<h3>Here are your results</h3>');
		$('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
		$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		$('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
		show('#reset');
	};


	var nextQuestion = function () {
		$('#image').css('display', 'none');
		$('#questionDiv').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		timerNumber = 31;
	}

	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 5 * 1000);
			numAnswered++;
			numCorrect++;
			currentQuestion++;
			questionWrite();
		}
		else {
			numAnswered++;
			numIncorrect++;
			currentQuestion++;
			timerNumber = 31;
			//$('#questionDiv').empty();
			//answerClear();
			//questionWrite();
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3>The correct answer was ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 5 * 1000);
			questionWrite();
		}
	});

	$('#start').on("click", start);
	$('#reset').on('click', reset);
})