/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

let n = 0;                   /* I like to declare variables at the very top. */
let currAnswers = [];
let correctCount = 0;

 /********** TEMPLATE GENERATION FUNCTIONS **********/

function genWelcome() {              /* HTML to generate the welcome page and start button */
  return `<section class="quiz-box">
            <h4>Welcome to your quiz!</h4>
            <button id="start-btn">Get Started</button>
          </section>`;
}

/*     I have compiling issues when I embed comments inside backtick text so comments for the
 *     below function are here. A form is the "actionable" component of this HTML with four
 *     buttons.  Every time the page lods it will update the question number, question, answer
 *     choices, running total of correct answers, total number of questions answered, and the
 *     number of questions remaining.  I've set the submit button to be off by default so it
 *     can't be triggered before an answer is selected.
 */

function genQuiz() {
  return `<section class="quiz-box">
          <form id="quiz-form">
              <fieldset>
                <div class="question">
                  <legend style="color:black;"><h2>Question ${n+1}</h2><h3>${quiz.questions[n].question}</h3></legend>
                </div>
                <div class="answers">                                                                       
                  <button type="button" id='choice1' class="answer-choice raw-answer">${quiz.questions[n].answers[0]}</button>
                  <button type="button" id='choice2' class="answer-choice raw-answer">${quiz.questions[n].answers[1]}</button>
                  <button type="button" id='choice3' class="answer-choice raw-answer">${quiz.questions[n].answers[2]}</button>
                  <button type="button" id='choice4' class="answer-choice raw-answer">${quiz.questions[n].answers[3]}</button>
                </div>
                <div class="quiz-buttons">
                  <button type="submit" id="submit-answer-btn" disabled="disabled">Submit Answer</button>
                  <button type="button" id="next-question-btn" class="hide">Next Question</button>
                </div>
              </fieldset>
            </form >
          </section>
          <section>
            <p class="running-score">You have answered ${correctCount} of ${n} questions correctly.</p>
            <p class ="hide">There are ${9-n} questions remaining.</p>
          </section>`;
}

function genResults() {          /* HTML for the quiz results page */
  return `<section class="quiz-box">
            <h2>You finished!</h2>
            <h3>Your score is: ${correctCount} of ${n}.<h3>
            <button id="try-again-btn">Try Again</button>
          </section>`;
}

/********** RENDER FUNCTION(S) **********/

function renderWelcome() {                    /* renders HTML for the welcome page */
  return $('main').html(genWelcome());
}

function renderQuiz() {                       /* renders HTML for all quiz pages */
  return $('main').html(genQuiz());
}

function renderResults() {                    /* renders HTML for the results page */
  return $('main').html(genResults());
}

/********** EVENT HANDLER FUNCTIONS **********/

function launchQuiz() {                                       
  $('body').on('click', '#start-btn', function (event) {    /* listens for a click on the start button on welcome page */
    quiz.quizStarted = true;                                /* flips quizStarted bool to true, I didn't use this but may utilize in a future update */
    renderQuiz();                                           /* renders the HTML for the quiz page */
  })
}

function chooseAnswer() {                                                      
  $('body').on('mousedown', '.answer-choice', function(event) {               /* listens for a mousedown on one of the answer choices */                                 
      $(this).addClass('selected-answer answer-border')                       /* adds visual indication to user-selected answer choice */
      $(this).siblings().removeClass('selected-answer answer-border');        /* removes visual indication from other answer choices if present */
      $('#quiz-form').find(':button[type=submit]').prop('disabled', false)    /* once an answer choice is selected the submit button becomes interactable */
  })
  $('body').on('keydown', '.answer-choice', function(event) {                 /* this part of the function creates keyboard functionality for the UI */
    if (event.keyCode === 32) {                                               /* restricts keyboard functionality to the spacebar */
      $(this).addClass('selected-answer answer-border')                       /* adds visual indication to user-selected answer choice */
      $(this).siblings().removeClass('selected-answer answer-border');        /* removes visual indication from other answer choices if present */
      $('#quiz-form').find(':button[type=submit]').prop('disabled', false)    /* once an answer choice is selected the submit button becomes interactable */
    }
  })
}

function clickSubmit() {
  $('body').on('submit', '#quiz-form', function(event) {                       /* listens for a successful form submission */
    event.preventDefault();                                                    /* stops browser from sending data to the server so it can be used front-end */
    let x = $('.selected-answer');                                             /* stores user-submitted answer to be tested for correctness */
    $('.answer-choice').prop('disabled', true)                                 /* disables answer choice buttons to make them non-interactable */
    $(this).find(':button[type=submit]').prop('disabled', true)                /* disables submit button to prevent multiple duplicate submissions */
    if (x.text() === quiz.questions[n].correctAnswer) {                        /* checks text of user-submitted answer against the answer key */
      correctCount ++;                                                         /* if user got the correct answer, increases counter by one */
    }
    $(this).find('.answer-choice')                                             /* finds all the answer choices on the page */
    for (i=1; i<=quiz.questions[n].question.length; i++) {                     /* iterates through the four answer choices */
      let choice = 'choice' + i;                                               /* uses ID fields to iterate */
      if ($(`#${choice}`).text() === quiz.questions[n].correctAnswer) {        /* determines if a given answer is correct */
        $(`#${choice}`).addClass('correct-answer');                            /* adds visual indidation to the correct answer for the user */
      } else {
        $(`#${choice}`).addClass('wrong-answer');                              /* adds visual indication to incorrect answers for th user */
      }
    }
    $('.hide').removeClass('hide');                                            /* unhides the 'next question' button */
    increaseCorrectCount();                                                    /* updates the running score at the bottom of the page */
    n++;                                                                       /* updates the question counter */
  })
}

function increaseCorrectCount() {                                                                   //  the templated HTML loads this automatically
  $('.running-score').text(`You have answered ${correctCount} of ${n+1} questions correctly.`);     //  on pageload, but the function allows the 
}                                                                                                   //  value to be updated on form submission
                                                                                                    //
function clickNext() {
  $('body').on('click', '#next-question-btn', function(event) {     /* listens for a click on the 'next question' button */
    if (n<quiz.questions.length){                                   /* determines whether the user has reached the end of the quiz */
      renderQuiz();                                                 /* renders the next question if there is one */
    } else {
      renderResults();                                              /* renders the results page if the quiz is done */
    }
  })
}

function clickTryAgain() {                                     
  $('body').on('click', '#try-again-btn', function (event) {     /* listens for a click on the 'try again' button on the results page */
    quiz.quizStarted = false;                                    /* this line and the next few reset all quiz counters and conditions to original form */
    n=0;                                                         /* ^^^^^ */
    currAnswers = [];                                            /* ^^^^^ */
    correctCount = 0;                                            /* ^^^^^ */
    renderWelcome();                                             /* brings the user back to the welcome page */
  })
}

function initializePage() {
  renderWelcome();
  launchQuiz();
  chooseAnswer();
  clickSubmit();
  clickNext();
  clickTryAgain();
}

$(initializePage)