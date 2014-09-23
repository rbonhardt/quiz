function Question(state, cities, capital) {
	this.state = state;
	this.cities = cities;
	this.capital = capital;
}

var alabama = new Question('Alabama', ['Montgomery', 'Mobile', 'Birmingham', 'Tuscaloosa'], 'Montgomery');

var florida = new Question('Florida', ['Orlando', 'Miami', 'Tampa', 'Tallahassee'], 'Tallahassee');

var georgia = new Question('Georgia', ['Macon', 'Atlanta', 'Savannah', 'Bainbridge'], 'Atlanta');

var northCarolina = new Question('North Carolina', ['Wake Forest', 'Salem', 'Raleigh', 'Charlotte'], 'Raleigh');

var california = new Question('California', ['Los Angeles', 'Sacramento', 'San Francisco', 'San Diego'], 'Sacramento');

var questions = [alabama, florida, georgia, northCarolina, california];

$(document).ready(function() {

	// on pageload do intro();
	doIntro();

	var arrPosition = 0;
	var score = 0;
	var progress = 0;
	var questionCount = 1;

	loadQuestion(arrPosition);

	// user selects an answer and it becomes selected
	$('.list').on('click', 'li', function () {
		// but first we have to make sure all other selecteds are clear
		$('.list').find('li').removeClass('selected');
		$(this).addClass('selected');
		$('.checkout h1').hide();
		$('.checkout button').show();
	});

	$('.checkout').on('click', 'button', function() {
		score = checkAnswer(arrPosition, score, questionCount);
		progress += 20;
		questionCount += 1;
		updateProgress(score, progress, questionCount);
		if (arrPosition < 4) {
			$('.checkout button').hide();
			$('.checkout h1').show();
			$('.list').find('li').removeClass('selected');
			arrPosition+=1;
			loadQuestion(arrPosition);
		} else {
			console.log("done");
			$('#question-count').text('5');
			// clear quiz section out
			$('.checkout').hide();
			$('.heading h2').hide();
			$('.options').hide();
			$('.answers').show();
			$('.reset').show();
			// and give score
			console.log(score);
			$('.heading h1').text("You scored " + score + "%");
			$('.list').find('li').removeClass('selected');
			// give link to start over
		}
	});

	$('.reset').on('click', function() {
		location.reload(true);
	});



});

function doIntro() {
  $('.step-1').fadeIn(1500, function() {
    $(this).fadeOut(1500, function() {
      $('.step-2').fadeIn(1500, function() {
		    $(this).fadeOut(1500, function() {
		    	$('.main').fadeIn(2500);
	  		});
		  });
    });
  });
}

function loadQuestion(arrPosition) {
	// then user will be presented with a question
	$("#capital").text(questions[arrPosition].state);
	
	// cities show
	for (var i = 0; i < 4; i++) {
		var listItem = 'list-item-' + (i+1);
		$('.'+listItem+' .item').text(questions[arrPosition].cities[i]);
		console.log(i);
		console.log(questions[arrPosition]);
		console.log(questions[arrPosition].cities[i]);
	}

}

function checkAnswer(arrPosition, score, questionCount) {
	var answer = $('.list').find('li.selected .item').text();
	console.log("Answer: " + answer);
	var capital = questions[arrPosition].capital;
	console.log("Capital: " + capital);
	if (answer === capital) {
		$('#update h1').text('Correct!');
		score += 20;
		console.log('score: ' + score);
		$('.answers .list-item-' + questionCount + ' .answer').text(answer + ' is the capital of ' + questions[arrPosition].state);
		$('.answers .list-item-' + questionCount).addClass('correct');
	} else {
		$('#update h1').text('Wrong!');
		console.log('score: ' + score);
		$('.answers .list-item-' + questionCount + ' .answer').text(answer + ' is not the capital of ' + questions[arrPosition].state);
		$('.answers .list-item-' + questionCount).addClass('wrong');
	}
	return score;
}

function updateProgress(score, progress, questionCount) {
	$('#question-count').text(questionCount);
	$("#top-progress").attr("aria-valuenow", progress);
	$("#top-progress").attr("style", "width: "+progress+"%;");
	$('#score').text(score);
	$('#score-bar').attr('aria-valuenow', score);
	$('#score-bar').attr('style', 'width: '+score+'%;');

}

