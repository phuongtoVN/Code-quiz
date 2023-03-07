const start = document.querySelector('.button-start');
const eachPage = document.querySelector('.page');
const firstPage = document.querySelector('.first-page');
const quizz = document.querySelector('.quiz');
var answer = document.querySelector('.button-answer');
const child = quizz.childNodes;

console.log(answer);
function changeQuestion(index) {
    //const nextQuestion = document.querySelector('question');
    if (index>1) {
        child[index-2].style.display = "none";
    }
    if (child[index].style.display === "none") {
        child[index].style.display = "block";
    }

    console.log(child[index]);
}

start.addEventListener("click", function(){
    firstPage.classList.toggle("hide");
    if (quizz.style.display === "none") {
        quizz.style.display = "block";
    }
   
})



// the questions are: child[i] i = 1, 3, 5, 7

function play(index){
    if (index > 7) {
        return;
    }
    changeQuestion(index);
    child[index].addEventListener("click", function(event) {
        const element = event.target;
        if (element.matches("li")){
            const notification = document.createElement("note");
            const state = element.getAttribute("data-state");
            if (state === "wrong") {
                    notification.textContent = "Wrong!";
            }
            else {
                notification.textContent = "Correct!";
            }
            child[index+2].appendChild(notification);
        }
        index+=2;
    })
    play(index);   

    
}


play(1);