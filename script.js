'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//それぞれの要素を変数に代入
const movingGrasses = document.getElementById("moving");
const unicorn = document.getElementById('unicorn');
const jumpUnicorn = document.getElementById('jumpUnicorn');
const question = document.getElementById("question");
const startButton = document.getElementById("startButton");
const gameOverMes = document.getElementById("gameOver");
gameOverMes.style.display = "none";
const reStart = document.getElementById("reStart");
reStart.style.display = "none";
let questionPosition = 0;
let questionInterval;
const result = document.getElementById("result");
result.style.display = "none";

//問題
const questions = [
  "lemon",
  "grape",
  "apple",
  "blueberry",
  "peach",
  "strawberry",
  "banana",
  "kiwi",
  "coconut",
  "avocado",
];

//草を動かす関数
let grassesPosition = 0;
const grassesSpeed = 4;

function moveGrasses() {
  grassesPosition -= grassesSpeed;
  movingGrasses.style.transform = `translateX(${grassesPosition}px)`;

  if (grassesPosition <= -movingGrasses.offsetWidth) {
    grassesPosition = 0;
  }
}

//草を動かす
setInterval(moveGrasses, 1000 / 60);

const questionSpeed = 3;

//問題をセットする関数
function setQuestion() {
  question.innerText = questions[Math.floor(Math.random() * questions.length)];
  questionPosition = 0;
}

//問題を動かす関数
function moveQuestion() {
  //問題を左に動かしていく
  questionPosition -= questionSpeed;
  question.style.transform = `translateX(${questionPosition}px)`;
      
    //ユニコーンの位置まできたらゲームオーバー
  if (questionPosition <= -1200) {
    unicorn.style.display = "none";
    question.style.display = "none";
    gameOverMes.style.display = "block";
    reStart.style.display = "block";
    result.style.display = "block";
  }
}

//リスタート関数
function resetGame() {
  clearInterval(questionInterval);
  questionPosition = 0;
  unicorn.style.display = "block"; // ユニコーンを表示
  question.style.display = "block"; // 問題を表示
  question.innerText = ""; // 問題をクリア
}

//Enterキーでゲーム開始
document.addEventListener("keydown", gameStart);

//ゲーム中の処理
function gameStart(e) {
  if (e.key === "Enter") {
    resetGame();
    document.getElementById("title").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    gameOverMes.style.display = "none";
    reStart.style.display = "none";
    result.style.display = "none";
  
    setQuestion();

    document.addEventListener("keydown", function(e) {
      //タイプした値が合っていたら文字列を消していく
      if (e.key === question.innerText[0]) {
        question.innerText = question.innerText.slice(1);
      }
      //すべての文字を消した場合
      if (question.innerText.length === 0) {
        setQuestion();
      }    
    })
    //問題を動かす
    questionInterval = setInterval(moveQuestion, 1000 / 60);
  }
} 
