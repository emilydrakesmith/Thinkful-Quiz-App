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

function genWelcome() {
  return `<section class="quiz-box">
            <h4>Welcome to your quiz!</h4>
            <button id="start-btn">Get Started</button>
          </section>`;
}

function genQuiz() {
  getCurrentAnswers();               /* I need to figure out a way to get this to re-run every time the question is updated. */
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
                  <button type="button" id="next-question-btn">Next Question</button>
                </div>
              </fieldset>
            </form >


          </section>
          <section>
            <p>You have answered # out of # questions correctly.</p>
            <p>There are ${10 - n} questions remaining.</p>
          </section>`;
}

function getCurrentAnswers() {
  currAnswers = quiz.questions[n].answers;
  console.log(currAnswers);
  return currAnswers;
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
    
    if (x.text() === quiz.questions[n].correctAnswer) {
      console.log ('hooray')
    } else {
      console.log('boo')
    }
    
  })
}

function initializePage() {
  renderWelcome();
  launchQuiz();
  chooseAnswer();
  clickSubmit();
}

$(initializePage)