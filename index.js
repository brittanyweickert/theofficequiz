const STORE = [
  {
    question: 'What room is not avaliable at Schrute Farm bed and breakfast?',
    answers: [
      'America',
      'Beat-themed',
      'Night-time',
      'Irrigation'
    ],
    correctAnswer:
      'Beat-themed'
  },
  {
    question:
      'What is Dwights middle name?',
    answers: [
      'Kurt',
      'Paul',
      'Dietrich',
      'Jim'
    ],
    correctAnswer:
      'Kurt'
  },
  {
    question:
      'Where does Jim propose to Pam?',
    answers: [
      'Niagra Falls',
      'Top of the office building',
      'Gas station',
      'In the house he bought for Pam'
    ],
    correctAnswer: 'Gas station'
  },
  {
    question: 'Fill in the blank: If I cant _____ then what is this all been about? What am I working toward?',
    answers: [
      'Play in my band',
      'Gamble',
      'Scuba',
      'Sell stuff online'
    ],
    correctAnswer: 'Scuba'
  },
  {
    question: 'Who would Michael say is the hottest employee in the office?',
    answers: [
      'Himself',
      'Pam',
      'Ryan',
      'Jim'
    ],
    correctAnswer: 'Ryan'
  },
  {
    question: 'How does Michael save Meredith from rabies?',
    answers: [
      'Leads a Fun Run Rabies Awareness Marathon to pay for her medical bills',
      'Leads an intervention',
      'Drives her to the clinic',
      'Hits her with his car'
    ],
    correctAnswer: 'Hits her with his car'
  },
  {
    question: 'Which employee has Michael kissed on the lips?',
    answers: [
      'Pam',
      'Dwight',
      'Ryan',
      'Oscar'
    ],
    correctAnswer: 'Oscar'
  },
  {
    question: 'What was the catchphrase of the doll that Dwight bought a bunch of to over charge to desperate parents? (Fa la la la la, la la ka-ching!)',
    answers: [
      'My horn can pierce the sky!',
      'My horn can touch the sky!',
      'My horn can touch the clouds!',
      'My horn is higher than the clouds!'
    ],
    correctAnswer:
      'My horn can pierce the sky!'
  },
  {
    question: 'What was Ryan cooking when he started the fire?',
    answers: [
      'A cheese pita',
      'Cup-O-Noodles',
      'A hot pocket',
      "Pizza"
    ],
    correctAnswer: 'A cheese pita'
  },
  {
    question: 'What do they call the "Office Olympics" where Kevin and Phyllis race with a box of paper attached to their feet?',
    answers: [
      'Flonkerton',
      'Office Olympics',
      'Floggerton',
      'Race '
    ],
    correctAnswer: 'Flonkerton'
  }
];

//creat variables to store quiz score and question number
let score = 0;
let questionNumber = 0;

//create question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//updates score number by 1
function updateScore() {
  score++;
  $('.score').text(score);
}

//updates the question number by 1
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of "question number" and "score" variables
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//start quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits selected answer then checks it against the correct answer
function submitAnswer() {
  $('.outsideBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//feedback if is correct
//increments score by one
function correctAnswer() {
  $('.response').html(
    `<h3>That is true.</h3>
    <img src="images/erin_fistpump.gif" alt="erin fist pumping gif" class="images" width="200px">
      <p class="sizeMe">An office is a place where dreams come true.</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//feedback if answer is wrong
function wrongAnswer() {
  $('.response').html(
    `<h3>FALSE.</h3>
    <img src="images/why_michael.png" alt="dissapointed dwight face" class="images" width="200px">
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates next question
function nextQuestion() {
  $('.jungleBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//final score and feedback at end of quiz
function finalScore() {
  $('.final').show();

  const great = [
    'You are Beyonce, always!',
    'images/win_beyonce.png',
    'Michael is Beyonce always',
    'WOW! Clearly you watch the office a lot. <br/>Get a friend, loser.'
  ];

  const okay = [
    'I guess you did okay',
    'images/okay_michael.png',
    'michael scott confused',
    'You should probably go turn on the office.'
  ];

  const bad = [
    'Why did you even try',
    'images/loser_michael.png',
    'Michael saying Loser'
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >= 5) {
    array = okay;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${score} / 10</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.outsideBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
