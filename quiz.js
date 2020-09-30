const quiz = {
    // 5 or more questions are required
    questions: [
      { /* Question 1 */
        question: 'What term refers to the cheese-like necrosis seen in Tuberculosis patients?',
        answers: [
          'coagulative necrosis',
          'fibrinoid necrosis',
          'caseous necrosis',
          'gangrenous necrosis'
        ],
        correctAnswer: 'caseous necrosis'
      },
      { /* Question 2 */
        question: 'What process involves heat-treating food to kill pathogens?',
        answers: [
          'pasteurization',
          'fever-induction',
          'pyrotherapy',
          'autoclaving'
        ],
        correctAnswer: 'pasteurization'
      },
      { /* Question 3 */
        question: 'Which of the following are viruses that only infect bacterial cells?',
        answers: [
          'viroids',
          'bacteriophages',
          'virions',
          'heliobacters'
        ],
        correctAnswer: 'bacteriophages'
      },
      { /* Question 4 */
        question: 'What are the five antibody isotypes?',
        answers: [
          'IgA  IgD  IgE  IgG  IgM',
          'IgA  IgB  IgD  IgE  IgR',
          'IgA  IgG  IgM  IgR  IgS',
          'IgB  IgD  IgG  IgG  IgS'
        ],
        correctAnswer: 'IgA  IgD  IgE  IgG  IgM'
      },
      { /* Question 5 */
        question: 'What type of cellular respiration does NOT require oxygen?',
        answers: [
          'oligophobic',
          'aerobic',
          'exerobic',
          'anaerobic'
        ],
        correctAnswer: 'anaerobic'
      },
      { /* Question 6 */
        question: 'Which of the following is NOT one of the four signs of inflammation?',
        answers: [
          'redness',
          'heat',
          'numbness',
          'swelling'
        ],
        correctAnswer: 'numbness'
      },
      { /* Question 7 */
        question: 'Which specialized immune cells are only found in the gut?',
        answers: [
          'neutrophils, macrophages, B-1 cells',
          'effector B cells, T(h)17 cells, NK cells',
          'T(reg) cells, eosinophils, monocytes',
          'M cells, crypt cells, goblet cells'
        ],
        correctAnswer: 'M cells, crypt cells, goblet cells'
      },
      { /* Question 8 */
        question: 'What is the primary short-term energy storage molecule in animals?',
        answers: [
          'adenosine triphosphate (ATP)',
          'adenosine diphosphate (ADP)',
          'guanosine diphosphate (GDP)',
          'guanosine monophosphate (GMP)'
        ],
        correctAnswer: 'adenosine triphosphate (ATP)'
      },
      { /* Question 9 */
        question: 'What mineral in hemoglobin allows blood to bind oxygen in humans?',
        answers: [
          'copper (Cu)',
          'iron (Fe)',
          'zinc (Zn)',
          'nickel (Ni)'
        ],
        correctAnswer: 'iron (Fe)'
      },
      { /* Question 10 */
        question: 'What process causes the planned death of a cell?',
        answers: [
          'anaphase',
          'autophagy',
          'apoptosis',
          'anergy'
        ],
        correctAnswer: 'apoptosis'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };