var singleLetter = document.getElementById('extra-o');
var singleWord = document.querySelector('section.intro h2');

singleWord.addEventListener("mouseenter", function(){
    singleLetter.innerHTML = "";
});

singleWord.addEventListener("mouseleave", function(){
    singleLetter.innerHTML = "O";
});