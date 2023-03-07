const start = document.querySelector('.button-start');
const eachPage = document.querySelector('.page');
const firstPage = document.querySelector('.first-page');
const quizz = document.querySelector('.quiz');
const answer = document.querySelector('.button-answer');
//var timeEl = document.createElement('t'); 
//timeEl.setAttribute("class", "time")
const timeEl = document.querySelector('.time');
const submitButton = document.querySelector('.button-submit');
const nextQuestion = quizz.childNodes;
var score = 0;
var timeLeft = 76
console.log(nextQuestion);
function changeQuestion(index) {
    //const nextQuestion = document.querySelector('question');
    if (index>1) {
        nextQuestion[index-2].style.display = "none";

    }
    if (nextQuestion[index].style.display === "none") {
        nextQuestion[index].style.display = "block";
      /*  if (index < 9) nextQuestion[index].insertBefore(timeEl, nextQuestion[index].firstChild);
        else {
            score = timeLeft;
            var res = nextQuestion[index].childNodes;
            res[3].textContent += score;
            console.log(res);
        }*/
        if (index >= 9) {
            score = timeLeft;
            timeLeft = 0;
            var res = nextQuestion[index].childNodes;
            res[3].textContent += score;
            timeEl.remove();
            console.log(timeEl);
            return;
        }
    }

}

start.addEventListener("click", function(){
    firstPage.classList.toggle("hide");
    setTime(0);
    if (quizz.style.display === "none") {
        quizz.style.display = "block";
    }
   play(3);
})

function setTime(x) {
    
    timeLeft -= x
    var timerInterval = setInterval(function() {
      timeLeft--;
      timeEl.textContent = "Time: " + timeLeft;
      if(timeLeft <= 0) {
        clearInterval(timerInterval);
        play(9)
      }
    }, 1000);
  }


// the questions are: child[i] i = 1, 3, 5, 7

function play(index){
    if (index > 9) {
        return;
    }
    changeQuestion(index);

    nextQuestion[index].addEventListener("click", function(event) {
        const element = event.target;
        if (element.matches("li")){
            const notification = document.createElement("note");
            const state = element.getAttribute("data-state");
            if (state === "wrong") {
                notification.textContent = "Wrong!";
                setTime(15);
            }
            else {
                notification.textContent = "Correct!";
            }
            nextQuestion[index+2].appendChild(notification);
        }
        play(index+2);
    })

}

var playerName = document.querySelector('#name');

//Array of names and their score
var viewHighscores = [];

//Creat order list element and add vewHighscores into it
const olEl = document.querySelector("#list");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // collect player's name and score
    var nameAndScore = {
        player: playerName.value,
        highscore: score
    }
    localStorage.setItem("nameAndScore", JSON.stringify(nameAndScore));
    
    //add data of name and score in the array viewHighscores
    viewHighscores.push(nameAndScore);
    
    //sort the list base on the score from high to low
    viewHighscores.sort(function(a, b) {
        return b.highscore - a.highscore;
    });

    
    // remove the current element on the screen and show the list of names and scores
    nextQuestion[9].style.display = "none";


    viewHighscores.forEach(function(each) {
        const liEl = document.createElement('li');

        //in in li element, there is :name and score
        // create 2 div(s) with display: inline-block
        //append 2 divs in the li Elemet
        var aName = document.createElement('div');
        aName.setAttribute("class", "player-name");
        aName.textContent = each.player;
        var aScore = document.createElement('div');
        aScore.setAttribute("class", "player-score");
        aScore.textContent = each.highscore;
        liEl.appendChild(aName);
        liEl.appendChild(aScore);
        olEl.appendChild(liEl);

    })
    document.querySelector('result').style.display = "block";
    
})
;


const backButton = document.querySelector(".button-back");
const clearButton = document.querySelector("button-clear");

//When [Go Back] button is clicked, go back to "first-page"
backButton.addEventListener("click", function(event){
    event.preventDefault();
    document.querySelector('result').style.display = "none";
    firstPage.classList.toggle("appear");

})
