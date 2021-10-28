
const startQuizBtn = document.querySelector('.startQuizBtn button');
const rulesBox = document.querySelector('.rulesBox');
startQuizBtn.onclick = () => {
    rulesBox.classList.add('activeRulesBox');
}

const exitBtn = document.querySelector('.exitBtn');

exitBtn.onclick = () => {
    rulesBox.classList.remove('activeRulesBox');
}

const continueBtn = document.querySelector('.continueBtn');
const questions = document.querySelector('.questions');

continueBtn.onclick = () => {
    rulesBox.classList.remove('activeRulesBox');
    questions.classList.add('activeQuestions');
}