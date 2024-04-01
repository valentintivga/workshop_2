class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.questionContainer = document.getElementById('question');
    this.answerButton = document.getElementById('answer-buttons');
    this.feedbackButton = document.getElementById('feedback-container');
    this.nextButton = document.getElementById('next-button');
    this.showQuestion(this.questions[0]);
  }
  //metode ale clasei
  showQuestion(question) {
    this.questionContainer.textContent = question.question;
    this.answerButton.innerHTML = '';
    for (const answer of question.answers) {
      // const answerElement = `  <li><button class="btn"></button></li>`;
      const buttonContainer = document.createElement('li');
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('btn');
      buttonElement.textContent = answer.text;
      this.answerButton.appendChild(buttonContainer);
      buttonContainer.appendChild(buttonElement);
    }
  }
}

async function initQuiz() {
  const fileContent = await fetch('./questions.json');
  const quizQuestions = await fileContent.json();
  console.log(quizQuestions);
  const quiz = new Quiz(quizQuestions);
}
initQuiz();
