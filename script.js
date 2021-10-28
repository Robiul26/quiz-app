
// Getting all required elements
const startQuizBtn = document.querySelector('.startQuizBtn button');
const rulesBox = document.querySelector('.rulesBox');
const exitBtn = document.querySelector('.exitBtn');
const continueBtn = document.querySelector('.continueBtn');
const questionsBox = document.querySelector('.questionsBox');
const timeCount = document.querySelector('.seconds');
const timeLine = document.querySelector('.timeLine');
const timeLeft = document.querySelector('.timeLeft');

// if start Quiz button clicked
startQuizBtn.onclick = () => {
    rulesBox.classList.add('activeRulesBox');
    document.querySelector('.myQuizApp').style.display = "none";
}

// if Exit button clicked
exitBtn.onclick = () => {
    rulesBox.classList.remove('activeRulesBox');
}

// if Continue button clicked
continueBtn.onclick = () => {
    rulesBox.classList.remove('activeRulesBox');
    questionsBox.classList.add('activeQuestions');
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
}


let que_count = 0;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = questionsBox.querySelector('.nextBtn');
const resultBox = document.querySelector('.resultBox');
const restart_quiz = resultBox.querySelector('.buttons .replayBtn');
const quit_quiz = resultBox.querySelector('.buttons .quitQuiz');

// if quite button click
quit_quiz.onclick = () => {
    window.location.reload();
}

// if restart the quiz
restart_quiz.onclick = () => {
    rulesBox.classList.remove('activeRulesBox');
    resultBox.classList.remove('activeResultBox');
    questionsBox.classList.add('activeQuestions');
    showQuestions(que_count);
    startTimer(timeValue);
    startTimerLine(0);
    next_btn.style.display = "none";
    timeLeft.textContent = "Time Left";
}

// if next button clicked
next_btn.onclick = () => {
    if (que_count < allquestions.length - 1) {
        que_count++;
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeLeft.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("questions completed");
        showResultBox();
    }
}

// Getting questions and options from array
showQuestions = (index) => {
    const que_text = document.querySelector('.questionTitle');
    const option_list = document.querySelector('.option_list');
    let que_tag = `<span>${allquestions[index].numb}.  ${allquestions[index].question} </span>`;
    let option_tag = `<div class="options">${allquestions[index].options[0]}</div>
                        <div class="options">${allquestions[index].options[1]}</div>
                        <div class="options">${allquestions[index].options[2]}</div>
                        <div class="options">${allquestions[index].options[3]}</div>`;
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    // set attribute in option by onclick
    const option = option_list.querySelectorAll('.options');
    for (var i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

    let tickicon = '<i class="fa-solid fa-check" style="color:green;"></i>';
    let crossicon = '<i class="fa-solid fa-xmark" style="color: red;"></i>';
    // Get selected answer
    optionSelected = (answer) => {
        // when select an option then time and time line will be stop
        clearInterval(counter);
        clearInterval(counterLine);
        let userAns = answer.textContent;
        let currectAns = allquestions[index].answer;
        // console.log(currectAns);
        // console.log(userAns);
        if (userAns === currectAns) {
            userScore++;
            console.log(userScore);
            answer.classList.add('correct');
            answer.insertAdjacentHTML("beforeend", tickicon);
        } else {
            answer.classList.add('wrong');
            answer.insertAdjacentHTML("beforeend", crossicon);
            for (var i = 0; i < option.length; i++) {
                if (option[i].textContent == currectAns) {
                    option[i].classList.add('correct');
                    option[i].insertAdjacentHTML("beforeend", tickicon);
                }
            }
        }

        for (var i = 0; i < option.length; i++) {
            option[i].classList.add('disabled');
        }
        next_btn.style.display = "block";
    }

    // for bottom question count
    const botton_ques_cunter = document.querySelector('.totalQue');
    let totalQue = `<p>${allquestions[index].numb} of ${allquestions.length} Questions</p>`;
    botton_ques_cunter.innerHTML = totalQue;


    showResultBox = () => {
        rulesBox.classList.remove('activeRulesBox');
        questionsBox.classList.remove('activeQuestions');
        resultBox.classList.add('activeResultBox');
        const scoreText = resultBox.querySelector('.resultText');
        if (userScore > 3) {
            let scoreTag = `<p>You've completed the Quiz! <br>
            Congrat's, You got <b>${userScore}</b> out of ${allquestions.length}</p>`;
            scoreText.innerHTML = scoreTag;
        }
        else if (userScore > 1) {
            let scoreTag = `<p>You've completed the Quiz! <br>
            and nice, You got <b>${userScore}</b> out of ${allquestions.length}</p>`;
            scoreText.innerHTML = scoreTag;
        } else {

            let scoreTag = `<p>You've completed the Quiz! <br>
            Sorry, You got only <b>${userScore}</b> out of ${allquestions.length}</p>`;
            scoreText.innerHTML = scoreTag;
        }
    }

    // for left time counter

    startTimer = (time) => {
        counter = setInterval(timer, 1000);
        function timer() {
            timeCount.innerHTML = time;
            time--;
            if (time < 10) {
                timeCount.textContent = `0${time}`;
            }
            if (time < 0) {
                clearInterval(counter);
                timeCount.textContent = '00';
                timeLeft.textContent = "Time Off";

                // if user not select any option with require time

                let currectAns = allquestions[index].answer;
                for (var i = 0; i < option.length; i++) {
                    if (option[i].textContent == currectAns) {
                        option[i].classList.add('correct');
                        option[i].insertAdjacentHTML("beforeend", tickicon);
                    }
                }
                for (var i = 0; i < option.length; i++) {
                    option[i].classList.add('disabled');
                }
                next_btn.style.display = "block";
            }
        }
    }

    // for timeline
    startTimerLine = (time) => {
        counterLine = setInterval(timer, 48);
        function timer() {
            time++;
            timeLine.style.width = `${time}px`;
            if (time > 319) {
                clearInterval(counterLine);
            }
        }
    }
}


