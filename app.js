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

/********** TEMPLATE GENERATION FUNCTIONS **********/

let n = 0;
let currAnswers = [];
let correctCount = 0;
let numCorrect = 0;

function getCurrentAnswers() {
  currAnswers = quiz.questions[n].answers;
  console.log(currAnswers);
  return currAnswers;
}

function genWelcome() {
  return `<section class="quiz-box">
            <h4>Welcome to your quiz!</h4>
            <button id="start-btn">Get Started</button>
          </section>`;
}

function genQuiz() {
  getCurrentAnswers();
  return `<section class="quiz-box">
            

          <form id="quiz-form" class="quiz-box">
              <fieldset>
                <div class="question">
                  <legend style="color:black;"><h2>Question ${n+1}</h2><h3>${quiz.questions[n].question}</h3></legend>
                </div>
                <div class="answers">                                                                       
                  <button type="button" id='choice1' class="answer-choice raw-answer">${currAnswers[0]}</button>
                  <button type="button" id='choice2' class="answer-choice raw-answer">${currAnswers[1]}</button>
                  <button type="button" id='choice3' class="answer-choice raw-answer">${currAnswers[2]}</button>
                  <button type="button" id='choice4' class="answer-choice raw-answer">${currAnswers[3]}</button>
                </div>
                <div class="quiz-buttons">
                  <button type="submit" id="submit-answer-btn">Submit Answer</button>
                  <button type="button" id="next-question-btn" class="btn-hide">Next Question</button>
                </div>
              </fieldset>
            </form >


          </section>
          <section>
            <p class="running-score">You have answered ${numCorrect} out of 0 questions correctly.</p>
            <p>There are ${10-n} questions remaining.</p>
          </section>`;
}



/********** RENDER FUNCTION(S) **********/

function renderWelcome() {
  if (quiz.quizStarted === false) {
    return $('main').html(genWelcome());
  } 
}

function renderQuiz() {
    if (quiz.quizStarted === true) {
    return $('main').html(genQuiz())
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

function launchQuiz() {
  $('body').on('click', '#start-btn', function (event) {
    quiz.quizStarted = true;
    renderQuiz();
    chooseAnswer();
    clickSubmit();
    clickNext();
  })
}

function chooseAnswer() {                              
  $('body').on('mousedown', '.answer-choice', function(event) {
    if ($(this).hasClass('raw-answer')) {
      $(this).addClass('selected-answer')
      $(this).siblings().removeClass('selected-answer');
    }
  })
  /*   now we need to code the submit button to
   *   check if the answer is correct, color the 
   *   answers red/green as warranted, and append
   *   the results to the counter
   * 
   *   
   */
}

function clickSubmit() {
  $('body').on('submit', '#quiz-form', function(event) {
    event.preventDefault();
    let x = $('.selected-answer');
    $('.answer-choice').prop('disabled', true)
    $(this).find(':button[type=submit]').prop('disabled', true)
    if (x.text() === quiz.questions[n].correctAnswer) {
      correctCount ++;
      console.log(correctCount)
    } else {
      console.log('boo')
    }
    $(this).find('.answer-choice')
    for (i=1; i<=4; i++) {
      let choice = 'choice' + i;
      if ($(`#${choice}`).text() === quiz.questions[n].correctAnswer) {
        $(`#${choice}`).addClass('correct-answer');
      } else {
        $(`#${choice}`).addClass('wrong-answer');
      }
    }
    $('#next-question-btn').removeClass('btn-hide');
    increaseCorrectCount();
    n++;
    console.log(quiz.length)
  })
}

function increaseCorrectCount() {
  $('.running-score').text(`You have answered ${correctCount} of ${n+1} questions correctly.`);
}

function clickNext() {
  $('body').on('click', '#next-question-btn', function(event) {
    if (n<quiz.questions.length){
      genQuiz();
    }
    console.log('tada');
  })
}




function initializePage() {
  renderWelcome();
  launchQuiz();
}

$(initializePage)