var root = document.getElementById("root");

var mainContain = document.createElement("div");
mainContain.setAttribute("id", "main_contain");

root.appendChild(mainContain);

var quesContain = document.createElement("div");
quesContain.setAttribute("id", "ques_contain");
mainContain.appendChild(quesContain);

var ansContain = document.createElement("div");
ansContain.setAttribute("id", "ans_contain");
mainContain.appendChild(ansContain);

var question_current_index = 0;
var score = 0;

var question_Array = [
  {
    Question:
      "Who was the captain of the Pakistani cricket team when they won the 1992 Cricket World Cup?",
    Choices: ["imran khan", "wasim akram", "javed miandad", "shahid afridi"],
    Correct: "imran khan",
  },
  {
    Question: "Which team won the ODI World Cup 2019?",
    Choices: ["india", "australia", "england", "new zeland"],
    Correct: "england",
  },
  {
    Question:
      "Which Pakistani Captain has won the Champion Trophy for Pakistan?",
    Choices: ["babar azam", "sarfaraz ahmed", "shaheen afridi", "shan masood"],
    Correct: "sarfaraz ahmed",
  },
  {
    Question:
      "Which Pakistani bowler holds the record for the most wickets in a single Test series?",
    Choices: ["shoaib akhtar", "wasim akram", "shaheen afridi", "yasir shah"],
    Correct: "yasir shah",
  },
  {
    Question:
      "Who is the all-time leading run-scorer for Pakistan in One Day Internationals (ODIs)?",
    Choices: ["inzamam-ul-haq", "younis khan", "misbah-ul-haq", "babar azam"],
    Correct: "babar azam",
  },
];

function displayQuestion() {
  var ques_arr = question_Array[question_current_index];
  var ques_obj = ques_arr.Question;
  quesContain.innerHTML = ques_obj;

  ansContain.innerHTML = "";

  ques_arr.Choices.forEach((element) => {
    var button = document.createElement("button");
    button.setAttribute("onclick", "clickBtn(this)");
    button.innerHTML = element;
    ansContain.appendChild(button);
  });
}

function clickBtn(user_ans) {
  if (
    user_ans.innerText.toLowerCase() ===
    question_Array[question_current_index].Correct.toLowerCase()
  ) {
    score += 2;
  }
  question_current_index++;
  if (question_current_index < question_Array.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quesContain.innerHTML = `Quiz Over! Your score is 10 out of ${score}`;
  ansContain.innerHTML = "";
  clearInterval(interval);
  var restartBtn = document.createElement("button");
  restartBtn.innerHTML = "Restart";
  restartBtn.setAttribute("onclick", "restartGame()");
  ansContain.appendChild(restartBtn);
}

function restartGame() {
  question_current_index = 0;
  score = 0;
  mins = 2;
  seconds = 0;
  time_div.innerHTML =
    (mins < 10 ? "0" : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds;
  displayQuestion();
  startGame();
}

var mins = 2;
var seconds = 0;

var timer_contain = document.createElement("div");
timer_contain.classList.add("timer_container");
root.insertBefore(timer_contain, mainContain);

var startBtn = document.createElement("button");
startBtn.setAttribute("onclick", "startGame()");
startBtn.innerHTML = "Start Game";
timer_contain.appendChild(startBtn);

var time_div = document.createElement("div");
time_div.classList.add("time");
time_div.innerHTML =
  (mins < 10 ? "0" : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds;
timer_contain.appendChild(time_div);

var interval;
function startGame() {
  startBtn.style.display = "none";
  mainContain.style.display = "flex";
  displayQuestion();

  interval = setInterval(function () {
    if (seconds === 0) {
      if (mins === 0) {
        endQuiz();
        return;
      }
      mins--;
      seconds = 59;
    } else {
      seconds--;
    }
    time_div.innerHTML =
      (mins < 10 ? "0" : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds;
  }, 1000);
}
