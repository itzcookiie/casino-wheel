const listOfWords = document.querySelector('.list-of-words'),
lever = document.querySelector('.lever'),
leverHandle = document.querySelector('.lever__handle');

const words = ['tax','suit','weave','noise','swop','stuff','medal','rhythm','pardon','attractive'];
let arrangedWords = [];

let spinTimeMS;

leverHandle.addEventListener('click', e => {
    e.target.setAttribute('disabled', '');
    e.target.classList.toggle('moveLever');
    spin();
    const leverTime = setTimeout(() => {
        clearTimeout(leverTime);
        const leverUpTime = setTimeout(() => {
            clearTimeout(leverUpTime);
            e.target.removeAttribute('disabled');
            e.target.classList.toggle('moveLever');
        }, spinTimeMS - 500)
    }, 500)
})

function addWordsToDOM(wordsList) {
    listOfWords.innerHTML = '';
    arrangedWords = wordsList;
    const fragment = document.createDocumentFragment();
    const firstThreeWords = wordsList.slice(0, 2);
    firstThreeWords.map((word, index) => {
        const liElement = document.createElement('li');
        if(index === firstThreeWords.length - 1) {
            liElement.innerHTML = 
            `
                <h2>${word}</h2>
            `;
            liElement.classList.add('display');
        }
        liElement.innerHTML = 
        `
            <h4>${word}</h4>
        `;
        liElement.classList.add('word');
        fragment.appendChild(liElement);
    })
    listOfWords.appendChild(fragment);
}

function shuffleWords(wordsList) {
    const { length } = wordsList;
    return wordsList.map((word, index) => {
        let nextPosition = length + (index - 1);
        const calculatedPosition = nextPosition % length;
        const newWord = wordsList[calculatedPosition];
        return newWord
    })
}

function getWords() {
    return arrangedWords
}

function spin() {
    setSpinTime();
    addWordsToDOMGenerator(performance.now());

    const spinTimer = setTimeout(() => {
        clearTimeout(spinTimer);
    }, spinTimeMS)
}

function spinTime(multiplier=5) {
    return parseInt((Math.random() * multiplier) * 1000);
}

function setSpinTime() {
    spinTimeMS = 10000;
}

function calculateGradient(x) {
    return 100 - x**2
}

function addWordsToDOMGenerator(currentTime) {
    const now = performance.now();
    const changeInTime =  now - currentTime;
    if(changeInTime >= 10000) {
        return;
    }
    const timeInSeconds = changeInTime / 1000;
    addWordsToDOM(shuffleWords(getWords()));
    const calculatedGradient = calculateGradient(timeInSeconds);
    const timeDelay = (10/calculatedGradient)*1000;
    setTimeout(() => {
        addWordsToDOMGenerator(currentTime);
        console.log(timeDelay, timeInSeconds);
    }, timeDelay)
}



addWordsToDOM(words)