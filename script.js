const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const categoriesPage = document.getElementById('categories-page');

const startQuizBtn = document.getElementById('start-quiz-btn');
const categoriesBtn = document.getElementById('categories-btn');
const backBtn = document.getElementById('back-btn');

const questionCountDisplay = document.getElementById('question-count');
const timerDisplay = document.getElementById('timer');
const questionText = document.getElementById('question-text');
const answerButtonsDiv = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');

const scoreDisplay = document.getElementById('score-display');
const reviewSection = document.getElementById('review-section');
const restartButton = document.getElementById('restart-btn');
const shareButton = document.getElementById('share-btn');

const leaderboardList = document.getElementById('leaderboard-list');
const categoriesList = document.getElementById('categories-list');

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft;

const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },

    {
        question: "All men are mortal. Socrates is a man. Therefore, Socrates is mortal ?",
        answers: ["True", "False", "Uncertain", "None of the above"],
        correctAnswer: "True"
    },

    {
        question: "Which of these is the odd one out?",
        answers: ["Apple", "Banana", "Orange", "Carrot"],
        correctAnswer: "Carrot"
    },
    
    {
        question: "If you rearrange the letters EAT you can make which of these words?",
        answers: ["TAE", "ATE", "ETA", "All of the above"],
        correctAnswer: "All of the above"
    },

    {
        question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ?",
        answers: ["14", "20", "21", "25"],
        correctAnswer: "21"
    },

    {
        question: "What is the missing number: 3, 6, 9, __, 15?",
        answers: ["10", "11", "12", "13"],
        correctAnswer: "12"
    },

    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },

    {
        question: "Which of the following is a synonym for gregarious ?",
        answers: ["Lonely", "Outgoing", "Shy", "Introverted"],
        correctAnswer: "Outgoing"
    },

     {
        question: "What is 2*2 ?",
        answers: ["5", "4", "6", "1"],
        correctAnswer: "4"
    },

        {
        question: "What is the symbol for water",
        answers: ["H2O", "NaCI", "CO2", "HCL"],
        correctAnswer: "H2O"
    }
];

const categories = [
    {id: 'general-knowledge', name: "General Knowledge"},
    {id: 'science', name: "Science"},
     {id: 'math', name: "Mathematics"}
];

const leaderboard = [
   {user:'Bob', score: 10},
    {user: 'Alice', score: 8},
     {user: 'Charlie', score: 6},
      {user: 'David', score: 4},
      {user: 'Eve', score: 2},
]
startQuizBtn.addEventListener('click', () => {
    showQuiz();
});
categoriesBtn.addEventListener('click',() =>{
    showCategories();
})
backBtn.addEventListener('click', () =>{
    showHomePage();
})

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

submitButton.addEventListener('click', () => {
     clearInterval(timerInterval);
    showResults();
});
restartButton.addEventListener('click', () =>{
    resetQuiz();
     showQuiz();
})
shareButton.addEventListener('click', () =>{
    shareResults();
})

function showHomePage(){
    homePage.style.display = 'block';
    quizPage.style.display = 'none';
     resultsPage.style.display = 'none';
    categoriesPage.style.display = 'none';
}
function showCategories(){
    homePage.style.display = 'none';
     quizPage.style.display = 'none';
     resultsPage.style.display = 'none';
    categoriesPage.style.display = 'block';
    loadCategories();
}
function showQuiz() {
    homePage.style.display = 'none';
    quizPage.style.display = 'block';
    resultsPage.style.display = 'none';
    categoriesPage.style.display = 'none';
    startQuiz();
}

function loadCategories() {
    categoriesList.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = category.name;
        link.addEventListener('click', () =>{
            alert(`Start Quiz in ${category.name} category`)
        })
        li.appendChild(link);
        categoriesList.appendChild(li);
    });
}
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;
    loadQuestion();
    startTimer();
    leaderboardList.innerHTML= '';
    leaderboard.sort((a,b) => b.score - a.score);
    leaderboard.forEach(user => {
         const li = document.createElement('li');
         li.textContent = `${user.user} - ${user.score}`;
         leaderboardList.appendChild(li);
    });
}

function loadQuestion() {
     clearInterval(timerInterval);
     startTimer();
    if (currentQuestionIndex < quizData.length) {
       
        const currentQuestion = quizData[currentQuestionIndex];
        questionCountDisplay.textContent = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
        questionText.textContent = currentQuestion.question;

       answerButtonsDiv.innerHTML = '';
        currentQuestion.answers.forEach(answer => {
            const btn = document.createElement('button');
            btn.classList.add('answer-btn');
            btn.textContent = answer;
            btn.addEventListener('click', () => selectAnswer(answer));
             answerButtonsDiv.appendChild(btn);
         });
           nextButton.style.display = 'none';
            submitButton.style.display = 'none';
          if (currentQuestionIndex === quizData.length - 1) {
          submitButton.style.display = 'inline-block';
        }
         else{
              nextButton.style.display = 'inline-block';
         }
    } else {
          showResults();
    }
}

function selectAnswer(selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons =  answerButtonsDiv.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.disabled = true;
         if(button.textContent === currentQuestion.correctAnswer){
               button.classList.add('correct');
        }
         if(button.textContent === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer){
               button.classList.add('incorrect');
        }
    })
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }
     clearInterval(timerInterval);
}
function startTimer(){
    timeLeft = 15;
      timerDisplay.textContent = `Time: ${timeLeft}s`;
   timerInterval =  setInterval(() => {
           timeLeft--;
         timerDisplay.textContent = `Time: ${timeLeft}s`;
      if(timeLeft <= 0){
            clearInterval(timerInterval);
            selectAnswer(null);
        }
     },1000)
}
function showResults() {
    quizPage.style.display = 'none';
     resultsPage.style.display = 'block';
    scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}!`;
    displayReview();
}
function displayReview() {
    reviewSection.innerHTML = '';
    quizData.forEach((question, index) => {
        const listItem = document.createElement('li');
        const result = score > index ? "Correct" : "Incorrect";
          const resultText = document.createElement('span');
          resultText.classList.add('result-text')
        resultText.textContent = `Question: ${question.question} - Your Result: `;
        const span = document.createElement('span');
        span.textContent = result;
          if(result === "Correct"){
              span.classList.add('correct');
          }else{
                 span.classList.add('incorrect');
          }
           listItem.appendChild(resultText);
            listItem.appendChild(span)
        reviewSection.appendChild(listItem);
    });
}
function resetQuiz(){
      currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;
}

function shareResults() {
  const message = `I scored ${score} out of ${quizData.length} on the quiz!`;
  if(navigator.share){
      navigator.share({
            title: "My Quiz Result",
            text: message,
            url: window.location.href,
        })
        .then(() => console.log('Shared sucessfully'))
        .catch((error) => console.error('Error sharing', error));

  }else{
       alert(`Share this ${message}`);
    }
}
showHomePage();