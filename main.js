document.addEventListener('DOMContentLoaded', function() {
    const typingInput = document.getElementById('typingInput');
    const itemCharacter = document.getElementById('itemCharacter');
    const showTime = document.getElementById('showTime');
    const wordCorrect = document.getElementById('wordCorrect');
    const wordWrong = document.getElementById('wordWrong');
    
    let array = [
        "Three" ,"guys" ,"stranded" ,"on" ,"a" ,"desert" ,"island" ,"find" ,"a" ,"magic" ,"lantern" ,"containing" ,"a" ,"genie",
        "who" ,"grants" ,"them" ,"each" ,"one" ,"wish." ,"The" ,"first" ,"guy" ,"wishes" ,"he" ,"was" ,"off" ,"the" ,"island" ,"and", 
        "come" ,"back" ,"home." ,"The" ,"second" ,"guy" ,"wishes" ,"the" ,"same." ,"The" ,"third" ,"guy" ,"says:", 
        "I'm" ,"lonely" ,"I" ,"wish" ,"two" ,"friends" ,"were" ,"back " ,"here."
    ];
    
    let arrayTyping = [];
    let currentWord = 0;
    let time = 60;
    let countWordCorrect = 0;
    let countWordWrong = 0;
    let timeCount = false;
    let timer;

    function updateDisplay() {
        itemCharacter.innerHTML = '';
        array.forEach((word, index) => {
            let span = document.createElement('span');
            span.textContent = word + ' ';
            if (index === currentWord) {
                span.classList.add('highlight');
            }
            itemCharacter.appendChild(span);
        });
    }

    function handleStartTyping() {
        timer = setInterval(() => {
            time--;
            showTime.textContent = time;
            if (time === 0) {
                handleClearInterval();
                timeCount = false;
            }
        }, 1000);
    }

    function handleClearInterval() {
        clearInterval(timer);
        handleCompare();
    }

    function handleCompare() {
        arrayTyping.forEach((word, index) => {
            if (word === array[index]) {
                countWordCorrect++;
            } else {
                countWordWrong++;
            }
        });
        wordCorrect.textContent = countWordCorrect;
        wordWrong.textContent = countWordWrong;
    }

    typingInput.addEventListener('input', (event) => {
        let txtText = event.target.value;
        let results = txtText.trim().split(/\s+/);
        let valueTimeCount = (txtText.length === 1) ? true : false;
        
        if (valueTimeCount === true && !timeCount) {
            timeCount = true;
            handleStartTyping();
        }
        arrayTyping = results;
        currentWord = results.length - 1;
        updateDisplay();
    });
    updateDisplay();
});