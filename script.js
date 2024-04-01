class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.questionContainer = document.getElementById('question');
    this.answerButton = document.getElementById('answer-buttons');
    this.feedbackButton = document.getElementById('feedback-container');
    this.nextButton = document.getElementById('next-button');
    this.currentQuestionIndex = 0;
    this.showQuestion(this.questions[this.currentQuestionIndex]);
    this.nextButton.addEventListener('click', () => this.nextQuestion());
    document
      .getElementById('reset-button')
      .addEventListener('click', () => window.location.reload());
  }
  //metode ale clasei
  showQuestion(question) {
    this.questionContainer.textContent = question.question;
    this.answerButton.innerHTML = '';
    for (const answer of question.answers) {
      const buttonContainer = document.createElement('li');
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('btn');
      buttonElement.textContent = answer.text;
      this.answerButton.appendChild(buttonContainer);
      buttonContainer.appendChild(buttonElement);
      buttonElement.addEventListener('click', () => {
        this.selctAnswer(answer, question, buttonElement);
      });
    }
  }

  selctAnswer(answer, question, button) {
    const correct = answer.correct;
    if (correct) {
      this.nextButton.classList.remove('hide');
      this.feedbackButton.textContent = question.explanation;
      this.feedbackButton.classList.remove('text-wrong');
      button.classList.add('correct');
      this.feedbackButton.classList.add('this-correct');
    } else {
      button.classList.add('wrong');
      this.feedbackButton.textContent =
        'Raspuns incorect. Te rugam sa incerci dinou.';
      this.feedbackButton.classList.add('text-wrong');
    }
  }
  nextQuestion() {
    this.currentQuestionIndex++;
    this.resetQuestion();
    if (this.currentQuestionIndex >= this.questions.lenght) {
      this.showQuiezEndModal;
    } else {
      this.showQuestion(this.questions[this.currentQuestionIndex]);
    }
  }
  resetQuestion() {
    this.feedbackButton.classList.remove('text-correct', 'text-wrong');
    this.feedbackButton.innerHTML = '';
    this.nextButton.classList.add('hide');
  }

  showQuiezEndModal() {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.remove('hide');
  }
}

async function initQuiz() {
  const fileContent = await fetch('./questions.json');
  const quizQuestions = await fileContent.json();
  console.log(quizQuestions);
  const quiz = new Quiz(quizQuestions);
}
document.addEventListener('DOMContentLoaded', () => initQuiz());
